var parent = document.getElementById("menu");
var referenceElement = parent.getElementsByTagName("li")[6];
const gradeICON = document.createElement('li');
gradeICON.className = "menu-item ic-app-header__menu-list-item ";
gradeICON.setAttribute("id", "extension-icon-");
parent.insertBefore(gradeICON, referenceElement);

var linkElement = document.createElement("a");
linkElement.setAttribute("href", "/grades")
linkElement.setAttribute("id", "global_nav_conversations_link");
linkElement.setAttribute("class", "ic-app-header__menu-list-link");
gradeICON.appendChild(linkElement);

var linkElementDIV = document.createElement("div");
linkElementDIV.setAttribute("class", "menu-item-icon-container");
linkElementDIV.setAttribute("aria-hidden", "true");
linkElement.appendChild(linkElementDIV)

var linkElementText = document.createElement("div");
linkElementText.setAttribute("class", "menu-item__text");
linkElementText.textContent = "  Grades  ";
linkElement.appendChild(linkElementText)

var gradeICONFont = document.createElementNS("http://www.w3.org/2000/svg", "svg");
gradeICONFont.setAttribute("xmlns", "http://www.w3.org/2000/svg");
gradeICONFont.setAttribute("height", "1em");
gradeICONFont.setAttribute("viewBox", "0 0 512 512");
gradeICONFont.setAttribute("class", "ic-icon-svg ic-icon-svg--inbox");
gradeICONFont.setAttribute("width", "26px");
gradeICONFont.setAttribute("height", "26px");

linkElementDIV.appendChild(gradeICONFont);

var gradeFontPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
gradeFontPath.setAttribute("d", "M240.1 4.2c9.8-5.6 21.9-5.6 31.8 0l171.8 98.1L448 104l0 .9 47.9 27.4c12.6 7.2 18.8 22 15.1 36s-16.4 23.8-30.9 23.8H32c-14.5 0-27.2-9.8-30.9-23.8s2.5-28.8 15.1-36L64 104.9V104l4.4-1.6L240.1 4.2zM64 224h64V416h40V224h64V416h48V224h64V416h40V224h64V420.3c.6 .3 1.2 .7 1.8 1.1l48 32c11.7 7.8 17 22.4 12.9 35.9S494.1 512 480 512H32c-14.1 0-26.5-9.2-30.6-22.7s1.1-28.1 12.9-35.9l48-32c.6-.4 1.2-.7 1.8-1.1V224z");
gradeICONFont.appendChild(gradeFontPath);

async function changeCorte(index) {
	let corte = document.getElementsByClassName("grading_periods_selector content-box");
	for (let i = 1; i < corte.length; i++) {
		corte[i].selectedIndex = index
		const changeEvent = new Event('change', {
			bubbles: true,
			cancelable: false,
		});
		
		corte[i].dispatchEvent(changeEvent);
	}
}

