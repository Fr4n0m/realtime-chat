const ensurePopup = (githubUrl) => {
  const existing = document.getElementById("project-popup");
  if (existing) {
    return existing;
  }

  const dialog = document.createElement("dialog");
  dialog.id = "project-popup";
  dialog.className = "project-popup";
  dialog.innerHTML = `
    <article class="project-popup__card">
      <h2>Demo interactiva</h2>
      <p>Esta web muestra una demo visual del chat.</p>
      <p>La implementacion real esta preparada en la arquitectura del proyecto.</p>
      <a href="${githubUrl}" target="_blank" rel="noreferrer noopener">Ver implementacion en GitHub</a>
      <button type="button" id="project-popup-close">Entendido</button>
    </article>
  `;

  document.body.appendChild(dialog);

  const closeButton = dialog.querySelector("#project-popup-close");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      dialog.close();
    });
  }

  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) {
      dialog.close();
    }
  });

  return dialog;
};

export const createProjectPopup = ({ githubUrl }) => {
  const popup = ensurePopup(githubUrl);

  return () => {
    if (!popup.open) {
      popup.showModal();
    }
  };
};
