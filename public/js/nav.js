function toggleVisibility(id, show) {
    const el = document.getElementById(id);
    if (el) el.style.display = show ? 'inline' : 'none';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/session/getSession')
      .then(res => res.json())
      .then(({ logged_in }) => {
        toggleVisibility('login-link', !logged_in);
        toggleVisibility('logout-link', logged_in);
      });
  });



  document.getElementById('logout-link').addEventListener('click', async (e) => {
    e.preventDefault();
  
    const res = await fetch('/api/users/logoutUser', {
      method: 'POST',
    });
  
    if (res.ok) {
      window.location.href = '/login'; // or wherever you want to send them after logout
    } else {
      alert('Failed to log out.');
    }
  });