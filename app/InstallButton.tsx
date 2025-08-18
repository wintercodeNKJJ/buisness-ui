"use client";

import { useEffect, useState } from "react";

export default function InstallButton() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handler = (e: Event) => {
      console.log("hello");
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true); // show button when PWA can be installed
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("✅ PWA setup accepted");
    } else {
      console.log("❌ PWA setup dismissed");
    }

    // Reset
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="px-2 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      Install App
    </button>
  );
}
