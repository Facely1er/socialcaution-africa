import { Navigate, useParams } from 'react-router-dom';

/** Alias: /africa/start/:personaSlug → /africa/personas/start/:personaSlug */
export default function AfricaPersonaStartAliasRedirect() {
  const { personaSlug } = useParams();
  if (!personaSlug) return <Navigate to="/" replace />;
  return <Navigate to={`/africa/personas/start/${personaSlug}`} replace />;
}
