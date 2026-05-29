import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import { useReveal } from "@/hooks/useReveal";

export default function Layout({ children }: { children: ReactNode }) {
  // Global scroll-reveal: any element with .reveal / .reveal-up / .stagger etc.
  // becomes visible once it enters the viewport.
  useReveal();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollTopButton />
    </div>
  );
}
