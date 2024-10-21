document.addEventListener("DOMContentLoaded", function () {
  const projectContainer = document.querySelector(".project-container");
  const expandBtn = document.getElementById("expand-btn");
  let isExpanded = false;

  function toggleProjects() {
    const projectCards = projectContainer.querySelectorAll(".card");

    if (isExpanded) {
      // Collapse: show only first 4 projects
      for (let i = 4; i < projectCards.length; i++) {
        projectCards[i].style.display = "none";
      }
      expandBtn.textContent = "Show More";
    } else {
      // Expand: show all projects
      projectCards.forEach((card) => (card.style.display = "block"));
      expandBtn.textContent = "Show Less";
    }

    isExpanded = !isExpanded;
  }

  // Fetch projects from project-showcase.html
  fetch("project-showcase.html")
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const projectCards = doc.querySelectorAll(".card");

      // Display all projects
      projectContainer.innerHTML = Array.from(projectCards)
        .map((card) => card.outerHTML)
        .join("");

      // Initially hide projects beyond the first 4
      toggleProjects();

      // Show expand button if there are more than 4 projects
      if (projectCards.length > 4) {
        expandBtn.style.display = "block";
        expandBtn.addEventListener("click", toggleProjects);
      }
    })
    .catch((error) => console.error("Error fetching projects:", error));
});
