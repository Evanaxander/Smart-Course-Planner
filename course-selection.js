document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const creditCounter = document.getElementById('creditCounter');
    const popup = document.getElementById('popup');
    const predictedCGPAElement = document.getElementById('predictedCGPA');
    let totalCredits = 0;
    let totalCourses = 0;
  
    // Function for Course Selection logic
    checkboxes.forEach(box => {
      box.addEventListener('change', () => {
        const credit = parseInt(box.value);
        if (box.checked) {
          if (totalCredits + credit <= 12 && totalCourses < 4) {
            totalCredits += credit;
            totalCourses += 1;
          } else {
            box.checked = false;
            alert("You can select up to 12 credits or 4 courses only.");
          }
        } else {
          totalCredits -= credit;
          totalCourses -= 1;
        }
        creditCounter.textContent = `Selected Credits: ${totalCredits} | Selected Courses: ${totalCourses}`;
      });
    });
  
    // Predict CGPA Button functionality
    document.getElementById('predictCGPA').addEventListener('click', () => {
      const selectedCourses = Array.from(checkboxes).filter(box => box.checked);
      const courseGrades = selectedCourses.map(course => course.getAttribute('data-grade'));
      
      if (courseGrades.length === 0) {
        alert("Please select some courses before predicting CGPA.");
        return;
      }
  
      const gradePoints = {
        'A': 4.00,
        'A-': 3.70,
        'B+': 3.30,
        'B': 3.00,
        'B-': 2.70,
        'C+': 2.30,
        'C': 2.00,
        'C-': 1.70,
        'D+': 1.30,
        'D': 1.00,
        'F': 0.00
      };
  
      let totalGradePoints = 0;
      selectedCourses.forEach(course => {
        const grade = course.getAttribute('data-grade');
        totalGradePoints += gradePoints[grade] * parseInt(course.value);
      });
  
      const predictedCGPA = (totalGradePoints / totalCredits).toFixed(2);
  
      predictedCGPAElement.textContent = `Your predicted CGPA is: ${predictedCGPA}`;
      predictedCGPAElement.style.fontWeight = "bold";
      predictedCGPAElement.style.color = "black";
      popup.style.display = 'block';
    });
  
    // Close the popup
    window.closePopup = function() {
      popup.style.display = 'none';
    };
  });