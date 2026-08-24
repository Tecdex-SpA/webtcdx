"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function EmbeddedModeController() {
  const searchParams = useSearchParams();
  const isEmbedded = searchParams.get("embedded") === "1";

  useEffect(() => {
    document.body.classList.toggle("tcdx-embedded", isEmbedded);
    return () => document.body.classList.remove("tcdx-embedded");
  }, [isEmbedded]);

  return null;
}
