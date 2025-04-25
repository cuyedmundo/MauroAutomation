# TYPESCRIPT  

## Install

```bash
npm install typescript --save-dev
```

"-save-dev" means its only required to develop, not to production.

## create configuration file (tsconfig.json)

```bash
npx tsc --init
```

use "npx" to because typescript is not installed globaly

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

## Array - common operations

Array: collection of values of the same type

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

## Tuple

 Tuple: collection of values of different types in a specific order

```typescript
// Create tuple
let person: [name:string, age:number]; //name and age are just informative tags
let person_readonly: readonly[name:string, age:number]; //same than above but read only (good practice)

person = ["Mauro", 34];
person.push("wathever") // new values dont have type check


// Print it
console.log (person);

console.log (person[0]);
console.log (person[1]);
```
