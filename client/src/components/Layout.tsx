import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Package, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon, 
  User, 
  Settings, 
  LogOut,
  Menu
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { cn } from "../lib/utils";

const menuItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/clientes", icon: Users, label: "Clientes" },
  { path: "/produtos", icon: Package, label: "Produtos" },
  { path: "/vendas", icon: ShoppingCart, label: "Vendas" },
  { path: "/relatorios", icon: FileText, label: "Relatórios" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <div className="flex min-h-screen transition-colors duration-300">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarExpanded ? 260 : 80 }}
        className={cn(
          "fixed left-0 top-0 h-full z-40 border-r transition-colors duration-300",
          "bg-sidebar-light dark:bg-sidebar-dark border-slate-200 dark:border-slate-800 shadow-xl"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            {isSidebarExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-3 font-bold text-xl tracking-tight text-slate-900 dark:text-white"
              >
                PharmaDash
              </motion.span>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-xl transition-all duration-200 group relative",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/30" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-primary dark:hover:text-primary-dark"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", !isSidebarExpanded && "mx-auto")} />
                  {isSidebarExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-3 font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {!isSidebarExpanded && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Collapse Toggle */}
          <button
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="p-4 flex items-center justify-center text-slate-500 hover:text-primary transition-colors border-t border-slate-200 dark:border-slate-800"
          >
            {isSidebarExpanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main
        className={cn(
          "flex-1 transition-all duration-300 min-h-screen",
          isSidebarExpanded ? "pl-[260px]" : "pl-[80px]"
        )}
      >
        {/* Top Navbar */}
        <header className="h-16 sticky top-0 z-30 flex items-center justify-between px-8 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {menuItems.find(i => i.path === location.pathname)?.label || "Página"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <User className="w-5 h-5" />
                </div>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsUserMenuOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Admin Pharma</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">pedrohenriquelouresoliveira@gmail.com</p>
                      </div>
                      <Link to="/perfil" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <User className="w-4 h-4" /> Perfil
                      </Link>
                      <Link to="/configuracoes" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <Settings className="w-4 h-4" /> Configurações
                      </Link>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <LogOut className="w-4 h-4" /> Sair
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
