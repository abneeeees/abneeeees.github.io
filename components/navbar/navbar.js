fetch("/components/navbar/navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;

    const links = document.querySelectorAll(".navbar a");
    const currentPath = window.location.pathname;

    links.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      if (linkPath === currentPath) {
        link.classList.add("active"); // 👈 THIS IS WHERE IT COMES FROM
      }
    });
  });
