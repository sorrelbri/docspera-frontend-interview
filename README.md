# DocSpera Front-End Developer Interview Project

1. Fork this repo to your GitHub account, then clone your copy to your local machine.

2. Open the repo in your code editor of choice.

3. In `assets/js/script.js`, make an asynchronous (e.g. AJAX) GET request to the following endpoint:

> `https://dalazaro.github.io/ds-json-example/example.json`

4. In `index.html`, using vanilla JavaScript or jQuery (v3.4.1 included), replace the loading element with a card element for each of the 3 cases in the JSON response object.

5. Each of your 3 case cards must include the following details, labelled:
	- Case ID number
	- Physician name
	- Case type
	- Case title
	- Start and end times - You may preserve its given format (`YYYYMMDDHHmmss`). Bonus points if you convert to a user-friendly format using JavaScript Date methods or MomentJS (v2.24.0 included).
	- Case notes
	- Patient first and last name
	- Medical record number (MRN)
	- Gender - Given format is `M` or `F`. Please convert to `Male` or `Female`
	- Date of birth (DOB) - You may preserve its given format (`YYYYMMDD`). Bonus points if you convert to a user-friendly format.

6. In `assets/css/styles.css`, you may style the page however you wish, with two required conditions:
	- Background color for Surgery case cards must use the hex color value `AFDCFA`.
	- Background color for Clinical case cards must use the RGB color value `255,211,169`.

7. Commit and push your changes to your remote repo.

Happy coding!

![Example Screenshot](/assets/img/screenshot.png)