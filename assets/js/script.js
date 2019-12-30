// ! CONSTANTS

const $loading = $('loading:first-child')[0];
const $body = $('body')[0];

// ! FUNCTIONS

// (dateString: number): string
const formatDate = dateString => {
  const YYYYMMDD = dateString.toString();
  return `${YYYYMMDD.slice(4,6)}/${YYYYMMDD.slice(6)}/${YYYYMMDD.slice(0, 4)}`;
}

// (caseData: object): string
const templateCaseElement = caseData => `
  <div class="case ${caseData.details.case_type}">
    <p>${caseData.details.case_type}</p>
    <p>${caseData.details.case_title}</p>
    <p>Date of Birth</p>
    <p>${formatDate(caseData.patient.dob)}</p>
    <p>Case Notes</p>
    <p>${caseData.details.notes}</p>
  </div>
`.trim();

// (exampleCases: array): $node
const buildCaseContainer = exampleCases => {
  const $caseContainer = $('<div class="case-container"></div>')[0]
  const caseElements = exampleCases.map(caseData => templateCaseElement(caseData));
  caseElements.map(caseElement => {
    const $div = $(caseElement)[0];
    $caseContainer.append($div);
  });
  return $caseContainer;
}

const buildErrorDiv = error => {
  const $errorDiv = `
    <div class="error">
      <h4>Received an Error, please reload<h4>
      <p>${error}</p>
    </div>
  `.trim();
}

const getExampleCases = () => $.ajax({
  url: 'https://dalazaro.github.io/ds-json-example/example.json',
  method: 'GET'
})
.done(exampleCases => {
  $loading.remove();
  const $caseContainer = buildCaseContainer(exampleCases.cases);
  $body.append($caseContainer);
})
.fail((_, error) => {
  $loading.remove();
  const $errorDiv = buildErrorDiv(error);
  $body.append($errorDiv);
})


getExampleCases();