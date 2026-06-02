import { describe, it, expect, beforeEach } from 'vitest';
import { PersonaType } from '../../core/types/personaTypes';
import {
  mainPersonaToDemo,
  demoPersonaToMain,
  syncMainPersonaToDemo,
  syncDemoPersonaToMain,
  reconcilePersonaStores,
  getMainSelectedPersona,
  getDemoSelectedPersona,
} from '../../utils/personaBridge';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('personaBridge', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('maps main personas to demo caution personas', () => {
    expect(mainPersonaToDemo(PersonaType.CAUTIOUS_PARENT)).toBe('parent');
    expect(mainPersonaToDemo(PersonaType.CONCERNED_EMPLOYEE)).toBe('professional');
    expect(mainPersonaToDemo(PersonaType.PRIVACY_ADVOCATE)).toBe('privacy-advocate');
  });

  it('maps demo personas back to main personas', () => {
    expect(demoPersonaToMain('parent')).toBe(PersonaType.CAUTIOUS_PARENT);
    expect(demoPersonaToMain('professional')).toBe(PersonaType.CONCERNED_EMPLOYEE);
    expect(demoPersonaToMain('senior')).toBe(PersonaType.PRIVATE_INDIVIDUAL);
  });

  it('syncs main persona to demo storage', () => {
    syncMainPersonaToDemo(PersonaType.SOCIAL_INFLUENCER);
    expect(getDemoSelectedPersona()).toBe('teen');
    expect(getMainSelectedPersona()).toBeNull();
  });

  it('syncs demo persona to main storage', () => {
    syncDemoPersonaToMain('parent');
    expect(getMainSelectedPersona()).toBe(PersonaType.CAUTIOUS_PARENT);
  });

  it('reconciles when only main storage is set', () => {
    localStorage.setItem('socialcaution-persona', PersonaType.PRIVATE_INDIVIDUAL);
    const restored = reconcilePersonaStores();
    expect(restored).toBe(PersonaType.PRIVATE_INDIVIDUAL);
    expect(getDemoSelectedPersona()).toBe('general');
  });

  it('reconciles when only demo storage is set', () => {
    localStorage.setItem(
      'ermits-demo-data',
      JSON.stringify({ user: { selectedPersona: 'professional' }, selectedPersona: 'professional' })
    );
    const restored = reconcilePersonaStores();
    expect(restored).toBe(PersonaType.CONCERNED_EMPLOYEE);
    expect(getMainSelectedPersona()).toBe(PersonaType.CONCERNED_EMPLOYEE);
  });
});
