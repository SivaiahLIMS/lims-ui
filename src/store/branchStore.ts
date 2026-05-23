import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BranchState {
  activeBranchId: number | null;
  activeBranchName: string;
  setActiveBranch: (id: number, name: string) => void;
}

export const useBranchStore = create<BranchState>()(
  persist(
    (set) => ({
      activeBranchId: null,
      activeBranchName: '',
      setActiveBranch: (id, name) => set({ activeBranchId: id, activeBranchName: name }),
    }),
    { name: 'lims-branch' }
  )
);
