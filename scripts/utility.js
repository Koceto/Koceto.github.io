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

  let inputValue;

  await new Promise((resolve) => {
    const submitFunc = () => {
      inputValue = inputElement.value;
      inputElement.blur();
      resolve();
    };

    inputElement.onkeypress = (event) => {
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

function getQueryStringValue(key) {
  const params = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

  for (let i = 0; i < params.length; i++) {
      const kvp = params[i].split('=');

      if (kvp[0] === key || kvp[0] === key+'[]') {
         return decodeURIComponent(kvp[1]);
      }
  }

  return null;
}

(() => {
  window.onload = async () => {
    let dynamicContentLocation = "../html/desktop.html";
    if (window.innerWidth < 960) {
      dynamicContentLocation = "../html/mobile.html";
    }

    await new Promise((resolve, reject) => {
      fetch(dynamicContentLocation, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "text/plain",
        },
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          document.getElementById("portKnock-content").innerHTML = data;
          resolve();
        })
        .catch(reject);
    });

    document.querySelectorAll("input").forEach((e) => {
      e.onkeydown = e.onfocus = setInputWidth;
      e.onblur = clearInputWidth;
    });

    portKnock();
  };
})();
