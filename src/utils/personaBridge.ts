import { PersonaType } from '../core/types/personaTypes';

const MAIN_PERSONA_KEY = 'socialcaution-persona';
const DEMO_STORAGE_KEY = 'ermits-demo-data';

/** Maps main-app persona slugs to MVP demo caution-feed personas. */
export const MAIN_TO_DEMO_PERSONA: Record<PersonaType, string> = {
  [PersonaType.CAUTIOUS_PARENT]: 'parent',
  [PersonaType.ONLINE_SHOPPER]: 'general',
  [PersonaType.PRIVATE_INDIVIDUAL]: 'general',
  [PersonaType.SOCIAL_INFLUENCER]: 'teen',
  [PersonaType.PRIVACY_ADVOCATE]: 'privacy-advocate',
  [PersonaType.CONCERNED_EMPLOYEE]: 'professional',
};

/** Maps MVP demo persona names back to the closest main-app persona. */
export const DEMO_TO_MAIN_PERSONA: Record<string, PersonaType> = {
  parent: PersonaType.CAUTIOUS_PARENT,
  teen: PersonaType.SOCIAL_INFLUENCER,
  professional: PersonaType.CONCERNED_EMPLOYEE,
  senior: PersonaType.PRIVATE_INDIVIDUAL,
  'privacy-advocate': PersonaType.PRIVACY_ADVOCATE,
  general: PersonaType.PRIVATE_INDIVIDUAL,
};

export function mainPersonaToDemo(persona: PersonaType): string {
  return MAIN_TO_DEMO_PERSONA[persona];
}

export function demoPersonaToMain(demoName: string): PersonaType | null {
  return DEMO_TO_MAIN_PERSONA[demoName] ?? null;
}

export function isValidMainPersona(value: string | null): value is PersonaType {
  return value !== null && Object.values(PersonaType).includes(value as PersonaType);
}

function readDemoData(): { user: { selectedPersona?: string | null }; selectedPersona: string | null } | null {
  try {
    const stored = localStorage.getItem(DEMO_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function writeDemoPersona(demoName: string): void {
  try {
    const existing = readDemoData();
    const demoData = existing ?? { user: { selectedPersona: null }, selectedPersona: null };
    demoData.selectedPersona = demoName;
    demoData.user = { ...demoData.user, selectedPersona: demoName };
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoData));
  } catch {
    // localStorage unavailable
  }
}

/** Persist main-app persona and mirror to MVP demo storage. */
export function syncMainPersonaToDemo(persona: PersonaType): void {
  const demoName = mainPersonaToDemo(persona);
  if (demoName) {
    writeDemoPersona(demoName);
  }
}

/** Persist MVP demo persona and mirror to main-app storage. */
export function syncDemoPersonaToMain(demoName: string): void {
  const mainPersona = demoPersonaToMain(demoName);
  if (mainPersona) {
    localStorage.setItem(MAIN_PERSONA_KEY, mainPersona);
  }
}

export function getMainSelectedPersona(): PersonaType | null {
  try {
    const saved = localStorage.getItem(MAIN_PERSONA_KEY);
    return isValidMainPersona(saved) ? saved : null;
  } catch {
    return null;
  }
}

export function getDemoSelectedPersona(): string | null {
  const demoData = readDemoData();
  return demoData?.selectedPersona ?? null;
}

/** If only one store has a persona, copy it to the other. */
export function reconcilePersonaStores(): PersonaType | null {
  const main = getMainSelectedPersona();
  const demo = getDemoSelectedPersona();

  if (main && !demo) {
    syncMainPersonaToDemo(main);
    return main;
  }

  if (!main && demo) {
    syncDemoPersonaToMain(demo);
    return demoPersonaToMain(demo);
  }

  return main;
}
