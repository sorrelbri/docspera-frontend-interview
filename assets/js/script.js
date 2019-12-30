const $loading = $('loading:first-child')[0];
const $body = $('body')[0];

const printExampleCases = exampleCases => {

}

const printError = error => {

}

const getExampleCases = () => $.ajax( 'https://dalazaro.github.io/ds-json-example/example.json' )
  .done(exampleCases => {
    printExampleCases(exampleCases);
  })
  .fail(error => {
    printError(error);
  })
  
getExampleCases();