import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  ShoppingCart, 
  User, 
  Package, 
  Trash2, 
  X, 
  Check,
  Calculator,
  Calendar
} from "lucide-react";
import { fakeApi } from "../fakeApi";
import { Venda, Cliente, Produto } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export function Vendas() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Sale State
  const [selectedClienteId, setSelectedClienteId] = useState<string>("");
  const [cart, setCart] = useState<{ produto: Produto; quantidade: number }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [v, c, p] = await Promise.all([
      fakeApi.getVendas(),
      fakeApi.getClientes(),
      fakeApi.getProdutos(),
    ]);
    setVendas(v.sort((a, b) => b.data.localeCompare(a.data)));
    setClientes(c);
    setProdutos(p);
  };

  const addToCart = (produto: Produto) => {
    setCart(prev => {
      const existing = prev.find(item => item.produto.id === produto.id);
      if (existing) {
        return prev.map(item => 
          item.produto.id === produto.id 
            ? { ...item, quantidade: item.quantidade + 1 } 
            : item
        );
      }
      return [...prev, { produto, quantidade: 1 }];
    });
  };

  const removeFromCart = (produtoId: string) => {
    setCart(prev => prev.filter(item => item.produto.id !== produtoId));
  };

  const totalVenda = cart.reduce((acc, item) => acc + (item.produto.preco * item.quantidade), 0);

  const handleFinalizeVenda = async () => {
    if (cart.length === 0) return;

    const cliente = clientes.find(c => c.id === selectedClienteId);
    
    await fakeApi.createVenda({
      clienteId: selectedClienteId || undefined,
      clienteNome: cliente?.nome || "Consumidor Final",
      produtos: cart.map(item => ({
        produtoId: item.produto.id,
        nome: item.produto.nome,
        quantidade: item.quantidade,
        precoUnitario: item.produto.preco,
      })),
      total: totalVenda,
    });

    setCart([]);
    setSelectedClienteId("");
    setIsModalOpen(false);
    loadData();
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Histórico de Vendas</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-5 h-5" />
          Nova Venda
        </button>
      </div>

      {/* List of Sales */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Produtos</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {vendas.map((venda) => (
                <tr key={venda.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">#{venda.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{venda.clienteNome}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Calendar className="w-4 h-4" />
                      {venda.data}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {venda.produtos.map((p, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold rounded-full text-slate-600 dark:text-slate-400">
                          {p.quantidade}x {p.nome}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-primary">R$ {venda.total.toFixed(2)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Sale Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-[80vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Left Side: Product Selection */}
              <div className="flex-1 p-8 border-r border-slate-100 dark:border-slate-800 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Selecionar Produtos</h3>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Buscar produto..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {produtos.filter(p => p.nome.toLowerCase().includes(searchTerm.toLowerCase())).map(produto => (
                    <button
                      key={produto.id}
                      disabled={produto.estoque === 0}
                      onClick={() => addToCart(produto)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group",
                        produto.estoque === 0 
                          ? "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800/50 border-transparent" 
                          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-primary hover:shadow-lg"
                      )}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Package className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{produto.nome}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">R$ {produto.preco.toFixed(2)}</p>
                        <p className="text-[10px] text-slate-400 mt-1">Estoque: {produto.estoque}</p>
                      </div>
                      <Plus className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side: Cart & Checkout */}
              <div className="w-full md:w-[380px] bg-slate-50 dark:bg-slate-800/30 p-8 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Carrinho</h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-colors">
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                {/* Cliente Selection */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cliente (Opcional)</label>
                  <select
                    value={selectedClienteId}
                    onChange={(e) => setSelectedClienteId(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-900 border-none rounded-xl text-sm outline-none shadow-sm"
                  >
                    <option value="">Consumidor Final</option>
                    {clientes.map(c => (
                      <option key={c.id} value={c.id}>{c.nome}</option>
                    ))}
                  </select>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-6">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2">
                      <ShoppingCart className="w-12 h-12 opacity-20" />
                      <p className="text-sm italic">Carrinho vazio</p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.produto.id} className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm">
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{item.produto.nome}</p>
                          <p className="text-xs text-slate-500">{item.quantidade}x R$ {item.produto.preco.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-primary">R$ {(item.produto.preco * item.quantidade).toFixed(2)}</span>
                          <button 
                            onClick={() => removeFromCart(item.produto.id)}
                            className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Summary */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Subtotal</span>
                    <span className="text-slate-900 dark:text-white font-bold">R$ {totalVenda.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-slate-900 dark:text-white font-black">Total</span>
                    <span className="text-primary font-black">R$ {totalVenda.toFixed(2)}</span>
                  </div>
                  <button
                    disabled={cart.length === 0}
                    onClick={handleFinalizeVenda}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Finalizar Venda
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
