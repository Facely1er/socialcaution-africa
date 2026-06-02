import { useEffect } from 'react';
import { PersonaType } from '../core/types/personaTypes';
import { usePersona } from './usePersona';

/** Sets the active persona when a persona detail page mounts. */
export function usePersonaPage(personaType: PersonaType): void {
  const { persona, setPersona } = usePersona();

  useEffect(() => {
    if (persona !== personaType) {
      setPersona(personaType);
    }
  }, [persona, personaType, setPersona]);
}
