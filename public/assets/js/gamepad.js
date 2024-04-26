// Retrieve the current path from the window's location
const path = window.location.pathname;
let className = 'defaultbg'; // Default class name for the background

// Determine the background class based on the current path
if (path === '/' || path.includes('gamepad')) {
    className = 'homebg'; // Set class for homepage or gamepad related pages
} else if (path.includes('login')) {
    className = 'loginbg'; // Set class for login pages
}

// Add the determined class to the body's class list
document.body.classList.add(className);
