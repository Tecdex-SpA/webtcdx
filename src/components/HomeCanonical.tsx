"use client";

import { useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";

export function HomeCanonical() {
  const inserted = useRef(false);
  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    return <link rel="canonical" href="https://isos.tecdex.net/" />;
  });
  return null;
}
