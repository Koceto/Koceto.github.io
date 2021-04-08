const logType = {
  info: "info-log",
  error: "error-log",
};

function log(message, type = logType.info, logContainer = document.getElementById("portKnock-steps")) {
  const li = document.createElement("li");

  li.classList.add(type);
  li.appendChild(document.createTextNode(message));
  logContainer.appendChild(li);

  return li;
}

async function readInput(label, defaultValue = "", placeholder = "") {
  const dialogContainer = document.getElementById("portKnock-dialog");
  const labelElement = document.getElementById("portKnock-dialog-label");
  const inputElement = document.getElementById("portKnock-dialog-input");

  if (!dialogContainer || !labelElement || !inputElement) {
    throw Error("Could not find required DOM elements!");
  }

  labelElement.textContent = label;
  inputElement.placeholder = placeholder;
  inputElement.value = defaultValue;
  dialogContainer.classList.add("open");

  inputElement.focus();
  inputElement.select();

  let inputValue;

  await new Promise((resolve) => {
    const submitFunc = () => {
      inputValue = inputElement.value;
      inputElement.blur();
      resolve();
    };

    inputElement.onkeyup = (event) => {
      if (event.key === "Enter") {
        submitFunc();
      }
    };
  });

  dialogContainer.classList.remove("open");

  return inputValue;
}

function setInputWidth(event) {
  event.target.style.width = this.style.width = this.value.length + 2 + "ch";
}

function clearInputWidth(event) {
  event.target.style.width = "";
}

(() => {
  window.onload = () => {
    document.querySelectorAll("input").forEach((e) => {
      e.onkeypress = e.onfocus = setInputWidth;
      e.onblur = clearInputWidth;
    });
    portKnock();
  };
})();
