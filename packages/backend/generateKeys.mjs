import { exportJWK, exportPKCS8, generateKeyPair } from "jose";

const keys = await generateKeyPair("RS256");
const privateKey = await exportPKCS8(keys.privateKey);
const publicKey = await exportJWK(keys.publicKey);
const jwks = JSON.stringify({ keys: [{ use: "sig", ...publicKey }] });

console.log("Run these commands:\n");
console.log(`npx convex env set JWT_PRIVATE_KEY '${privateKey.replace(/\n/g, "\\n")}'`);
console.log(`\nnpx convex env set JWKS '${jwks}'`);
