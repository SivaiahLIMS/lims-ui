import { create } from 'zustand';

type Severity = 'success' | 'error' | 'warning' | 'info';

interface SnackbarItem {
  id: string;
  message: string;
  severity: Severity;
}

interface UiState {
  sidebarOpen: boolean;
  snackbars: SnackbarItem[];
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  showSnackbar: (message: string, severity?: Severity) => void;
  dismissSnackbar: (id: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: true,
  snackbars: [],
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  showSnackbar: (message, severity = 'info') =>
    set((s) => ({
      snackbars: [...s.snackbars, { id: crypto.randomUUID(), message, severity }],
    })),
  dismissSnackbar: (id) =>
    set((s) => ({ snackbars: s.snackbars.filter((n) => n.id !== id) })),
}));
