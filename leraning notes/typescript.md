# TYPESCRIPT 


## Install typescript
```bash
# "-save-dev" means its only required to develop, no to production.
npm install typescript --save-dev
```

## create configuration file (tsconfig.json)
```bash
npx tsc --init
```

## compile .ts to .js
```bash
tsc fil.ts
```

## run .js
```bash
node file.js
```

## recompile when detect changes
```bash
tsc --watch
```

## using unknown the right way
```typescript
let value: unknown;
value = true;

if (typeof value === "string") {
    console.log(value.toUpperCase());

} else if (typeof value === "number") {
    console.log(value + 1);
    
} else {
    console.log("Its neither a number nor a letter");
}
```
