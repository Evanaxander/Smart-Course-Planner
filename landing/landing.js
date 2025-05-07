document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
      const response = await fetch('http://localhost/smartwebapp/api/users.php?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      const result = await response.json();
  
      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.user));
        window.location.href = "dashboard.html";
      } else {
        showNotification(result.message || "Invalid username or password. Please try again.");
      }
    } catch (err) {
      showNotification("Something went wrong. Please try again.");
    }
  });
  
  function showNotification(message) {
    const notification = document.getElementById("notification");
    const notificationMessage = document.getElementById("notification-message");
    
    notificationMessage.textContent = message;
    notification.classList.add("show");
    
    // Hide notification after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show");
    }, 5000);
  }