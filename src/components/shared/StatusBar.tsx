// components/GlobalStatusBar.tsx
import { useEffect, useState, useSyncExternalStore } from "react";
import { useQueryClient, useIsFetching, useIsMutating, onlineManager } from "@tanstack/react-query";

export function GlobalStatusBar() {
  const qc = useQueryClient();
  const busy = useIsFetching() + useIsMutating() > 0;

  const online = useSyncExternalStore(
    (cb) => onlineManager.subscribe(cb),
    () => onlineManager.isOnline(),
  );

  const [slow, setSlow] = useState(false);
  const [failed, setFailed] = useState(false);

  // "slow" = something has been loading for more than 3 seconds
  useEffect(() => {
    if (!busy) {
      setSlow(false);
      return;
    }
    const t = setTimeout(() => setSlow(true), 3000);
    return () => clearTimeout(t);
  }, [busy]);

  // watch every query for a final failure (after retries are exhausted)
  useEffect(() => {
    return qc.getQueryCache().subscribe((event) => {
      if (event.type !== "updated") return;
      const { action } = event;
      if (action.type === "error") {
        const e = action.error as ApiError;
        if (e.kind !== "http" || (e.status ?? 0) >= 500) setFailed(true);
      }
      if (action.type === "success") setFailed(false);
    });
  }, [qc]);

  const retry = () => {
    setFailed(false);
    qc.refetchQueries({ predicate: (q) => q.state.status === "error" });
  };

  let bar: { text: string; className: string; action?: React.ReactNode } | null = null;

  if (!online) {
    bar = { text: "You're offline. We'll reconnect automatically.", className: "bg-destructive text-destructive-foreground" };
  } else if (failed) {
    bar = {
      text: "Couldn't reach the server.",
      className: "bg-destructive text-destructive-foreground",
      action: (
        <button onClick={retry} className="underline ml-3">
          Retry
        </button>
      ),
    };
  } else if (slow) {
    bar = { text: "Taking longer than usual…", className: "bg-amber-500 text-black" };
  }

  if (!bar) return null;

  return (
    <div role="status" aria-live="polite" className={`sticky top-0 z-50 py-1.5 text-center text-sm ${bar.className}`}>
      {bar.text}
      {bar.action}
    </div>
  );
}