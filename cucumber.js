module.exports = {
  // default profile ("npx cucumber-js" to run tests)  
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: [
      'features/**/*.steps.ts',
      'src/hooks/**/*.ts'
    ],
    format: [
      'html:reports/cucumber-report.html',
      'progress',
      'json:reports/cucumber.json',
      '@cucumber/junit-xml-formatter:reports/junit.xml'
    ]
  },
};