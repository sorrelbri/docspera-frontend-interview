# DocSpera Front-End Developer Interview Project

1. Fork this repo to your GitHub account, then clone your copy to your local machine.

2. Open the repo in your code editor of choice.

3. In `assets/js/script.js`, make an asynchronous (e.g. AJAX) GET request to the endpoint `/example.json`.

4. In `index.html`, using vanilla JavaScript or jQuery (v3.4.1 included), replace the loading element with a case card for each of the 3 cases in the JSON response object.

5. Each of your 3 case cards must include the following details:
	- Case ID number
	- Patient first and last name
	- Date of birth (DOB) - You may preserve its given format (`YYYYMMDD`). Bonus points if you convert to `MM/DD/YYYY` using JavaScript Date methods or MomentJS (v2.24.0 included).
	- Gender - Given format is `M` or `F`. Please convert to `Male` or `Female`
	- Medical record number (MRN)
	- Case title
	- Case type
	- Start and end times - You may preserve its given format (`YYYYMMDDHHmmss`). Bonus points if you convert to `MM/DD/YYYY HH:mm`
	- Physician name
	- Case notes

6. In `assets/css/styles.css`, you may style the page however you wish, with two required conditions:
	- Background color for Surgery case cards must use the hex color value `AFDCFA`.
	- Background color for Clinical case cards must use the RGB color value `255,211,169`.

7. Commit and push your changes to your remote repo.

8. Submit a pull request to this upstream repo for review.