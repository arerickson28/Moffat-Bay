// function to flip the hiding or displaying of an element
function toggleVisibility(id, show) {
    const el = document.getElementById(id);
    if (el) el.style.display = show ? 'inline' : 'none';
}

// when the page loads, conditionally render either the "log in" anchor or the "log out" anchor based on logged in status
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/session/getSession')
        .then(res => res.json())
        .then(({ logged_in }) => {
            toggleVisibility('login-link', !logged_in);
            toggleVisibility('logout-link', logged_in);
        });
});


// when the log out anchor is clicked, call route to end user session
document.getElementById('logout-link').addEventListener('click', async (e) => {
    e.preventDefault();

    const res = await fetch('/api/users/logoutUser', {
        method: 'POST',
    });

    if (res.ok) {
        window.location.href = '/login';
    } else {
        alert('Failed to log out.');
    }
});