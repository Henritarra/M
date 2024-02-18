function submitForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Assuming your Node.js server is running on http://localhost:3000
    var apiUrl = 'http://localhost:3000/submit-form';

    // Make an HTTP POST request to the Node.js server
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email: email, message: message }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle success, e.g., show a success message to the user
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors, e.g., show an error message to the user
    });
}