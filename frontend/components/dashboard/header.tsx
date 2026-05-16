"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { User } from "lucide-react";

export function DashboardHeader() {
  const { user } = useAuthStore();

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6 lg:px-8">
      <h2 className="text-lg font-semibold lg:hidden">QRMint</h2>
      <div className="flex-1" />
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{user?.name || 'User'}</span>
          <span className="text-xs text-muted-foreground">{user?.email}</span>
        </div>
        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
