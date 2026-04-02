import { Cliente, Produto, Venda, DashboardStats } from "./types";
import { format, subDays } from "date-fns";

const STORAGE_KEYS = {
  CLIENTES: "pharma_clientes",
  PRODUTOS: "pharma_produtos",
  VENDAS: "pharma_vendas",
  RELATORIOS: "pharma_relatorios_history",
};

// Initial data if storage is empty
const initialClientes: Cliente[] = [
  { id: "1", nome: "João Silva", cpf: "123.456.789-00", email: "joao@email.com", telefone: "(11) 98888-7777", dataCadastro: "2024-01-15" },
  { id: "2", nome: "Maria Oliveira", cpf: "987.654.321-11", email: "maria@email.com", telefone: "(11) 97777-6666", dataCadastro: "2024-02-10" },
];

const initialProdutos: Produto[] = [
  { id: "1", nome: "Dipirona 500mg", preco: 12.5, estoque: 150, categoria: "Analgesico" },
  { id: "2", nome: "Amoxicilina 500mg", preco: 45.9, estoque: 30, categoria: "Antibiotico" },
  { id: "3", nome: "Vitamina C 1g", preco: 25.0, estoque: 5, categoria: "Suplemento" },
];

const initialVendas: Venda[] = [
  {
    id: "1",
    clienteId: "1",
    clienteNome: "João Silva",
    produtos: [{ produtoId: "1", nome: "Dipirona 500mg", quantidade: 2, precoUnitario: 12.5 }],
    total: 25.0,
    data: format(new Date(), "yyyy-MM-dd HH:mm"),
  },
];

function getFromStorage<T>(key: string, initialValue: T): T {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  }
  return JSON.parse(stored);
}

function saveToStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const fakeApi = {
  // Clientes
  getClientes: async (): Promise<Cliente[]> => {
    return getFromStorage(STORAGE_KEYS.CLIENTES, initialClientes);
  },
  saveCliente: async (cliente: Omit<Cliente, "id" | "dataCadastro"> & { id?: string }): Promise<Cliente> => {
    const clientes = getFromStorage<Cliente[]>(STORAGE_KEYS.CLIENTES, initialClientes);
    if (cliente.id) {
      const index = clientes.findIndex((c) => c.id === cliente.id);
      const updated = { ...clientes[index], ...cliente };
      clientes[index] = updated;
      saveToStorage(STORAGE_KEYS.CLIENTES, clientes);
      return updated;
    } else {
      const newCliente: Cliente = {
        ...cliente,
        id: Math.random().toString(36).substr(2, 9),
        dataCadastro: format(new Date(), "yyyy-MM-dd"),
      };
      clientes.push(newCliente);
      saveToStorage(STORAGE_KEYS.CLIENTES, clientes);
      return newCliente;
    }
  },
  deleteCliente: async (id: string): Promise<void> => {
    const clientes = getFromStorage<Cliente[]>(STORAGE_KEYS.CLIENTES, initialClientes);
    const filtered = clientes.filter((c) => c.id !== id);
    saveToStorage(STORAGE_KEYS.CLIENTES, filtered);
  },

  // Produtos
  getProdutos: async (): Promise<Produto[]> => {
    return getFromStorage(STORAGE_KEYS.PRODUTOS, initialProdutos);
  },
  saveProduto: async (produto: Omit<Produto, "id"> & { id?: string }): Promise<Produto> => {
    const produtos = getFromStorage<Produto[]>(STORAGE_KEYS.PRODUTOS, initialProdutos);
    if (produto.id) {
      const index = produtos.findIndex((p) => p.id === produto.id);
      const updated = { ...produtos[index], ...produto };
      produtos[index] = updated;
      saveToStorage(STORAGE_KEYS.PRODUTOS, produtos);
      return updated;
    } else {
      const newProduto: Produto = {
        ...produto,
        id: Math.random().toString(36).substr(2, 9),
      };
      produtos.push(newProduto);
      saveToStorage(STORAGE_KEYS.PRODUTOS, produtos);
      return newProduto;
    }
  },

  // Vendas
  getVendas: async (): Promise<Venda[]> => {
    return getFromStorage(STORAGE_KEYS.VENDAS, initialVendas);
  },
  createVenda: async (venda: Omit<Venda, "id" | "data">): Promise<Venda> => {
    const vendas = getFromStorage<Venda[]>(STORAGE_KEYS.VENDAS, initialVendas);
    const newVenda: Venda = {
      ...venda,
      id: Math.random().toString(36).substr(2, 9),
      data: format(new Date(), "yyyy-MM-dd HH:mm"),
    };
    vendas.push(newVenda);
    saveToStorage(STORAGE_KEYS.VENDAS, vendas);

    // Update stock
    const produtos = getFromStorage<Produto[]>(STORAGE_KEYS.PRODUTOS, initialProdutos);
    venda.produtos.forEach((item) => {
      const pIndex = produtos.findIndex((p) => p.id === item.produtoId);
      if (pIndex !== -1) {
        produtos[pIndex].estoque -= item.quantidade;
      }
    });
    saveToStorage(STORAGE_KEYS.PRODUTOS, produtos);

    return newVenda;
  },

  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    const vendas = getFromStorage<Venda[]>(STORAGE_KEYS.VENDAS, initialVendas);
    const clientes = getFromStorage<Cliente[]>(STORAGE_KEYS.CLIENTES, initialClientes);
    const produtos = getFromStorage<Produto[]>(STORAGE_KEYS.PRODUTOS, initialProdutos);

    const hoje = format(new Date(), "yyyy-MM-dd");
    const vendasHoje = vendas.filter((v) => v.data.startsWith(hoje)).length;
    const faturamentoMes = vendas.reduce((acc, v) => acc + v.total, 0);
    const novosClientes = clientes.length;
    const produtosBaixoEstoque = produtos.filter((p) => p.estoque < 10).length;

    const vendasPorDia = Array.from({ length: 7 }).map((_, i) => {
      const d = format(subDays(new Date(), 6 - i), "dd/MM");
      const totalDia = vendas
        .filter((v) => v.data.includes(format(subDays(new Date(), 6 - i), "yyyy-MM-dd")))
        .reduce((acc, v) => acc + v.total, 0);
      return { data: d, valor: totalDia };
    });

    return {
      vendasHoje,
      faturamentoMes,
      novosClientes,
      produtosBaixoEstoque,
      vendasPorDia,
    };
  },

  // Relatorios History
  getRelatoriosHistory: (): string[] => {
    return getFromStorage<string[]>(STORAGE_KEYS.RELATORIOS, [
      "Vendas do último mês por categoria",
      "Produtos mais vendidos no verão",
      "Previsão de estoque para o próximo trimestre",
    ]);
  },
  saveRelatorioQuery: (query: string) => {
    const history = getFromStorage<string[]>(STORAGE_KEYS.RELATORIOS, []);
    if (!history.includes(query)) {
      const newHistory = [query, ...history].slice(0, 5);
      saveToStorage(STORAGE_KEYS.RELATORIOS, newHistory);
    }
  },
};
