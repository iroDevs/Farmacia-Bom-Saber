import React, { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Sparkles, 
  History, 
  ChevronRight, 
  FileText, 
  Download,
  Bot,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { fakeApi } from "../fakeApi";
import { cn } from "../lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isGenerating?: boolean;
}

export function Relatorios() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(fakeApi.getRelatoriosHistory());
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = query) => {
    if (!text.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery("");
    setIsGenerating(true);
    fakeApi.saveRelatorioQuery(text);
    setHistory(fakeApi.getRelatoriosHistory());

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Math.random().toString(),
        role: "assistant",
        content: `Com base na sua solicitação "${text}", gerei uma análise detalhada. 
        
        Aqui estão os principais insights:
        1. O faturamento cresceu 15% em comparação ao mês anterior.
        2. A categoria de analgésicos representa 40% das vendas totais.
        3. Identificamos uma oportunidade de aumento de estoque para o próximo feriado.
        
        Deseja exportar este relatório em PDF ou CSV?`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col">
      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-8 space-y-8 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary animate-pulse">
              <Bot className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Relatórios Inteligentes</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md">
                Utilize nossa IA para gerar relatórios personalizados. Basta descrever o que você precisa analisar.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={cn(
                "flex gap-4 p-6 rounded-3xl",
                msg.role === "assistant" 
                  ? "bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800" 
                  : "bg-white dark:bg-slate-900"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0",
                msg.role === "assistant" ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
              )}>
                {msg.role === "assistant" ? <Sparkles className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div className="flex-1 space-y-4">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {msg.role === "assistant" ? "Assistente Pharma" : "Você"}
                </p>
                <div className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </div>
                {msg.role === "assistant" && !isGenerating && (
                  <div className="flex gap-2 pt-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors">
                      <Download className="w-3 h-3" /> Exportar PDF
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors">
                      <FileText className="w-3 h-3" /> Ver Detalhes
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
        {isGenerating && (
          <div className="flex gap-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center animate-spin">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 animate-pulse" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        {/* Suggestions */}
        {messages.length === 0 && history.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {history.map((item, i) => (
              <button
                key={i}
                onClick={() => handleSend(item)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 hover:bg-primary/10 hover:text-primary border border-slate-100 dark:border-slate-800 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400 transition-all"
              >
                <History className="w-3 h-3" />
                {item}
                <ChevronRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}

        <div className="relative group">
          <textarea
            rows={1}
            placeholder="Descreva o relatório que você deseja gerar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="w-full pl-6 pr-16 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-primary/30 rounded-3xl outline-none text-slate-900 dark:text-white resize-none transition-all shadow-sm"
          />
          <button
            onClick={() => handleSend()}
            disabled={!query.trim() || isGenerating}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-3">
          A IA pode cometer erros. Verifique informações importantes.
        </p>
      </div>
    </div>
  );
}