async function getGPA() {
	// Replace the fetch operation with reading the HTML content directly
	const htmlContent = document.documentElement.outerHTML;

	// Parse the HTML content
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlContent, 'text/html');
	const Data = doc.querySelectorAll('tr');

	const Credits = {
		"College and Career Presentations & Preparations (Promo2027)": null,
		"3rd Form Educación Física": 1,
		"3rd Form Artistic Expression": 2,
		"Cambridge International - Students and Parents": null,
		"3rd Form Paz Homeroom": null,
		"3rd Form Pre-Engineering & Advanced Technology": 1,
		"3rd Form Formación Integral": 1,
		"3rd Form Nociones de Mandarin": 4,
		"3rd Form IGCSE Mathematics-Extended": 5,
		"3rd Form World History": 3,
		"3rd Form IGCSE Science": 4,
		"3rd Form Lengua Española": 4,
		"3rd Form IGCSE World Literature": 4,
		"3rd Form Hist. de la Civilización/Geog. Mundial": 3,
		"3rd and 4th Form Elective": 1,
		"3rd Form Francés": 4
	};

	let sumCredits = 0;
	let sumGrades = 0;

	for (let i = 0; i < 15; i++) {
		const course = Data[i].querySelector('td.course').textContent;
		const percentStr = Data[i].querySelector('td.percent').textContent.trim();
		const percent = parseFloat(percentStr);
		console.log(course + ": " + percentStr);
		if (Credits[course] !== null && !isNaN(percent)) {
			sumGrades += percent * 0.04 * Credits[course];
			sumCredits += Credits[course];
		}
	}

	const perfGPA = (sumGrades / sumCredits); // Calculate the GPA
	const finalGPA = perfGPA.toFixed(2); // Round to 2 decimal places

	return {'finalGPA': finalGPA, 'perfGPA': perfGPA }; // Return as a dictionary
}
// Call the function using async/await
if (window.location.href === "https://stgeorge.instructure.com/grades" || window.location.href === "https://stgeorge.instructure.com/grades#") {
	gradeICON.setAttribute("class", "menu-item ic-app-header__menu-list-item  ic-app-header__menu-list-item--active");
getGPA().then((result) => {
	// GPA calculation was successful
	console.log('Final GPA:', result.finalGPA);
	console.log('Perfect Calc GPA:', result.perfGPA);
	if (window.location.href === "https://stgeorge.instructure.com/grades") {

		let parent = document.getElementsByClassName("ic-Layout-contentMain")[0];
		let referenceElement = parent.getElementsByClassName("course_details student_grades")[0];

		const divForH1 = document.createElement('div');
		divForH1.setAttribute("id", "Header for Grades");
		parent.insertBefore(divForH1, referenceElement);

		const perfGPAElement = document.createElement('h1');
		perfGPAElement.style.color = "#005A97";
		perfGPAElement.setAttribute("id", "perf-gpa-element");
		perfGPAElement.textContent = 'Perfect Calc GPA: ' + result.perfGPA;
		divForH1.append(perfGPAElement);

		const gpaElement = document.createElement('h1');
		gpaElement.textContent = 'Final GPA: ' + result.finalGPA;
		gpaElement.setAttribute("id", "gpa-element");
		gpaElement.style.color = "#005A97";
		divForH1.append(gpaElement);

		const selectCorte = document.createElement('select');
		selectCorte.setAttribute("class", "grading_periods_selector content-box");
		const corteOptions = [
			document.createElement('option'),
			document.createElement('option'),
			document.createElement('option'),
			document.createElement('option'),
			document.createElement('option'),
			document.createElement('option'),
			document.createElement('option')
		]
		corteOptions[0].setAttribute("selected", "selected");
		corteOptions[0].setAttribute("disabled", "true");
		
		const corteName = [];

		const itemsInSelector = document.getElementsByClassName("grading_periods_selector content-box")[0].getElementsByTagName("option")
		for (let i = 0; i < 7; i++) {
			corteName.push(itemsInSelector[i].innerHTML)
		}

		for (let i = 0; i < corteName.length; i++) {
			corteOptions[i].innerHTML = corteName[i];
			corteOptions[i].setAttribute("value", i);
			selectCorte.append(corteOptions[i]);
		}
		divForH1.append(selectCorte);

		if (selectCorte) {
			selectCorte.addEventListener('change', function() {
				changeCorte(selectCorte.value);
			});
		}

		const refreshButton = document.createElement("button");
		refreshButton.setAttribute("class", "Button button-sidebar-wide");
		refreshButton.innerHTML = "Click to Refresh";
		refreshButton.setAttribute("style", "margin-left: 8px;")
		refreshButton.setAttribute("onclick", `
			// Replace the fetch operation with reading the HTML content directly
			const htmlContent = document.documentElement.outerHTML;

			// Parse the HTML content
			const parser = new DOMParser();
			const doc = parser.parseFromString(htmlContent, 'text/html');
			const Data = doc.querySelectorAll('tr');

			const Grades = {};

			const Credits = {
				"College and Career Presentations & Preparations (Promo2027)": null,
				"3rd Form Educación Física": 1,
				"3rd Form Artistic Expression": 2,
				"Cambridge International - Students and Parents": null,
				"3rd Form Paz Homeroom": null,
				"3rd Form Pre-Engineering & Advanced Technology": 1,
				"3rd Form Formación Integral": 1,
				"3rd Form Nociones de Mandarin": 4,
				"3rd Form IGCSE Mathematics-Extended": 5,
				"3rd Form World History": 3,
				"3rd Form IGCSE Science": 4,
				"3rd Form Lengua Española": 4,
				"3rd Form IGCSE World Literature": 4,
				"3rd Form Hist. de la Civilización/Geog. Mundial": 3,
				"3rd and 4th Form Elective": 1,
				"3rd Form Francés": 4
			};

			let sumCredits = 0;
			let sumGrades = 0;

			for (let i = 0; i < 15; i++) {
				const course = Data[i].querySelector('td.course').textContent;
				const percentStr = Data[i].querySelector('td.percent').textContent.trim();
				const percent = parseFloat(percentStr);
				console.log(course + ": " + percentStr);
				if (Credits[course] !== null && !isNaN(percent)) {
					sumGrades += percent * 0.04 * Credits[course];
					sumCredits += Credits[course];
				}
			}

			const perfGPA = (sumGrades / sumCredits); // Calculate the GPA
			const finalGPA = perfGPA.toFixed(2); // Round to 2 decimal places

			console.log('Final GPA:', finalGPA);
			console.log('Perfect Calc GPA:', perfGPA);

			const perfGPAElement = document.getElementById("perf-gpa-element");
			perfGPAElement.textContent = 'Perfect Calc GPA: ' + perfGPA;

			const gpaElement = document.getElementById("gpa-element");
			gpaElement.textContent = 'Final GPA: ' + finalGPA;
		`);
		divForH1.append(refreshButton);

	} else {
	// Handle the case where there was an error
	console.error('Failed to calculate GPA.');
	}
}).catch((error) => {
	// Handle any errors thrown by getGPA
	console.error('Error in getGPA:', error);
});
}

