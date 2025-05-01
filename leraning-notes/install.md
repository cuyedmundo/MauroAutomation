# Install and configure Playwright + TypeScript + Cucumber + POM

```bash
# 1.- create package.json file (new node project) with default values
npm init -y # "-y" = yes to all

# 2.- Install dev dependencies
npm install -D playwright # Playwright core
npm install -D @playwright/test # Playwright helper test runner & TS types
npm install -D @cucumber/cucumber # for write tests in Gherkin syntax
npm install -D typescript # compile .ts files to .js
npm install -D ts-node # run .ts files directly without compiling manually
npm install -D @types/node # help to auto-complete
npm install -D dotenv # manage enviroment variables

# 3.- Download browsers used by Playwright (Chromium, Firefox, WebKit)
npx playwright install # ensures local browsers are present

# 4.- create tsconfig.json file with default values
npx tsc --init

# 5.- Create the Cucumber config file
cat > cucumber.js <<'EOF'
module.exports = {
  // default profile --- npx cucumber-js  
  default: {
    paths: ['features/**/*.feature'],      // .feature files path
    requireModule: ['ts-node/register'],   // TS support
    require: ['steps/**/*.ts'],            // step defsinitions
    format: ['progress']                   // dot formatter
  },
};
EOF

# 6.- Create folder structure
mkdir pages     # Page Object Model classes
mkdir features  # Gherkin .feature files
mkdir steps     # Step definitions

# Extra
npx playwright test --generate-config # for run test using playwright without cucumber
```
