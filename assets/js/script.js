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
  <div class="case case__${caseData.details.case_type}">
    <table>
      <tr>
        <td class="table-label">
          <p>${caseData.details.case_type}</p>
        </td>
        <td class="table-data">
          <p>${caseData.details.case_title}</p>
        </td>
      </tr>
      <tr>
        <td class="table-label">
          <p>Date of Birth</p>
        </td>
        <td class="table-data">
          <p>${formatDate(caseData.patient.dob)}</p>
        </td>
      </tr>
      <tr>
        <td class="table-label">
          <p>Case Notes</p>
        </td>
        <td class="table-data">
          <p>${caseData.details.notes}</p>
        </td>
      </tr>
    </table>
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