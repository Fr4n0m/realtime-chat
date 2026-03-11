export const initThemeToggle = (toggleElement) => {
  toggleElement.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", toggleElement.checked);
  });
};
