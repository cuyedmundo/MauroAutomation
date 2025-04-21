# PLAYWRIGHT

## Install playwright

```bash
npm init playwright@latest 
```

## Helper to generate code

```bash
npx playwright codegen
```

## Execute test in Slow mode
<!-- in the file "playwright.config.ts" -->
```json
use{
launchOptions:{
slowMo: 1000
}}
```

## Show report

```bash
npx playwright show-report
```
