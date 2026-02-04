#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const backendEnvPath = path.join(__dirname, '.env.local');
const nativeEnvPath = path.join(__dirname, '../../apps/native/.env.local');

if (!fs.existsSync(backendEnvPath)) {
  console.log('No backend .env.local found. Run `convex dev` first.');
  process.exit(0);
}

const backendEnv = fs.readFileSync(backendEnvPath, 'utf-8');
const convexUrlMatch = backendEnv.match(/CONVEX_URL=(.+)/);

if (!convexUrlMatch) {
  console.log('CONVEX_URL not found in backend .env.local');
  process.exit(1);
}

const convexUrl = convexUrlMatch[1].trim();
const nativeEnvContent = `EXPO_PUBLIC_CONVEX_URL=${convexUrl}\n`;

fs.writeFileSync(nativeEnvPath, nativeEnvContent);
console.log(`Synced EXPO_PUBLIC_CONVEX_URL to apps/native/.env.local`);
