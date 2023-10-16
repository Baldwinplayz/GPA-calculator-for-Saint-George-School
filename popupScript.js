async function getGPA() {
	try {
	const response = await fetch('https://stgeorge.instructure.com/grades');
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const htmlContent = await response.text();

	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlContent, 'text/html');
	const Data = doc.querySelectorAll('tr');

	const Grades = {};

	const Credits = {
		'College and Career Presentations & Preparations (Promo2027)': null,
		'3rd Form Educación Física': 1,
		'3rd Form Artistic Expression': 2,
		'Cambridge International - Students and Parents': null,
		'3rd Form Paz Homeroom': null,
		'3rd Form Pre-Engineering & Advanced Technology': 1,
		'3rd Form Formación Integral': 1,
		'3rd Form Nociones de Mandarin': 4,
		'3rd Form IGCSE Mathematics-Extended': 5,
		'3rd Form World History': 3,
		'3rd Form IGCSE Science': 4,
		'3rd Form Lengua Española': 4,
		'3rd Form IGCSE World Literature': 4,
		'3rd Form Hist. de la Civilización/Geog. Mundial': 3,
		'3rd and 4th Form Elective': 1
		};
	
		let sumCredits = 0;
		let sumGrades = 0;
	
		for (let i = 0; i < 14; i++) {
			const course = Data[i].querySelector('td.course').textContent;
			const percentStr = Data[i].querySelector('td.percent').textContent.trim();
			const percent = parseFloat(percentStr);
			if (Credits[course] !== null && (Number.isFinite(percent) && !Number.isInteger(percent))) {
				sumGrades += parseFloat(percent) * 0.04 * Credits[course];
				sumCredits += Credits[course];
			}
		}

	const perfGPA = (sumGrades / sumCredits); // Calculate the GPA
	const finalGPA = perfGPA.toFixed(2); // Round to 2 decimal places
	document.getElementById("finalGPA").innerHTML = "Final GPA: " + finalGPA;
	} catch (error) {
	console.error('There was a problem with the fetch operation:', error);
	return null;
	}
		}
getGPA()
	