async function portKnock(requestDelay = 2000) {
  log("Getting IP address from query...");
  let userIp = getQueryStringValue("ip");

  if (geoData && geoData.ip) {
    userIp = geoData.ip;

    log(`Geolocation returned user IP: \'${userIp}\'.`);
  } else {
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
  const portsPrompt = await readInput("Ports to knock (Ex: 1;2;3):");

  if (!portsPrompt) {
    log("Could not read ports!", logType.error);
    return;
  }

  const ports = portsPrompt.split(";").filter((p) => p);

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
