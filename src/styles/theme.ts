'use client';
import { createTheme } from '@mui/material/styles';

// TEMA ORIGINAL - Renomeado para 'cauaTheme', será o padrão para o resto do site.
export const cauaTheme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#f44336',
    },
  },
});

// TEMA DA SEÇÃO MÓDULO - Renomeado para 'moduloTheme'
export const moduloTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3399ff',
    },
    secondary: {
      main: '#ff9800',
    }, // <-- A CHAVE DE 'secondary' FOI FECHADA AQUI
    
    // As seções abaixo foram movidas para o nível correto
    background: {
      default: '#0d1b2a',
      paper: '#1c2e4a',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0bec5',
    },
    error: {
      main: '#f44336',
    }
  }, // <-- Chave de 'palette'
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
  },
});