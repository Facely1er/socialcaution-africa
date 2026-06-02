#!/usr/bin/env node
/**
 * Launch readiness audit — run before production deploy.
 * Usage: npm run launch-check
 *
 * Critical (exit 1): TypeScript, production build, missing deploy files, broken redirects
 * Advisory (report only): ESLint, unit tests, bundle size warnings
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const critical = [];
const passed = [];
const warnings = [];
const advisory = [];

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function run(cmd, label) {
  try {
    execSync(cmd, { stdio: 'pipe', cwd: root });
    passed.push(label);
    return true;
  } catch (e) {
    return e;
  }
}

function readText(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

console.log('🚀 Social Caution — Launch Readiness Check\n');

// ── 1. Required deploy & app files ─────────────────────────────
console.log('📁 Deploy & static assets');
const requiredCritical = [
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'netlify.toml',
  'index.html',
  'src/main.tsx',
  'src/App.tsx',
  'public/_headers',
  'public/_redirects',
  'public/manifest.webmanifest',
  'public/favicon.svg',
  'public/socialcaution.png',
  'public/robots.txt',
  'public/sitemap.xml',
];

requiredCritical.forEach((f) => {
  if (exists(f)) passed.push(`File: ${f}`);
  else critical.push(`Missing required file: ${f}`);
});

// ── 2. Local-first production defaults ─────────────────────────
console.log('\n🔧 Local-first configuration');
const envExample = exists('.env.example') ? readText('.env.example') : '';
if (envExample.includes('VITE_DEMO_MODE=true') || envExample.includes('local-first')) {
  passed.push('`.env.example` documents local-first defaults');
} else {
  warnings.push('`.env.example` should document VITE_DEMO_MODE / local-first mode');
}

if (exists('src/config/runtime.ts')) {
  const runtime = readText('src/config/runtime.ts');
  if (runtime.includes('isBackendEnabled') && runtime.includes('isLocalOnlyMode')) {
    passed.push('Runtime config supports optional backend');
  } else {
    warnings.push('`src/config/runtime.ts` missing local-only helpers');
  }
}

// ── 3. Redirect targets must be real routes ────────────────────
console.log('\n🔗 Redirect sanity');
const appRoutes = readText('src/App.tsx');
const redirectLines = readText('public/_redirects')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'));

const deadTargets = ['/assessment/full', '/toolkit-access'];
deadTargets.forEach((dead) => {
  if (redirectLines.some((l) => l.includes(dead))) {
    critical.push(`Broken redirect target still present: ${dead}`);
  } else {
    passed.push(`No redirect to removed path: ${dead}`);
  }
});

redirectLines.forEach((line) => {
  const parts = line.split(/\s+/).filter(Boolean);
  if (parts.length < 2) return;
  const target = parts[1];
  if (target === '/index.html' || target.startsWith('/assets')) return;
  if (target.startsWith('http')) return;
  if (deadTargets.includes(target)) return;
  // Heuristic: route path appears in App.tsx or is external 301 to /
  if (target !== '/' && !appRoutes.includes(`path="${target.replace(/^\//, '')}"`) && !appRoutes.includes(`path='${target.replace(/^\//, '')}'`)) {
    const pathSegment = target.split('/').filter(Boolean)[0];
    if (pathSegment && !appRoutes.includes(pathSegment)) {
      warnings.push(`Redirect target may be unregistered in App.tsx: ${target}`);
    }
  }
});

// ── 4. TypeScript & build ──────────────────────────────────────
console.log('\n🛠️  Build pipeline');
const tscErr = run('npx tsc --noEmit', 'TypeScript (`tsc --noEmit`)');
if (tscErr === true) {
  // ok
} else {
  critical.push(`TypeScript failed: ${tscErr.stderr?.toString().slice(0, 500) || tscErr.message}`);
}

const lintErr = run('npm run lint', 'ESLint');
if (lintErr !== true) {
  advisory.push(`ESLint reported issues (fix before strict CI)`);
} else {
  passed.push('ESLint clean');
}

const buildErr = run('npm run build', 'Production build (`npm run build`)');
if (buildErr === true) {
  if (exists('dist/index.html')) {
    passed.push('dist/index.html produced');
    const distFiles = fs.readdirSync(path.join(root, 'dist'));
    if (distFiles.includes('robots.txt') && distFiles.includes('sitemap.xml')) {
      passed.push('SEO files copied to dist');
    } else {
      warnings.push('robots.txt or sitemap.xml missing from dist (check public/)');
    }
    const assetsDir = path.join(root, 'dist', 'assets');
    if (exists('dist/assets')) {
      const jsFiles = fs.readdirSync(assetsDir).filter((f) => f.endsWith('.js'));
      const large = jsFiles
        .map((f) => ({
          name: f,
          kb: fs.statSync(path.join(assetsDir, f)).size / 1024,
        }))
        .filter((f) => f.kb > 900);
      if (large.length) {
        warnings.push(
          `Large JS chunks (>900KB): ${large.map((f) => `${f.name} (${Math.round(f.kb)}KB)`).join(', ')}`
        );
      } else {
        passed.push('No JS chunk exceeds 900KB advisory threshold');
      }
    }
  } else {
    critical.push('Build completed but dist/index.html missing');
  }
} else {
  critical.push(`Production build failed: ${buildErr.stderr?.toString().slice(0, 500) || buildErr.message}`);
}

// ── 5. Unit tests (advisory) ───────────────────────────────────
console.log('\n🧪 Tests (advisory)');
const testErr = run('npm run test:run', 'Vitest unit tests');
if (testErr === true) {
  passed.push('All unit tests passed');
} else {
  const out = testErr.stdout?.toString() || testErr.stderr?.toString() || '';
  const match = out.match(/Tests\s+(\d+) failed \| (\d+) passed/);
  if (match) {
    advisory.push(`Unit tests: ${match[1]} failed, ${match[2]} passed`);
  } else {
    advisory.push('Unit tests failed — see `npm run test:run` output');
  }
}

// ── 6. Dev-only UI in production entry ─────────────────────────
console.log('\n🔒 Production entry');
const appSrc = readText('src/App.tsx');
if (appSrc.includes('import.meta.env.DEV') && appSrc.includes('ProductionChecklist')) {
  passed.push('Dev tools gated behind import.meta.env.DEV');
} else {
  warnings.push('Verify dev-only components are not shipped unguarded');
}

// ── Report ─────────────────────────────────────────────────────
console.log('\n' + '═'.repeat(60));
console.log('LAUNCH READINESS SUMMARY\n');
console.log(`✅ Passed:   ${passed.length}`);
console.log(`⚠️  Warnings: ${warnings.length}`);
console.log(`ℹ️  Advisory:  ${advisory.length}`);
console.log(`❌ Critical: ${critical.length}\n`);

if (passed.length) {
  console.log('Passed:');
  passed.forEach((p) => console.log(`  ✅ ${p}`));
}
if (warnings.length) {
  console.log('\nWarnings:');
  warnings.forEach((w) => console.log(`  ⚠️  ${w}`));
}
if (advisory.length) {
  console.log('\nAdvisory:');
  advisory.forEach((a) => console.log(`  ℹ️  ${a}`));
}
if (critical.length) {
  console.log('\nCritical (must fix):');
  critical.forEach((e) => console.log(`  ❌ ${e}`));
}

const score = Math.round(
  (passed.length / (passed.length + warnings.length + critical.length + 0.01)) * 100
);
console.log(`\n🎯 Readiness score: ${score}%`);

if (critical.length > 0) {
  console.log('\n❌ NOT READY — resolve critical items before launch.\n');
  process.exit(1);
}

if (warnings.length > 0 || advisory.length > 0) {
  console.log('\n✅ READY TO LAUNCH (with warnings) — review items above.\n');
  console.log('Deploy checklist:');
  console.log('  • Netlify/Vercel: set VITE_DEMO_MODE=true for local-only (no backend)');
  console.log('  • Optional API: VITE_API_URL + VITE_DEMO_MODE=false');
  console.log('  • Run: npm run build && deploy dist/');
  console.log('  • Smoke test: /, /assessment, /dashboard, /toolkit, /404\n');
  process.exit(0);
}

console.log('\n✅ READY TO LAUNCH — all critical checks passed.\n');
process.exit(0);
