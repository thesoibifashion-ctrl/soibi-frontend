"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Container from "@/components/shared/Container";
import Link from "next/link";
import CartSidebar from "@/components/shared/modals/CartSidebar";
import { isAuthenticated } from "@/lib/auth-finder";
import UserPop from "@/components/shared/UserPop";
import { useIsMobile } from "@/hooks/use-isMobile";

const NAV_LINKS = [
  ["Home", "/"],
  ["Collections", "/collection"],
  ["Shop", "/shop"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  // Product detail pages like /shop/:slug have a white background.
  // /shop itself remains unchanged.
  const isProductPage =
    (pathname.startsWith("/shop/") && pathname !== "/shop") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/history") ||
    pathname.startsWith("/favorites") ||
    pathname.startsWith("/tracking");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock background scroll while mobile menu is open
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const textColor = scrolled || isProductPage ? "text-black" : "text-white";

  const mobileLinks = [
    ...NAV_LINKS,
    ...(authenticated ? [["History", "/history"]] : []),
  ];
  const isMobile = useIsMobile()

  return (
    <>
      {/* Navbar */}
      <header
        className={`
          fixed inset-x-0 top-0 z-[100]
          transition-all duration-500 ease-out
          ${
            scrolled
              ? "border-b border-white/10 bg-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)] backdrop-blur-2xl"
              : "border-transparent bg-transparent"
          }
        `}
      >
        <Container className="mx-auto flex h-20 items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link
              href="/"
              className={`
                text-xl font-semibold tracking-[0.2em]
                transition-colors duration-500
                ${textColor}
              `}
            >
              {scrolled || isProductPage ? (
                <Image
                  src="/icon-black.svg"
                  alt="Logo"
                  width={isMobile ? 70 : 100}
                  height={isMobile ? 70 : 100}
                />
              ) : (
                <Image
                  src="/soibi.svg"
                  alt="Logo"
                  width={isMobile ? 70 : 100}
                  height={isMobile ? 70 : 100}
                />
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-10 md:flex">
              {[
                ...NAV_LINKS,
                ...(authenticated ? [["History", "/history"]] : []),
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className={`
                    text-sm font-medium
                    transition-colors duration-500
                    hover:opacity-60
                    ${textColor}
                  `}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <UserPop scrolled={scrolled || isProductPage} />

            <CartSidebar active={scrolled || isProductPage} />

            {authenticated && (
              <Link href="/favorites" className="hidden md:block">
                <Heart
                  color={
                    scrolled || isProductPage
                      ? "black"
                      : "white"
                  }
                />
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={`
                relative z-[10002] rounded-full md:hidden
                transition-colors duration-500
                hover:bg-black/5
                ${mobileOpen ? "text-black" : textColor}
              `}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                <Menu
                  className={`absolute h-5 w-5 transition-all duration-300 ${
                    mobileOpen
                      ? "rotate-90 opacity-0"
                      : "rotate-0 opacity-100"
                  }`}
                />

                <X
                  className={`absolute h-5 w-5 transition-all duration-300 ${
                    mobileOpen
                      ? "rotate-0 opacity-100"
                      : "-rotate-90 opacity-0"
                  }`}
                />
              </span>
            </Button>
          </div>
        </Container>
      </header>

      {/* Mobile Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`
          fixed inset-0 z-[10000]
          bg-black/40 backdrop-blur-[2px]
          transition-opacity duration-300
          md:hidden
          ${
            mobileOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed right-0 top-0 z-[10001]
          flex h-dvh w-[75%] flex-col
         bg-white/70 backdrop-blur-2xl shadow-2xl
          transition-transform duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          md:hidden
          ${
            mobileOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* Sidebar Header */}
        <div className="flex h-20 items-center border-b border-black/5 px-6">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/icon-black.svg"
              alt="Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
          {mobileLinks.map(([label, href], index) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`
                border-b border-black/5 py-3.5 text-base font-medium text-black
                transition-all duration-500 ease-out last:border-none
                ${
                  mobileOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }
              `}
              style={{
                transitionDelay: mobileOpen
                  ? `${index * 60}ms`
                  : "0ms",
              }}
            >
              {label}
            </Link>
          ))}

          {authenticated && (
            <Link
              href="/favorites"
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-2 py-3.5 text-base font-medium text-black
                transition-all duration-500 ease-out
                ${
                  mobileOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }
              `}
              style={{
                transitionDelay: mobileOpen
                  ? `${mobileLinks.length * 60}ms`
                  : "0ms",
              }}
            >
              <Heart size={18} />
              Favorites
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
