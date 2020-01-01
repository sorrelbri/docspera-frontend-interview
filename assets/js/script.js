// ! CONSTANTS

const $loading = $('loading:first-child')[0];
const $body = $('body')[0];

// ! STATE

let casesState = {};

// ! FUNCTIONS

// (dateString: number): string
const formatDate = dateString => {
  const YYYYMMDD = dateString.toString();
  // return MM/DD/YYYY
  return `${YYYYMMDD.slice(4,6)}/${YYYYMMDD.slice(6)}/${YYYYMMDD.slice(0, 4)}`;
}

// (e: eventObject, caseData: casesState[n]): 
const handleCaseDetailsClick = (e, caseData) => {
  e.preventDefault();

  // toggle show detail
  caseData.showDetail = !caseData.showDetail;
}

// (caseData: casesState[n]): string
const templateCaseElementDetail = caseData => caseData.showDetail
  // if showDetail === true
  ? `
  <td>Show Detail</td>
  `
  // if showDetail === false
  : `
  <td>No Show Detail</td>
  `

// (caseData: casesState[n]): string
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
      <tr>
        ${templateCaseElementDetail(caseData)}
      </tr>
    </table>
  </div>
`.trim();

// (exampleCases: array): $node
const buildCaseContainer = exampleCases => {
  const $caseContainer = $('<div class="case-container"></div>')[0]
  
  exampleCases.map(caseData => {
    const caseElement = templateCaseElement(caseData);
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
  casesState = exampleCases.cases.map(caseData => ({ ...caseData, showDetail: false }))
  const $caseContainer = buildCaseContainer(casesState);
  $body.append($caseContainer);
})
.fail((_, error) => {
  $loading.remove();
  const $errorDiv = buildErrorDiv(error);
  $body.append($errorDiv);
})


getExampleCases();