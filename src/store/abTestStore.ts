import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ABVariant } from '../ab-test/config';

export type AgeGroup = 'preschool' | 'elementary' | 'teen'; // 2-5, 6-11, 12-17

export interface ChildProfile {
  id: string;
  ageGroup: AgeGroup;
  devices: string[];    // 'phone' | 'tablet' | 'laptop' | 'gaming' | 'smart-tv'
  platforms: string[];  // 'youtube' | 'tiktok' | 'instagram' | 'roblox' | 'discord' …
}

export interface FamilyProfile {
  children: ChildProfile[];
  selectedServices: string[];   // platforms selected in wizard step 3
  goals: string[];              // goals chosen in wizard step 4
  completedOnboarding: boolean;
}

interface ABTestState {
  variant: ABVariant | null;
  onboardingStep: number;         // 0=not started, 1-4=active steps, 5=complete
  familyProfile: FamilyProfile;
  selectedConcerns: string[];     // Variant B: concerns chosen on landing
  assessmentCompleted: boolean;
  privacyScore: number | null;    // populated after assessment completes
  // Actions
  setVariant: (v: ABVariant) => void;
  setOnboardingStep: (step: number) => void;
  updateFamilyProfile: (update: Partial<FamilyProfile>) => void;
  addChild: (child: ChildProfile) => void;
  removeChild: (id: string) => void;
  setSelectedConcerns: (concerns: string[]) => void;
  setAssessmentCompleted: (done: boolean) => void;
  setPrivacyScore: (score: number) => void;
  resetABState: () => void;
}

const defaultFamilyProfile: FamilyProfile = {
  children: [],
  selectedServices: [],
  goals: [],
  completedOnboarding: false,
};

export const useABTestStore = create<ABTestState>()(
  persist(
    (set) => ({
      variant: null,
      onboardingStep: 0,
      familyProfile: defaultFamilyProfile,
      selectedConcerns: [],
      assessmentCompleted: false,
      privacyScore: null,

      setVariant: (variant) => set({ variant }),
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      updateFamilyProfile: (update) =>
        set((s) => ({ familyProfile: { ...s.familyProfile, ...update } })),
      addChild: (child) =>
        set((s) => ({
          familyProfile: {
            ...s.familyProfile,
            children: [...s.familyProfile.children, child],
          },
        })),
      removeChild: (id) =>
        set((s) => ({
          familyProfile: {
            ...s.familyProfile,
            children: s.familyProfile.children.filter((c) => c.id !== id),
          },
        })),
      setSelectedConcerns: (concerns) => set({ selectedConcerns: concerns }),
      setAssessmentCompleted: (done) => set({ assessmentCompleted: done }),
      setPrivacyScore: (score) => set({ privacyScore: score }),
      resetABState: () =>
        set({
          onboardingStep: 0,
          familyProfile: defaultFamilyProfile,
          selectedConcerns: [],
          assessmentCompleted: false,
          privacyScore: null,
        }),
    }),
    { name: 'sc-ab-test-state' }
  )
);
