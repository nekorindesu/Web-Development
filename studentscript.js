function validateForm() {
    var studentNumber = document.getElementById("studentNumber").value;

    // Regular expression for student ID validation
    var studentNumberRegex = /^\d{4}-\d{5}-MN-0$/;

    if (!studentNumberRegex.test(studentNumber)) {
        alert("Please enter a valid student number (e.g., 2021-08330-MN-0)");
        return false;
    }

    //Check if webmail is in correct format
    var webmail = document.getElementById("webmail").value;

    // Regular expression for email validation
    var emailRegex = /^[^\s@]+@iskolarngbayan.pup.edu.ph+$/;

    if (!emailRegex.test(webmail)) {
        alert("Please enter a valid PUP webmail address.");
        return false;
    }

    // Check if a course is selected
    var course = document.getElementById("course");

    if (course.value === "") {
        alert("Please select a course!");
        return false;
    }

    // Check if a year level is selected
    var yearlevel = document.getElementById("yearlevel");

    if (yearlevel.value === "") {
        alert("Please select a year level!");
        return false;
    }

    // Check if a section is selected
    var section = document.getElementById("section");

    if (section.value === "") {
        alert("Please select a section!");
        return false;
    }
    return true;
}

function validateAndRedirect() {
    if (validateForm()) {
        alert("Submitting form... please wait a second."); // You can replace this with your loading indicator logic
        // Use AJAX to submit the form data
        var formData = new FormData(document.getElementById("studentRecordForm"));
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://script.google.com/macros/s/AKfycbxxPTvAtWB5EaII-robiLx7qRQYX2elNjgTWOc4LV9ilTG3iPKvA-mklmRqOXGxGTte/exec");
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Assuming a successful response means the data was submitted
                //alert("Congratulations! You have successfully created an account.");
                window.location.href = "success.html"; // Redirect to the next page
            } else {
                // Handle errors here
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
