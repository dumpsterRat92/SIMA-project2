
const path = window.location.pathname;
let className = 'defaultbg';

if (path === '/' || path.includes('gamepad')){
    className = 'homebg';
} else if (path.includes('login')) {
    className = 'loginbg';
}
document.body.classList.add(className);