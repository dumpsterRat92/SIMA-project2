// Define an asynchronous function to handle the logout process
const logout = async () => {
  // Send a POST request to the server's logout route
  const response = await fetch('/user/logout', {
    method: 'POST', // Specify the method
    headers: { 'Content-Type': 'application/json' }, // Set the content type header
  });

  // Check if the HTTP response status is 'OK' (status code 200)
  if (response.ok) {
    // If logout is successful, redirect the user to the homepage
    document.location.replace('/');
  } else {
    // If logout fails, alert the user
    alert('Failed to log out.');
  }
};

// Add a click event listener to the logout button
document.querySelector('#logout').addEventListener('click', logout);