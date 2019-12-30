const $loading = $('loading:first-child')[0];
const $body = $('body')[0];

const templateCaseElement = caseData => `
  <div class="case ${caseData.details.case_type}">
    <p>${caseData.details.case_type}</p>
    <p>${caseData.details.case_title}</p>
    <p>Date of Birth</p>
    <p>${caseData.patient.dob}</p>
    <p>Case Notes</p>
    <p>${caseData.details.notes}</p>
  </div>
`.trim();

const printExampleCases = exampleCases => {
  $loading.remove();
  const $caseContainer = $('<div class="case-container"></div>')[0]
  const caseElements = exampleCases.map(caseData => templateCaseElement(caseData));
  caseElements.map(caseElement => {
    const $div = $(caseElement)[0];
    $caseContainer.append($div);
  });
  $body.append($caseContainer);
}

const printError = error => {

}

const getExampleCases = () => $.ajax( 'https://dalazaro.github.io/ds-json-example/example.json' )
  .done(exampleCases => {
    printExampleCases(exampleCases.cases);
  })
  .fail(error => {
    printError(error);
  })
  
getExampleCases();