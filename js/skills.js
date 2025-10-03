document.addEventListener("DOMContentLoaded", () => {
  function animateBars(skillList) {
    const bars = skillList.querySelectorAll(".bar");
    bars.forEach(bar => {
      const fill = bar.querySelector("span[data-skill]");
      const tooltip = bar.querySelector(".tooltip");
      const percent = parseInt(fill.getAttribute("data-skill"));

      let width = 0;
      const interval = setInterval(() => {
        if (width >= percent) {
          clearInterval(interval);
        } else {
          width++;
          fill.style.width = width + "%";

          if (tooltip) {
            tooltip.textContent = width + "%";
            tooltip.style.left = width + "%"; // follow the bar
            tooltip.style.opacity = "1";
          }
        }
      }, 20);
    });
  }

  // Circles
  const circles = document.querySelectorAll(".circle");
  circles.forEach(circle => {
    let number = circle.querySelector(".number").innerText.replace("%", "");
    let progressCircle = circle.querySelectorAll("circle")[1];
    let radius = progressCircle.r.baseVal.value;
    let circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;

    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= number) {
        clearInterval(interval);
      } else {
        progress++;
        progressCircle.style.strokeDashoffset =
          circumference - (progress / 100) * circumference;
        circle.querySelector(".number").innerText = progress + "%";
      }
    }, 20);
  });

  // Expandable categories
  const categories = document.querySelectorAll(".skill-category");
  categories.forEach(category => {
    category.addEventListener("click", () => {
      const skillList = category.nextElementSibling;
      if (skillList && skillList.classList.contains("skill-list")) {
        const isOpen = skillList.classList.toggle("open");
        category.classList.toggle("active");

        if (isOpen) {
          animateBars(skillList);
        }
      }
    });
  });
});
