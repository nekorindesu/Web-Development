// MAGNO, KATHERINE D. || BSIT 3-1 || TASK # 1
function validateForm(createAccountForm) {
    // Validate names
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    if (!isAlpha(firstName)) {
        alert("Invalid First Name! Name should contain only alphabetical characters.");
        return false;
    }
    if (!isAlpha(lastName)) {
        alert("Invalid Last Name! Name should contain only alphabetical characters.");
        return false;
    }

    // Validate age and birthday
    var age = parseInt(document.getElementById("age").value, 10);
    var birthday = new Date(document.getElementById("birthday").value);
    var today = new Date();

    // Check if the birthday is in the future
    if (birthday > today) {
        alert("Invalid birthday!");
        return false;
    }

    // Calculate age based on the difference in years
    var ageFromDate = today.getFullYear() - birthday.getFullYear();

    // Adjust age based on the birthdate in the current year
    if (today.getMonth() < birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())) {
        ageFromDate--;
    }

    // Check if the calculated age matches the entered age
    if (isNaN(age) || ageFromDate !== age) {
        alert("Age and birthday don't match! Please check and try again.");
        return false;
    }

    // Check if a gender is selected
    var genderMale = document.getElementById("male");
    var genderFemale = document.getElementById("female");
    if (!genderMale.checked && !genderFemale.checked) {
        alert("Please select a gender!");
        return false;
    }
    
    //Check if email is in correct format
    var email = document.getElementById("email").value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Check if passwords match
    var password1 = document.getElementById("p1").value;
    var password2 = document.getElementById("p2").value;
    if (password1 !== password2) {
        alert("Passwords do not match! Please re-enter password.");
        return false;
    }
    return true;
}

// Helper function to check if a string contains only alphabetical characters
function isAlpha(str) {
    return /^[a-zA-Z\s.]+$/.test(str);
}

// Event Listener to set the max date for birthday as today
document.addEventListener("DOMContentLoaded", function () {
    var today = new Date().toISOString().split('T')[0];
    document.getElementById("birthday").setAttribute("max", today);
});

function validateAndRedirect() {
    if (validateForm()) {
        alert("Submitting form... please wait a second.");
        // Use AJAX to submit the form data
        var formData = new FormData(document.getElementById("createAccountForm"));
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://script.google.com/macros/s/AKfycbxxPTvAtWB5EaII-robiLx7qRQYX2elNjgTWOc4LV9ilTG3iPKvA-mklmRqOXGxGTte/exec");
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Assuming a successful response means the data was submitted
                alert("Congratulations! You have successfully created an account.");
                window.location.href = "studrec.html"; // Redirect to the next page (student record page)
            } else {
                alert("Error submitting form. Please try again.");
            }
        };
        xhr.send(formData);
        // Prevent the default form submission
        return false;
    } else {
        // Prevent the form submission if validation fails
        return false;
    }
}