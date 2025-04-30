module.exports = {
  // default profile --- (use "npx cucumber-js" to run tests)  
  default: {
    paths: ['features/**/*.feature'],      // .feature files
    requireModule: ['ts-node/register'],   // TS support
    require: ['steps/**/*.ts'],            // step defsinitions
    format: ['progress']                   // dot formatter
  },
};