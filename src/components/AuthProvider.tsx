"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Pages that don't require authentication
const publicPages = ["/login"];

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    // Check authentication status (using sessionStorage so it clears when tab is closed)
    const authStatus = sessionStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const isPublicPage = publicPages.includes(pathname);

      if (!isAuthenticated && !isPublicPage) {
        // Redirect to login if not authenticated and trying to access protected page
        router.replace("/login");
      } else if (isAuthenticated && pathname === "/login") {
        // Redirect to home if already authenticated and trying to access login
        router.replace("/");
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const logout = () => {
    sessionStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    router.replace("/login");
  };

  // Show loading state while checking authentication (only after mount to avoid hydration mismatch)
  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#d5b367] flex items-center justify-center animate-pulse">
            <span className="text-[#0a0a0a] font-bold text-xl">M</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-[#d5b367] border-t-transparent rounded-full animate-spin" />
            <span className="text-white/50">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // Don't render protected content if not authenticated (except for public pages)
  const isPublicPage = publicPages.includes(pathname);
  if (!isAuthenticated && !isPublicPage) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#d5b367] flex items-center justify-center animate-pulse">
            <span className="text-[#0a0a0a] font-bold text-xl">M</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-[#d5b367] border-t-transparent rounded-full animate-spin" />
            <span className="text-white/50">Redirecting...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
