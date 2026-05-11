"use client";

import { usePathname } from "next/navigation";
import { NormativeLanding } from "@/components/NormativeLanding";

export function RouteRenderer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <NormativeLanding />;
  }

  return <>{children}</>;
}
