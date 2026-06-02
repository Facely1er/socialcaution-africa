import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

const runtime = read('src/config/runtime.ts');
const netlify = read('netlify.toml');
const vercel = read('vercel.json');
const envExample = read('.env.example');

const checks = [
  {
    name: 'runtime documents local-first default',
    pass: runtime.includes('local-first by default') && runtime.includes('isLocalOnlyMode'),
  },
  {
    name: 'netlify sets VITE_DEMO_MODE',
    pass: netlify.includes('VITE_DEMO_MODE = "true"'),
  },
  {
    name: 'vercel sets VITE_DEMO_MODE',
    pass: vercel.includes('"VITE_DEMO_MODE"') && vercel.includes('"true"'),
  },
  {
    name: '.env.example documents local-first',
    pass: envExample.includes('VITE_DEMO_MODE=true') && envExample.includes('no backend required'),
  },
  {
    name: 'dashboard uses local fallback',
    pass: read('src/hooks/useDashboard.ts').includes('if (!isBackendEnabled())'),
  },
  {
    name: 'caution API uses demo layer',
    pass: read('src/services/cautionApi.ts').includes('if (DEMO_MODE)'),
  },
  {
    name: 'auth provider uses localStorage',
    pass: read('src/components/auth/AuthProvider.tsx').includes('localStorageService'),
  },
  {
    name: 'africa data is static (no fetch)',
    pass: !read('src/data/africa/countries.ts').includes('fetch('),
  },
];

const failed = checks.filter((c) => !c.pass);
if (failed.length > 0) {
  console.error('Local-first validation failed:');
  for (const check of failed) {
    console.error(`  - ${check.name}`);
  }
  process.exit(1);
}

console.log(`Local-first validation passed (${checks.length} checks).`);
