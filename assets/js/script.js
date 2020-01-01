// ! CONSTANTS

const $loading = $('loading:first-child')[0];
const $body = $('body')[0];

// ! STATE

let casesState = {};

// ! FUNCTIONS

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

// (caseData: casesState[n]): string
const templateCaseElementButton = caseData => `
  <div class="toggle-container" id="toggle-${caseData.case_id}">
    <img
      class="toggle-button"
      ${caseData.showDetail 
        // if showDetail === true
        ? `
        src="assets/fontawesome-free-5.11.2-web/svgs/solid/chevron-up.svg"
        alt="click to hide case details"
        ` 
        // if showDetail === false
        : `
        src="assets/fontawesome-free-5.11.2-web/svgs/solid/chevron-down.svg"
        alt="click to expand case details"
        `
      }
    ></img>
  </div>
`

// (caseData: casesState[n]): string
const templateCaseElementDetail = caseData => caseData.showDetail
  // if showDetail === true
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
      <td class="table-data">${
        moment(`${
          caseData.details.time.start.toString().slice(0,8)
          }T${
          caseData.details.time.start.toString().slice(8,12)
        }`).format('MM/DD/YY h:mm a')
      } - ${
        moment(`${
          caseData.details.time.end.toString().slice(0,8)
          }T${
          caseData.details.time.end.toString().slice(8,12)
        }`).format('MM/DD/YY h:mm a')
      }</td>
    </tr>
    <tr class="table-detail">
      <td class="table-label">Physician</td>
      <td class="table-data">${caseData.details.physician}</td>
    </tr>
  `
  // if showDetail === false
  : ''

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
          <p>${moment(caseData.patient.dob).format('MM/DD/YYYY')}</p>
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
    </table>
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