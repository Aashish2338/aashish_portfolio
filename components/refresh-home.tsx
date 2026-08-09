"use client";

import { useEffect } from "react";

export function RefreshHome() {
  useEffect(() => {
    if (window.location.hash && window.location.hash !== "#home") {
      history.replaceState(null, "", "#home");
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
