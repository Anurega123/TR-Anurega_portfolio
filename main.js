var typed = new Typed(".text", {
    strings: ["Fullstack Developer", "Java Programmer", "Designer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 100,
    loop: true
});

const navLinks = document.querySelectorAll(".navbar a");
const currentPath = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.send');
    btn.disabled = true;
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Sending...';

    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        status.textContent = "Thanks — message sent!";
        status.style.color = "#7fff7f";
        form.reset();
      } else {
        const data = await res.json();
        status.textContent = (data && data.errors) ? data.errors.map(e=>e.message).join(', ') : "Failed to send. Try again.";
        status.style.color = "#ffaaaa";
      }
    } catch (err) {
      status.textContent = "Network error. Please try again.";
      status.style.color = "#ffaaaa";
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  });
});
