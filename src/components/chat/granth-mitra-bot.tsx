"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  BookOpen,
  Bot,
  ChevronRight,
  CheckCircle2,
  Search,
  Home,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  badge?: string;
  actionUrl?: string;
  actionText?: string;
}

const FAQ_ITEMS = [
  {
    title: "ग्रंथालयाचे सदस्यत्व कसे घ्यावे? (Membership)",
    query: "सभासद कसे व्हावे व वार्षिक शुल्क किती आहे?",
  },
  {
    title: "नवीन पुस्तक मागणी कशी करावी? (Book Request)",
    query: "नवीन पुस्तकाची मागणी कशी नोंदवावी?",
  },
  {
    title: "वाचनालयाची वेळ आणि सुट्ट्या (Library Timings)",
    query: "ग्रंथालयाची वेळ आणि सुट्ट्या कोणत्या आहेत?",
  },
  {
    title: "मुकुंदराज व 'विवेकसिंधू' दुर्मीळ संग्रह (Rare Collections)",
    query: "मुकुंदराज व विवेकसिंधू दुर्मीळ संग्रहाबद्दल सांगा",
  },
  {
    title: "MPSC/UPSC अभ्यासिका सुविधा (Study Hall)",
    query: "MPSC/UPSC अभ्यासिकेची माहिती द्या",
  },
];

