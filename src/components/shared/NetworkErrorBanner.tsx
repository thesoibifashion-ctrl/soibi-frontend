// "use client";

// import { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import { networkStatus } from "@/lib/network-status";

// export default function NetworkErrorBanner() {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const update = () => setVisible(networkStatus.isVisible());
//     const online = () => networkStatus.reportResponse();
//     const offline = () => networkStatus.reportFailure();
//     update();
//     window.addEventListener("online", online);
//     window.addEventListener("offline", offline);
//     return () => {
//       window.removeEventListener("online", online);
//       window.removeEventListener("offline", offline);
//     };
//   }, []);

//   useEffect(() => {
//     return networkStatus.subscribe(() => setVisible(networkStatus.isVisible()));
//   }, []);

//   if (!visible) return null;
//   return (
//     <div role="alert" aria-live="polite" className="fixed inset-x-0 top-0 z-[9999] flex items-center justify-center bg-destructive px-10 py-3 text-center text-sm text-white shadow-lg">
//       <span>Oops, it seems you have a network issue. Please check your internet connection.</span>
//       <button aria-label="Dismiss network error" onClick={networkStatus.dismiss} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-white/20"><X size={18} /></button>
//     </div>
//   );
// }
