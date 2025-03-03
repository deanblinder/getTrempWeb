"use client";
import { useEffect, useState } from "react";

const useDevice = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(isMobile);
  }, []);
  return { isMobile };
};
export default useDevice;
