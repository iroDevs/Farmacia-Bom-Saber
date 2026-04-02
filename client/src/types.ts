export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataCadastro: string;
}

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
}

export interface Venda {
  id: string;
  clienteId?: string;
  clienteNome?: string;
  produtos: {
    produtoId: string;
    nome: string;
    quantidade: number;
    precoUnitario: number;
  }[];
  total: number;
  data: string;
}

export interface DashboardStats {
  vendasHoje: number;
  faturamentoMes: number;
  novosClientes: number;
  produtosBaixoEstoque: number;
  vendasPorDia: { data: string; valor: number }[];
}
