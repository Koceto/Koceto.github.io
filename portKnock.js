async function portKnock() {
  log("Getting current IP Address...");
  var geoData = await new Promise((resolve, reject) => {
    fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=1be9a6884abd4c3ea143b59ca317c6b2")
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });

  var userIp = null;

  if (geoData && geoData.ip_address) {
    userIp = geoData.ip_address;

    log(`Geolocation returned user IP: \'${userIp}\'.`);
  } else {
    log("Failed to get user IP.");
  }

  var ipPrompt = await readInput("Your IP:", userIp);

  if (!ipPrompt) {
    log("Could not read IP!", logType.error);
    return;
  }

  log("Getting user ports...");
  var portsPrompt = await readInput("Ports to knock(1;2;3):");

  if (!portsPrompt) {
    log("Could not read ports!", logType.error);
    return;
  }

  var ports = portsPrompt.split(";");

  if (ports && ports.length <= 0) {
    log("Could not read ports!", logType.error);
    return;
  }

  var portsOrderedList = document.createElement("ol");
  var portsLogElement = log("User entered the following ports:");

  portsLogElement.appendChild(portsOrderedList);

  for (const port of ports) {
    var fetchUrl = `https://${ipPrompt}:${port}/`;

    log(`Calling port \'${port}\' - \'${fetchUrl}\'`, logType.info, portsOrderedList);

    await new Promise((resolve) => {
      fetch(fetchUrl).then(resolve).catch(resolve);
    });
  }

  log("Done!");
  log("Refresh if you want another knock.");
}

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
      resolve();
    };

    inputElement.onkeyup = (event) => {
      if (event.key === "Enter") {
        submitFunc();
      }
    }
  });

  dialogContainer.classList.remove("open");

  return inputValue;
}

const logType = {
  info: "info-log",
  error: "error-log",
};