export function GranthMitraBot() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "messages" | "help">("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "bot",
      badge: "ग्रंथालय साहाय्य",
      text: "नमस्कार! साहित्य निकेतन सार्वजनिक ग्रंथालय सहाय्य कक्षात आपले स्वागत आहे. 📚\n\nग्रंथालयातील ३९,९५३ मुद्रित ग्रंथ, संदर्भ कक्ष, सभासदत्व नोंदणी किंवा वाचनालय वेळेबद्दल विचारणा करू शकता.",
      timestamp: "10:00 AM",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && activeTab === "messages") {
      scrollToBottom();
    }
  }, [messages, isOpen, activeTab, isTyping]);

  const generateBotReply = (userQuery: string): { text: string; badge?: string; actionUrl?: string; actionText?: string } => {
    const q = userQuery.toLowerCase();

    if (q.includes("वेळ") || q.includes("time") || q.includes("timing") || q.includes("open")) {
      return {
        badge: "वेळापत्रक",
        text: "🏛️ **साहित्य निकेतन ग्रंथालय वेळ पत्रक:**\n\n• **मुख्य वाचनालय:** सकाळी ८:०० ते सायंकाळी ८:३० (सोमवार ते शनिवार)\n• **वृत्तपत्र वाचन कक्ष:** सकाळी ७:०० पासून खुले\n• **अभ्यासिका:** सकाळी ६:०० ते रात्री १०:००\n• **पत्ता:** शुक्रवार पेठ, अंबाजोगाई (जि. बीड)",
        actionUrl: "/library",
        actionText: "ग्रंथालय दालने पाहा",
      };
    }

    if (q.includes("मुकुंदराज") || q.includes("विवेकसिंधू") || q.includes("हस्तलिखित") || q.includes("इतिहास")) {
      return {
        badge: "ऐतिहासिक वारसा",
        text: "📜 **आद्यकवी मुकुंदराज व 'विवेकसिंधू':**\n\nअंबाजोगाई ही मराठी भाषेची आद्य भूमी आहे. १२ व्या शतकातील आद्यकवी मुकुंदराज रचित 'विवेकसिंधू' आणि संत दासोपंत यांच्या रचनांचे मूळ संदर्भ व दुर्मीळ प्रती ग्रंथालयाच्या अभिलेखागारात जतन करण्यात आल्या आहेत.",
        actionUrl: "/history",
        actionText: "दुर्मीळ हस्तलिखिते पाहा",
      };
    }

    if (q.includes("सभासद") || q.includes("member") || q.includes("शुल्क")) {
      return {
        badge: "सभासदत्व",
        text: "💳 **ग्रंथालय सभासदत्व:**\n\n• ग्रंथालयात नोंदणीकृत सभासदांना एका वेळी २ पुस्तके १४ दिवसांच्या मुदतीसाठी दिली जातात.\n• संदर्भ ग्रंथ व दुर्मीळ हस्तलिखिते वाचनालयातच अभ्यासासाठी उपलब्ध असतात.\n• ऑनलाइन सभासदत्व अर्ज भरण्यासाठी खालील दुव्याचा वापर करावा.",
        actionUrl: "/membership",
        actionText: "सभासदत्व नोंदणी अर्ज",
      };
    }

    return {
      badge: "ग्रंथालय साहाय्य",
      text: `आपल्या '${userQuery}' या विचारणेबद्दल धन्यवाद. साहित्य निकेतन ग्रंथालयातील ३९,९५३ मुद्रित ग्रंथ व संदर्भ साहित्याची नोंद ग्रंथसूचीत उपलब्ध आहे. सविस्तर माहितीसाठी प्रत्यक्ष ग्रंथालय कार्यालयाशी संपर्क साधावा.`,
      actionUrl: "/catalogue",
      actionText: "ग्रंथसूची शोधा",
    };
  };

  const handleSend = (overrideQuery?: string) => {
    const query = overrideQuery || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!overrideQuery) setInput("");
    setIsTyping(true);
    setActiveTab("messages");

    setTimeout(() => {
      const botResponse = generateBotReply(query);
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: botResponse.text,
        badge: botResponse.badge,
        actionUrl: botResponse.actionUrl,
        actionText: botResponse.actionText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-5 right-4 sm:right-5 z-40 pointer-events-auto font-marathi-body">
      {/* Floating Chat Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Granth Mitra Chatbot"
        className="h-14 w-14 rounded-full bg-[#C0392B] hover:bg-[#A93226] text-white shadow-2xl flex items-center justify-center border-2 border-[#C89B3C] transition-colors relative cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <ChevronDown className="h-7 w-7 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative"
            >
              <MessageSquare className="h-6 w-6 text-white" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#C89B3C] border-2 border-[#C0392B] animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* VEED.IO Style Chatbot Modal Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[380px] h-[580px] max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl border border-[#C89B3C]/40 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden text-gray-900 dark:text-slate-100 z-50"
          >
            {/* --------------------------------------------------
                1. Top Header Area (Brand Logo & Team Avatars)
               -------------------------------------------------- */}
            <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-800/80 shrink-0 bg-white dark:bg-slate-900">
              {/* Brand Logo */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-[#C0392B] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  <BookOpen className="h-4.5 w-4.5 text-[#DDB258]" />
                </div>
                <div>
                  <span className="font-marathi-heading text-lg font-black tracking-tight text-gray-900 dark:text-white leading-none block">
                    साहित्य निकेतन
                  </span>
                  <span className="text-[10px] text-[#C0392B] dark:text-amber-400 font-bold uppercase tracking-wider block">
                    ग्रंथालय साहाय्य कक्ष
                  </span>
                </div>
              </div>

              {/* Top Right: Team Avatars & Collapse Button */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-slate-900 bg-[#C89B3C] text-white text-[10px] font-bold flex items-center justify-center">
                    SN
                  </div>
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-slate-900 bg-[#C0392B] text-white text-[10px] font-bold flex items-center justify-center">
                    LIB
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Chat"
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer ml-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* --------------------------------------------------
                2. Main Body Content (Tabs: Home / Messages / Help)
               -------------------------------------------------- */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-slate-950/40">
              {/* TAB 1: HOME (Matching user screenshot exactly!) */}
              {activeTab === "home" && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  {/* Greeting Block */}
                  <div className="pt-2 px-1">
                    <p className="text-lg font-bold text-gray-500 dark:text-slate-400 font-marathi-body flex items-center gap-1.5">
                      <span>वाचक साहाय्य</span>
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white font-marathi-heading leading-tight tracking-tight mt-0.5">
                      आपणास काय माहिती हवी आहे?
                    </h2>
                  </div>

                  {/* Card 1: "Send us a message" */}
                  <div
                    onClick={() => setActiveTab("messages")}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200/90 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <h3 className="font-extrabold text-sm text-gray-900 dark:text-white font-marathi-body group-hover:text-[#C0392B] transition-colors">
                        ग्रंथालय कार्यालयास संदेश पाठवा
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-slate-400 font-medium mt-0.5">
                        ग्रंथालय कामकाजाच्या वेळेत संपर्क
                      </p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 text-gray-900 dark:text-white flex items-center justify-center group-hover:bg-[#C0392B] group-hover:text-white transition-colors shrink-0">
                      <Send className="h-4 w-4 ml-0.5" />
                    </div>
                  </div>

                  {/* Card 2: System Status */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200/90 dark:border-slate-800 p-3.5 shadow-sm flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-gray-900 dark:text-slate-100">
                        प्रणाली: कॅटलॉग व ग्रंथालय सेवा सुरळीत
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">
                        Updated Today · 15:30 IST
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Search & FAQ List */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200/90 dark:border-slate-800 p-3.5 shadow-sm space-y-3">
                    {/* Search Input Bar */}
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="मदत किंवा प्रश्न शोधा (Search for help)..."
                        className="w-full pl-9 pr-3 py-2 bg-gray-100 dark:bg-slate-800 rounded-xl text-xs text-gray-900 dark:text-slate-100 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#C0392B]"
                      />
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-1 pt-1">
                      {filteredFaqs.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSend(item.query)}
                          className="flex items-center justify-between py-2 px-2.5 rounded-xl hover:bg-[#FAF2E6] dark:hover:bg-slate-800/80 cursor-pointer transition-colors text-xs font-bold text-gray-800 dark:text-slate-200 group"
                        >
                          <span className="truncate pr-2">{item.title}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#C0392B] shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: MESSAGES (Live Conversation View) */}
              {activeTab === "messages" && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-3 pb-2"
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      {msg.sender === "bot" && (
                        <div className="flex items-center gap-1.5 mb-1">
                          <Bot className="h-3.5 w-3.5 text-[#C0392B]" />
                          <span className="text-[10px] font-extrabold text-[#C0392B] uppercase flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-[#C89B3C]" />
                            <span>{msg.badge || "ग्रंथ-मित्र AI"}</span>
                          </span>
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed font-marathi-body shadow-xs ${msg.sender === "user"
                            ? "bg-[#C0392B] text-white rounded-br-none"
                            : "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-slate-100 rounded-bl-none"
                          }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>

                        {msg.actionUrl && (
                          <a
                            href={msg.actionUrl}
                            className="mt-2.5 inline-flex items-center gap-1 rounded-lg bg-[#BF4B1A] hover:bg-[#A63F12] text-white px-2.5 py-1 text-[11px] font-bold transition-colors shadow-2xs"
                          >
                            <span>{msg.actionText}</span>
                          </a>
                        )}
                      </div>

                      <span className="text-[9px] text-gray-400 mt-1 px-1">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-gray-200 dark:border-slate-800 w-fit">
                      <Bot className="h-4 w-4 text-[#C0392B] animate-bounce" />
                      <span>ग्रंथ-मित्र टाईप करत आहे...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </motion.div>
              )}

              {/* TAB 3: HELP (FAQ Center) */}
              {activeTab === "help" && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-3"
                >
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-2">
                    <h3 className="font-extrabold text-sm text-[#C0392B]">
                      साहित्य निकेतन वाचन मार्गदर्शिका
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
                      अंबाजोगाई शहरातील ९५ वर्षांची अखंड ज्ञानसाधना. २०,०००+ ग्रंथ संग्रह, अभ्यासिका आणि डिजिटल सुविधांचा लाभ घ्या.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {FAQ_ITEMS.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSend(item.query)}
                        className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-gray-200 dark:border-slate-800 hover:border-[#C0392B] cursor-pointer transition-all flex items-center justify-between text-xs font-bold"
                      >
                        <span>{item.title}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Bar (Only visible on Messages tab or when user wants to type) */}
            {activeTab === "messages" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="आपला संदेश टाईप करा (Type message)..."
                  className="flex-1 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 px-3.5 py-2.5 text-xs text-gray-900 dark:text-slate-100 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#C0392B]"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="h-9 w-9 rounded-xl bg-[#C0392B] hover:bg-[#A93226] disabled:opacity-50 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-xs"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}

            {/* --------------------------------------------------
                3. Bottom Navigation Dock (Home / Messages / Help)
               -------------------------------------------------- */}
            <div className="h-16 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-around px-4 shrink-0 font-marathi-body">
              <button
                onClick={() => setActiveTab("home")}
                className={`flex flex-col items-center gap-0.5 text-xs font-bold transition-colors cursor-pointer ${activeTab === "home" ? "text-gray-950 dark:text-white" : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                <Home className={`h-5 w-5 ${activeTab === "home" ? "fill-gray-950 dark:fill-white text-gray-950 dark:text-white" : ""}`} />
                <span>Home</span>
              </button>

              <button
                onClick={() => setActiveTab("messages")}
                className={`flex flex-col items-center gap-0.5 text-xs font-bold transition-colors cursor-pointer ${activeTab === "messages" ? "text-gray-950 dark:text-white" : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                <MessageSquare className={`h-5 w-5 ${activeTab === "messages" ? "fill-gray-950 dark:fill-white text-gray-950 dark:text-white" : ""}`} />
                <span>Messages</span>
              </button>

              <button
                onClick={() => setActiveTab("help")}
                className={`flex flex-col items-center gap-0.5 text-xs font-bold transition-colors cursor-pointer ${activeTab === "help" ? "text-gray-950 dark:text-white" : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                <HelpCircle className={`h-5 w-5 ${activeTab === "help" ? "fill-gray-950 dark:fill-white text-gray-950 dark:text-white" : ""}`} />
                <span>Help</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
