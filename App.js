import { FileInput } from "./components/FileInput.js";

const root = document.getElementById("root");

const fileInput = FileInput();

root.insertBefore(fileInput, root.childNodes[0]);
