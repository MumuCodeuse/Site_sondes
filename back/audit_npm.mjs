// audit-npm.js : audit du package-lock.json
import * as fs from "node:fs";

const compromisedVersions = {
  chalk: "5.6.1",
  debug: "4.4.2",
  "ansi-styles": "6.2.2",
  "supports-color": "10.2.1",
  "strip-ansi": "7.1.1",
  "ansi-regex": "6.2.1",
  "wrap-ansi": "9.0.1",
  "color-convert": "3.1.1",
  "color-name": "2.0.1",
  "is-arrayish": "0.3.3",
  "slice-ansi": "7.1.1",
  color: "5.0.1",
  "color-string": "2.1.1",
  "simple-swizzle": "0.2.3",
  "supports-hyperlinks": "4.1.1",
  "has-ansi": "6.0.1",
  "chalk-template": "1.1.1",
  backslash: "0.2.1",
};

const lockFile = "package-lock.json";

if (!fs.existsSync(lockFile)) {
  console.error("package-lock.json non trouvé.");
  process.exit(1);
}

const content = fs.readFileSync(lockFile, "utf-8");
let alertFound = false;

for (const [pkg, badVersion] of Object.entries(compromisedVersions)) {
  const regex = new RegExp(`"${pkg}":\\s*"${badVersion}"`);
  if (regex.test(content)) {
    console.warn(`⚠️ Paquet compromis détecté : ${pkg}@${badVersion}`);
    alertFound = true;
  }
}

if (!alertFound) {
  console.log("✅ Aucun paquet compromis détecté. Tout est clean !");
}
