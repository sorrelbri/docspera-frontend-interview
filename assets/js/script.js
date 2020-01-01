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

// (caseData: casesState[n]): undefined
const rerender = caseData => {
  const caseElement = templateCaseElement(caseData);

  $(`div#case-${caseData.case_id}`).replaceWith($(caseElement));
  const $div = $(`div#case-${caseData.case_id}`);
  
  const $button = $(templateCaseElementButton(caseData)).appendTo($div);
  $button.click(e => handleCaseDetailsClick(e, caseData));
}

// (e: eventObject, caseData: casesState[n]): function
const handleCaseDetailsClick = (e, caseData) => {
  e.preventDefault();

  // toggle show detail
  caseData.showDetail = !caseData.showDetail;
  return rerender(caseData);
}

const templateCaseElementButton = caseData => caseData.showDetail
// if showDetail === true
? `
<button id="toggle-${caseData.case_id}">Hide Detail</button>
`
// if showDetail === false
: `
<button id="toggle-${caseData.case_id}">Show Detail</button>
`

// (caseData: casesState[n]): string
const templateCaseElementDetail = caseData => caseData.showDetail
  // if showDetail === true
  // Case ID, Patient name, Gender, Medical record number, Human-readable start & end times (using momentJS if needed), and Physician name
  ? `
    <tr class="table-detail">
    <td class="table-label">Case ID</td>
    <td class="table-data">${caseData.case_id}</td>
    </tr>
    <tr class="table-detail">
      <td class="table-label">Patient Name</td>
      <td class="table-data">${caseData.patient.name.last}, ${caseData.patient.name.first}</td>
    </tr>
    <tr class="table-detail">
      <td class="table-label">Medical Record</td>
      <td class="table-data">${caseData.patient.mrn}</td>
    </tr>
    <tr class="table-detail">
      <td class="table-label">Time</td>
      <td class="table-data">${caseData.details.time.start} - ${caseData.details.time.end}</td>
    </tr>
    <tr class="table-detail">
      <td class="table-label">Physician</td>
      <td class="table-data">${caseData.details.physician}</td>
    </tr>
  </table>
  `
  // if showDetail === false
  : `
  </table>
  `

// (caseData: casesState[n]): string
const templateCaseElement = caseData => `
  <div id="case-${caseData.case_id}" class="case case__${caseData.details.case_type}">
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
        ${templateCaseElementDetail(caseData)}
  </div>
`.trim();

// (exampleCases: array): $node
const buildCaseContainer = exampleCases => {
  const $caseContainer = $('<div class="case-container"></div>')[0]
  
  exampleCases.forEach(caseData => {
    const caseElement = templateCaseElement(caseData);
    const $div = $(caseElement).appendTo($caseContainer);
    const $button = $(templateCaseElementButton(caseData)).appendTo($div);
    $button.click(e => handleCaseDetailsClick(e, caseData));
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