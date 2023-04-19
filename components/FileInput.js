const FileInput = () => {
  const modal = document.getElementById("modal");
  const container = document.createElement("div");
  container.className = "container";
  container.id = "cnt";
  container.style = "display: flex";
  container.styl;

  const row = document.createElement("div");
  row.className = "row";

  const uploadBtn = document.createElement("button");
  uploadBtn.className = "icon-btn";
  uploadBtn.id = "add-row";
  uploadBtn.title = "add row";

  const uploadIcon = document.createElement("i");
  uploadIcon.className = "fa fa-plus";

  uploadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  uploadBtn.appendChild(uploadIcon);
  row.appendChild(uploadBtn);
  container.appendChild(row);

  return container;
};

export { FileInput };
