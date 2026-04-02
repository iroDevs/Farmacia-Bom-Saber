import React, { useEffect, useState } from "react";
import { 
  TrendingUp, 
  Users, 
  Package, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { fakeApi } from "../fakeApi";
import { DashboardStats } from "../types";
import { motion } from "motion/react";

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fakeApi.getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <div className="flex items-center justify-center h-64">Carregando...</div>;

  const cards = [
    { 
      label: "Vendas Hoje", 
      value: stats.vendasHoje, 
      icon: TrendingUp, 
      color: "bg-blue-500", 
      trend: "+12%", 
      isPositive: true 
    },
    { 
      label: "Faturamento Mensal", 
      value: `R$ ${stats.faturamentoMes.toFixed(2)}`, 
      icon: ArrowUpRight, 
      color: "bg-emerald-500", 
      trend: "+8%", 
      isPositive: true 
    },
    { 
      label: "Novos Clientes", 
      value: stats.novosClientes, 
      icon: Users, 
      color: "bg-purple-500", 
      trend: "+5%", 
      isPositive: true 
    },
    { 
      label: "Baixo Estoque", 
      value: stats.produtosBaixoEstoque, 
      icon: AlertTriangle, 
      color: "bg-amber-500", 
      trend: "-2", 
      isPositive: false 
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className={cn("p-3 rounded-2xl text-white", card.color)}>
                <card.icon className="w-6 h-6" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                card.isPositive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}>
                {card.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{card.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{card.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Desempenho de Vendas</h3>
            <select className="bg-slate-50 dark:bg-slate-800 border-none text-sm rounded-lg px-3 py-2 text-slate-600 dark:text-slate-300 outline-none">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.vendasPorDia}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="data" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity or Stock Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Estoque Crítico</h3>
            <button className="text-sm text-primary font-medium hover:underline">Ver tudo</button>
          </div>
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Produto Exemplo {i+1}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Categoria Farmacêutica</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-amber-600">5 un.</p>
                  <p className="text-xs text-slate-400 italic">Reposição urgente</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { cn } from "../lib/utils";
