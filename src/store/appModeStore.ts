import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppDataMode = 'unset' | 'demo' | 'live';

interface AppModeState {
  mode: AppDataMode;
  setMode: (mode: AppDataMode) => void;
}

export const useAppModeStore = create<AppModeState>()(
  persist(
    (set) => ({
      mode: 'unset',
      setMode: (mode) => set({ mode }),
    }),
    { name: 'social-caution-app-mode' }
  )
);

export const isDemoMode = () => useAppModeStore.getState().mode === 'demo';
