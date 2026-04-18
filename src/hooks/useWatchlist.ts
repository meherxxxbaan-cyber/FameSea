"use client";
import { useState, useEffect, useCallback } from "react";

const KEY = "socialqx_watchlist";

export function useWatchlist() {
  const [ids, setIds] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setIds(new Set(JSON.parse(stored)));
    } catch {}
    setHydrated(true);
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try { localStorage.setItem(KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  }, []);

  const has = useCallback((id: string) => ids.has(id), [ids]);
  const count = ids.size;

  return { toggle, has, count, ids, hydrated };
}
