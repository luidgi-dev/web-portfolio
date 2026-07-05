'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import {
  DEFAULT_THEME_ID,
  isThemeId,
  THEME_STORAGE_KEY,
  themeIds,
  type ThemeId,
} from '@/lib/themes';

interface ThemeContextValue {
  themeId: ThemeId;
  setThemeId: (themeId: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

let clientThemeId: ThemeId = DEFAULT_THEME_ID;
const themeListeners = new Set<() => void>();

function readStoredTheme(): ThemeId {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME_ID;
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored && isThemeId(stored)) {
    return stored;
  }

  return DEFAULT_THEME_ID;
}

function subscribeToTheme(callback: () => void) {
  themeListeners.add(callback);
  return () => themeListeners.delete(callback);
}

function getThemeSnapshot(): ThemeId {
  return clientThemeId;
}

function getServerThemeSnapshot(): ThemeId {
  return DEFAULT_THEME_ID;
}

function applyThemeClass(themeId: ThemeId) {
  const root = document.documentElement;
  root.classList.remove(...themeIds);
  root.classList.add(themeId);
}

function setClientTheme(themeId: ThemeId) {
  clientThemeId = themeId;
  applyThemeClass(themeId);
  localStorage.setItem(THEME_STORAGE_KEY, themeId);
  themeListeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeId = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  useEffect(() => {
    setClientTheme(readStoredTheme());
  }, []);

  const setThemeId = useCallback((nextThemeId: ThemeId) => {
    setClientTheme(nextThemeId);
  }, []);

  const value = useMemo(() => ({ themeId, setThemeId }), [themeId, setThemeId]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
