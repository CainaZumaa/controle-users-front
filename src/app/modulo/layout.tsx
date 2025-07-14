'use client';

import { ThemeProvider } from '@mui/material/styles';
import { moduloTheme } from '@/styles/theme'; 

export default function ModuloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={moduloTheme}>  
      {children}
    </ThemeProvider>
  );
}