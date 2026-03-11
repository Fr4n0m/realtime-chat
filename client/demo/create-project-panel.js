export const createProjectPanel = ({ panel, githubUrl }) => {
  panel.classList.add("project-panel");
  panel.innerHTML = `
    <article class="project-panel__card">
      <h2>Visual Demo</h2>
      <p>
        This chat is an interface demo.
        You can send messages visually only.
      </p>
      <p>
        The full realtime implementation is already prepared in this project.
      </p>
      <a href="${githubUrl}" target="_blank" rel="noreferrer noopener">View implementation on GitHub</a>
    </article>
  `;
};
