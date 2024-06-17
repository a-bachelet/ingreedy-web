'use client';

import useDarkMode from "@/hooks/useDarkMode";
import { ThemeProvider } from "@material-tailwind/react";
import React, { ReactNode, useEffect } from "react";

 
export function Providers({ children }: { children: any }) {
  const [colorTheme, setTheme] = useDarkMode();
  
  

  
  return (
    <ThemeProvider value={"light"}>
      {children}
    </ThemeProvider>
  );
}