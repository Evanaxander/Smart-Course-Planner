document.addEventListener('DOMContentLoaded', function() {
    // Set current date in footer
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString();
    
    // CGPA feedback logic
    const cgpa = parseFloat(document.getElementById('cgpaValue').innerText);
    const feedback = document.getElementById('cgpaFeedback');
  
    if (cgpa >= 3.75) {
      feedback.innerText = "Excellent performance! You're in the top 10% of your class.";
      feedback.style.backgroundColor = "#d4edda";
      feedback.style.color = "#155724";
    } else if (cgpa >= 3.0) {
      feedback.innerText = "Good standing. Focus on B+ grades to reach the next level.";
      feedback.style.backgroundColor = "#fff3cd";
      feedback.style.color = "#856404";
    } else {
      feedback.innerText = "Consider academic advising to improve your performance.";
      feedback.style.backgroundColor = "#f8d7da";
      feedback.style.color = "#721c24";
    }
  
    // Simulate grade distribution visualization
    const gradeBar = document.querySelector('.grade-bar');
    gradeBar.innerHTML = `
      <div style="position: absolute; left: 0%; width: 5%; height: 100%; background-color: #e74c3c;"></div>
      <div style="position: absolute; left: 5%; width: 10%; height: 100%; background-color: #f39c12;"></div>
      <div style="position: absolute; left: 15%; width: 20%; height: 100%; background-color: #f1c40f;"></div>
      <div style="position: absolute; left: 35%; width: 30%; height: 100%; background-color: #2ecc71;"></div>
      <div style="position: absolute; left: 65%; width: 35%; height: 100%; background-color: #27ae60;"></div>
    `;
  
    // Fetch data from API
    fetch('http://localhost/smartwebapp/api/dashboard')
      .then(response => response.json())
      .then(data => {
        console.log(data); // This shows the data from your PHP API
        // Use this data in your frontend
      })
      .catch(error => console.error('Error:', error));
  });
  
  function showRetakeSuggestion() {
    const msg = `
      <div class="recommendation-item" style="margin-top: 15px;">
        <strong>Recommended Retake:</strong> CSE201 - Structured Programming (Grade: D)<br>
        <strong>Potential Impact:</strong> Retaking this course and earning a B+ could raise your CGPA to ~3.82
      </div>
    `;
    document.getElementById('retakeMessage').innerHTML = msg;
  }
  
  function logout() {
    if (confirm("Are you sure you want to logout?")) {
      alert("You have been logged out successfully.");
      // window.location.href = 'login.html';
    }
  }