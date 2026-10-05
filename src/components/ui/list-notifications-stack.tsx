"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Bell,
  X,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  AlertCircle,
  Megaphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  badge?: string;
  priority?: "urgent" | "high" | "normal" | "info";
  link?: string;
  linkText?: string;
  timestamp?: string;
  sender?: string;
}

const STORAGE_KEY = "sahitya_dismissed_notifications_v1";

/**
 * ListNotificationsStack — Exact @motion/list-notifications-stack implementation.
 * Pure dark glass, zinc borders, clean modern typography without forced theme blending.
 */
export function ListNotificationsStack() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Initialize dismissed IDs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setDismissedIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Fetch admin updates
  const fetchUpdates = useCallback(async () => {
    try {
      const res = await fetch("/api/admin-updates", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && Array.isArray(data.updates)) {
        setNotifications(data.updates);
      }
    } catch (err) {
      console.error("Failed to load admin notification stack:", err);
    }
  }, []);

  useEffect(() => {
    fetchUpdates();
    const interval = setInterval(fetchUpdates, 35000);

    const handleCustomUpdate = () => {
      fetchUpdates();
      setIsMinimized(false);
    };
    window.addEventListener("sahitya-admin-update", handleCustomUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener("sahitya-admin-update", handleCustomUpdate);
    };
  }, [fetchUpdates]);

  const activeNotifications = useMemo(() => {
    return notifications.filter((n) => !dismissedIds.includes(n.id));
  }, [notifications, dismissedIds]);

  const dismissNotification = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = [...dismissedIds, id];
    setDismissedIds(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const dismissAll = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const allIds = notifications.map((n) => n.id);
    const updated = Array.from(new Set([...dismissedIds, ...allIds]));
    setDismissedIds(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const resetNotifications = () => {
    setDismissedIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsMinimized(false);
    setIsExpanded(true);
  };

  if (activeNotifications.length === 0) {
    if (notifications.length > 0 && isMinimized) {
      return (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 select-none">
          <button
            onClick={resetNotifications}
            title={isEn ? "View Notices Archive" : "सूचना पहा"}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 transition-all shadow-xl cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium font-marathi-body">
              {isEn ? "Notices" : "सूचना"}
            </span>
          </button>
        </div>
      );
    }
    return null;
  }

  // Minimized floating launcher bubble
  if (isMinimized) {
    return (
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 select-none">
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMinimized(false)}
          className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-zinc-900/95 hover:bg-zinc-800 border border-zinc-700 text-white shadow-2xl cursor-pointer backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <Bell className="w-4 h-4 text-zinc-300" />
          <span className="font-marathi-body text-xs font-semibold text-white">
            {isEn
              ? `${activeNotifications.length} New Update${activeNotifications.length > 1 ? "s" : ""}`
              : `${activeNotifications.length} नवीन सूचना`}
          </span>
        </motion.button>
      </div>
    );
  }

  return (
    <aside
      aria-label={isEn ? "Library Admin Updates Stack" : "ग्रंथालय सूचना स्टॅक"}
      className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-50 w-[94vw] sm:w-[400px] max-w-[420px] font-sans pointer-events-none select-none"
    >
      <LayoutGroup id="notification-stack">
        {/* ── HEADER CONTROLS BAR ── */}
        <motion.div
          layout
          className="pointer-events-auto flex items-center justify-between px-3.5 py-1.5 mb-2 rounded-xl bg-zinc-900/95 backdrop-blur-md border border-zinc-800 text-xs text-zinc-300 shadow-xl"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold text-white text-[11px] font-marathi-heading">
              {isEn ? "Notice Stack" : "अधिकृत सूचना"}
            </span>
            <span className="px-1.5 py-0.2 rounded-md bg-zinc-800 text-zinc-300 text-[10px] font-medium border border-zinc-700">
              {activeNotifications.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {activeNotifications.length > 1 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title={isExpanded ? "Collapse Stack" : "Expand All"}
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronUp className="w-3.5 h-3.5" />
                )}
              </button>
            )}

            <button
              onClick={dismissAll}
              className="px-2 py-0.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white text-[10px] font-medium transition-colors cursor-pointer"
            >
              {isEn ? "Clear" : "सर्व हटवा"}
            </button>

            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* ── NOTIFICATION CARDS CONTAINER ── */}
        <div className="relative pointer-events-auto">
          <AnimatePresence mode="popLayout" initial={false}>
            {isExpanded ? (
              // ── EXPANDED FULL LIST MODE ──
              <motion.div
                key="expanded-list"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2.5 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin"
              >
                {activeNotifications.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <NotificationCard
                      item={item}
                      isTop={true}
                      onDismiss={() => dismissNotification(item.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // ── COLLAPSED STACKED DECK MODE (@motion/list-notifications-stack) ──
              <div className="relative h-[145px]">
                {activeNotifications.slice(0, 3).map((item, idx) => {
                  const isTop = idx === 0;
                  const scale = 1 - idx * 0.05;
                  const translateY = idx * 10;
                  const zIndex = 30 - idx;
                  const opacity = 1 - idx * 0.15;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{
                        opacity,
                        scale,
                        y: translateY,
                        zIndex,
                      }}
                      exit={{
                        opacity: 0,
                        x: 80,
                        scale: 0.9,
                        transition: { duration: 0.25 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 28,
                      }}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        transformOrigin: "bottom center",
                      }}
                      onClick={() => {
                        if (!isTop) setIsExpanded(true);
                      }}
                      className={cn(!isTop && "cursor-pointer")}
                    >
                      <NotificationCard
                        item={item}
                        isTop={isTop}
                        stackedCount={activeNotifications.length}
                        onDismiss={() => dismissNotification(item.id)}
                        onExpand={() => setIsExpanded(true)}
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </aside>
  );
}

interface NotificationCardProps {
  item: NotificationItem;
  isTop: boolean;
  stackedCount?: number;
  onDismiss: () => void;
  onExpand?: () => void;
}

function NotificationCard({
  item,
  isTop,
  stackedCount = 1,
  onDismiss,
  onExpand,
}: NotificationCardProps) {
  const isUrgent = item.priority === "urgent";

  return (
    <div
      className={cn(
        "relative rounded-2xl p-4 transition-all border backdrop-blur-xl shadow-xl",
        "bg-zinc-950/95 dark:bg-black/95 text-white",
        isUrgent
          ? "border-rose-500/40 shadow-rose-950/30"
          : "border-zinc-800 hover:border-zinc-700"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 flex-1 min-w-0">
          {/* Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide",
                isUrgent
                  ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                  : "bg-zinc-800 text-zinc-300 border border-zinc-700"
              )}
            >
              {isUrgent ? (
                <AlertCircle className="w-3 h-3 text-rose-400" />
              ) : (
                <Megaphone className="w-3 h-3 text-zinc-400" />
              )}
              <span>{item.badge || (isUrgent ? "तातडीची सूचना" : "सूचना")}</span>
            </span>

            {item.sender && (
              <span className="text-[10px] text-zinc-400 truncate">
                • {item.sender}
              </span>
            )}
          </div>

          {/* Title */}
          <h4 className="font-semibold text-xs sm:text-[13px] text-white leading-snug line-clamp-1">
            {item.title}
          </h4>

          {/* Message */}
          <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
            {item.message}
          </p>

          {/* Action Links & Stack Expansion */}
          <div className="flex items-center justify-between pt-1 text-xs">
            {item.link ? (
              <Link
                href={item.link}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-blue-300 transition-colors underline-offset-2 hover:underline"
              >
                <span>{item.linkText || "तपशील पहा"}</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            ) : <span />}

            {stackedCount > 1 && onExpand && (
              <button
                type="button"
                onClick={onExpand}
                className="text-[10px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                +{stackedCount - 1} आणखी सूचना
              </button>
            )}
          </div>
        </div>

        {/* Close Button */}
        {isTop && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss notification"
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ListNotificationsStack;
