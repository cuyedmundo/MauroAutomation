# TYPESCRIPT  

## Install

```bash
# "-save-dev" means its only required to develop, not to production.
npm install typescript --save-dev
```

## create configuration file (tsconfig.json)

```bash
# use "npx" to because typescript is not installed globaly
npx tsc --init
```

## compile .ts to .js

```bash
npx tsc fil.ts
```

## run .js

```bash
node file.js
```

## recompile when detect changes

```bash
npx tsc --watch
```

## unknown type

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

## array - common operations

```typescript
// Create new
// "const" editable but not reasignable
const consoles: string[] = ["xbox 360", "playstation 1", "nintendo switch"];
const consoles_generic: Array<string> //its the same that above but with a generic array

// Add to the beginning
consoles.unshift("sega dreamcast")

// Add to the end
consoles.push("steam deck");

// Remove first
consoles.shift();

// Remove last
consoles.pop();

// Modify using index
consoles[1] = "playstation 4";

//search index and modify
let index = consoles.indexOf("playstation 4");
if (index !== -1) {
  consoles[index] = "playstation 5";
}

// show result
console.log (consoles)
```
