async function portKnock(requestDelay = 2000) {
  log("Getting IP address from query...");
  let userIp = getQueryStringValue("ip");

  if (!userIp) {
    log("Failed to get user IP.");
  }

  userIp = await readInput("Your IP:", userIp);

  if (!userIp) {
    log("Could not read IP!", logType.error);
    return;
  } else {
    log(`Using IP: \'${userIp}\'.`);
  }

  log("Getting user ports...");
  let userPortsString = getQueryStringValue("ports");
  
  if (!userPortsString) {
    log("Failed to get user Ports.");
  }  
  userPortsString = await readInput("Ports to knock (Ex: 1;2;3):", userPortsString);

  if (!userPortsString) {
    log("Could not read ports!", logType.error);
    return;
  }

  const ports = userPortsString.split(";").filter((p) => p);

  if (ports.length <= 0) {
    log("No ports found in input!", logType.error);
    return;
  }

  const knockElement = document.getElementById("knock-element");
  const portsOrderedList = document.createElement("ol");
  const portsLogElement = log("User entered the following ports:");

  portsLogElement.appendChild(portsOrderedList);

  for (const port of ports) {
    const urlToKnock = `https://${userIp}:${port.trim()}/`;

    log(`Calling port \'${port}\' - \'${urlToKnock}\'`, logType.info, portsOrderedList);

    await new Promise((resolve) => {
      const knocker = document.createElement("img");
      knocker.src = urlToKnock;
      knockElement.appendChild(knocker)

      setTimeout(() => {
        resolve();
      }, requestDelay);
    });
  }

  log("Done!");
  log("Refresh if you want another knock.");
}
