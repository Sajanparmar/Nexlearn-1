// Toggle password visibility
document.getElementById('togglePassword').onclick = function() {
    const pwd = document.getElementById('password');
    if (pwd.type === "password") {
      pwd.type = "text";
    } else {
      pwd.type = "password";
    }
  };
  
  // Simple form validation for Terms checkbox
  document.getElementById('signupForm').onsubmit = function(e) {
    if (!document.getElementById('terms').checked) {
      alert('You must agree to the Terms of Use and Privacy Policy.');
      e.preventDefault();
    }
  };