// Loop for checking active things

let liInParent;
let isThereActive;
let i;

function isActive() {
liInParent = parent.getElementsByTagName("li"); // Changed parent to document
isThereActive = false;

for (i = 0; i < liInParent.length; i++) {
	if (
	liInParent[i].className !== "menu-item ic-app-header__menu-list-item " &&
	liInParent[i].className !== "menu-item ic-app-header__menu-list-item" &&
	liInParent[i].className !== "ic-app-header__menu-list-item " &&
	liInParent[i].className !== "ic-app-header__menu-list-item" &&
	liInParent[i].id !== 'extension-icon-'
	) {
	isThereActive = true;
	break;
	}
}

if (!isThereActive && (window.location.href === 'https://stgeorge.instructure.com/grades' || window.location.href === 'https://stgeorge.instructure.com/grades#')) {
	gradeICON.setAttribute("class", "menu-item ic-app-header__menu-list-item ic-app-header__menu-list-item--active");
} else if (isThereActive && window.location.href === 'https://stgeorge.instructure.com/grades') {
	gradeICON.setAttribute("class", "menu-item ic-app-header__menu-list-item ");
}
return 0;
}
/*
const isActiveLoopID = setInterval(isActive, 5);
*/
// Function to execute when a class change is detected
let run = true;

function handleClassChange(mutationsList, observer) {
if (run) {
	mutationsList.forEach(mutation => {
	if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
		// Pause the observer
		observer.disconnect();

		// Delay the execution of isActive for 1000 milliseconds (1 second)
		isActive();
		// Resume the observer after execution
		observer.observe(targetElement, config);
	}
	});
}
}

// Select the <ul> element you want to observe
const targetElement = document.getElementById('menu');

// Create a MutationObserver instance with the callback
const observer = new MutationObserver(handleClassChange);

// Configuration options for the observer (observe attributes changes)
const config = { attributes: true, attributeFilter: ['class'], subtree: true };

// Start observing the target element with the specified configuration
observer.observe(targetElement, config);

// Code to change corte
const selectElement = document.getElementsByClassName('grading_periods_selector content-box')[0];
