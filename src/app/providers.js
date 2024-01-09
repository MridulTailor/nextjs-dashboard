// app/providers.tsx
"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export function Providers({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
