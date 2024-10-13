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

	const Credits = {
		"Educación Física": 1,
		"Formación Integral": 1,
		"Homeroom": null,
		"Hist. y Geog. Dominicana S. XIX y XX": 2,
		"IB English A: Language and Literature HL": 5,
		"IB Español A: Lengua y Literatura HL": 5,
		"IB History Americas HL": 4,
		"IB Mandarín ab initio": 3,
		"IB Mathematics: Analysis SL": 4,
		"IB Physics SL": 4,
		"IB Theory of Knowledge": 3,
		"Química": 2,
		"IB Art": 3
	};

	let sumCredits = 0;
	let sumGrades = 0;

	for (let i = 0; i < Data.length; i++) {
		const course = Data[i].querySelector('td.course').textContent;
		const percentStr = Data[i].querySelector('td.percent').textContent.trim();
		const percent = parseFloat(percentStr);
		
		if (Credits[course] !== null && !isNaN(percent)) {
			console.log(course + ": " + percent);
			sumGrades += percent * 0.04 * Credits[course];
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
