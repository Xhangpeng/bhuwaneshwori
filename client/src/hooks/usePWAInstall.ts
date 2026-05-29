import { useEffect, useState } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    __pwaDeferredPrompt?: BeforeInstallPromptEvent | null;
  }
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms?: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform?: string;
  }>;
  prompt(): Promise<void>;
}

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as any).standalone === true;

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (isStandalone()) {
      setIsInstalled(true);
      return;
    }

    if (window.__pwaDeferredPrompt) {
      setDeferredPrompt(window.__pwaDeferredPrompt);
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const promptEvent = event as BeforeInstallPromptEvent;
      window.__pwaDeferredPrompt = promptEvent;
      setDeferredPrompt(promptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      window.__pwaDeferredPrompt = null;
      setDeferredPrompt(null);
      toast.success("School app installed successfully.");
    };

    const handlePWAReady = (event: Event) => {
      const promptEvent = (event as CustomEvent<{ prompt?: BeforeInstallPromptEvent }>).detail?.prompt;
      if (promptEvent) {
        window.__pwaDeferredPrompt = promptEvent;
        setDeferredPrompt(promptEvent);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("pwaReadyToInstall", handlePWAReady as EventListener);
    window.addEventListener("pwaInstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("pwaReadyToInstall", handlePWAReady as EventListener);
      window.removeEventListener("pwaInstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (isInstalled || isStandalone()) {
      setIsInstalled(true);
      toast.success("School app is already installed.");
      return;
    }

    if (!deferredPrompt) {
      toast.info("Install prompt is not ready yet. Please try again in Chrome after the page finishes loading.");
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        setIsInstalled(true);
        window.__pwaDeferredPrompt = null;
        toast.success("Thank you for installing our school app.");
      }

      window.__pwaDeferredPrompt = null;
      setDeferredPrompt(null);
    } catch (error) {
      console.error("PWA install prompt failed:", error);
      toast.error("Could not open the Chrome install prompt. Please refresh and try again.");
    }
  };

  return {
    canInstall: Boolean(deferredPrompt) && !isInstalled,
    isInstalled,
    promptInstall,
  };
}
