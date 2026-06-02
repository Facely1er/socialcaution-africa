import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function assertNoPlaceholders(label, text) {
  const forbiddenPatterns = [
    /\bTODO\b/i,
    /\bTBD\b/i,
    /\blorem\b/i,
    /\bfake data\b/i,
    /\bplaceholder\b/i,
  ];
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(text)) {
      console.error(`[${label}] Forbidden placeholder found: ${pattern}`);
      process.exit(1);
    }
  }
}

function assertFileExists(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing required Africa Edition file: ${relativePath}`);
    process.exit(1);
  }
}

const requiredFiles = [
  'src/pages/africa/AfricaHomePage.tsx',
  'src/pages/africa/AfricaCountriesPage.tsx',
  'src/pages/africa/AfricaCountryPage.tsx',
  'src/pages/africa/ScamShieldAfricaPage.tsx',
  'src/pages/africa/AfricaPersonasPage.tsx',
  'src/pages/africa/AfricaActionCenterPage.tsx',
  'src/pages/africa/AfricaSourcesPage.tsx',
  'src/data/africa/countries.ts',
  'src/data/africa/personas.ts',
  'src/data/africa/actions.ts',
  'src/data/africa/scamShield.ts',
];

for (const file of requiredFiles) {
  assertFileExists(file);
}

const countriesText = read('src/data/africa/countries.ts');
const personasText = read('src/data/africa/personas.ts');
const homePageText = read('src/pages/HomePage.tsx');
const appText = read('src/App.tsx');

assertNoPlaceholders('countries', countriesText);
assertNoPlaceholders('personas', personasText);

const countryCount = (countriesText.match(/slug: '/g) || []).length;
const sourceCount = (countriesText.match(/sourceUrls:/g) || []).length;
const personaCount = (personasText.match(/slug: '/g) || []).length;

if (countryCount < 5) {
  console.error(`Validation failed: expected at least 5 countries, found ${countryCount}`);
  process.exit(1);
}

if (sourceCount < 5) {
  console.error(`Validation failed: expected at least 5 source blocks, found ${sourceCount}`);
  process.exit(1);
}

if (personaCount < 5) {
  console.error(`Validation failed: expected at least 5 personas, found ${personaCount}`);
  process.exit(1);
}

const requiredRoutes = [
  '/africa',
  '/africa/countries',
  '/africa/scamshield',
  '/africa/sources',
  '/africa/action-center/:countrySlug',
];

for (const route of requiredRoutes) {
  if (!appText.includes(route)) {
    console.error(`Missing Africa route in App.tsx: ${route}`);
    process.exit(1);
  }
}

if (!homePageText.includes('SocialCaution Africa Edition')) {
  console.error('HomePage is missing the visible Africa Edition entry section.');
  process.exit(1);
}

console.log(
  `Africa Edition validation passed: ${countryCount} countries, ${sourceCount} source blocks, ${personaCount} personas, ${requiredFiles.length} required files.`
);
