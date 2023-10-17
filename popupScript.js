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
	document.getElementById("finalGPA").innerHTML = "Final GPA: " + finalGPA;
	} catch (error) {
	console.error('There was a problem with the fetch operation:', error);
	return null;
	}
		}
getGPA()
	