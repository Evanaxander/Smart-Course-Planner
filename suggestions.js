const suggestions = [
    ["🔹 CSE 201", "🔹 CSE 206 + Lab", "🔹 H/S-4 - 3 Credits", "🔹 CSE 210 - 3 Credits"],
    ["🔹 CSE 201", "🔹 CSE 203 + Lab", "🔹 H/S-4 - 3 Credits", "🔹 CSE 210 - 3 Credits"],
    ["🔹 PHY 101 + Lab", "🔹 CSE 201", "🔹 H/S-2 - History/Society", "🔹 ENG 105", "🔹 CSE 203"]
  ];
  
  let currentSuggestion = 0;
  
  function toggleSuggestion() {
    currentSuggestion = (currentSuggestion + 1) % suggestions.length;
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = "";
    suggestions[currentSuggestion].forEach(course => {
      const li = document.createElement("li");
      li.textContent = course;
      courseList.appendChild(li);
    });
  }