async function portKnock(requestDelay = 2000) {
  log("Getting current IP Address...");
  const geoData = await new Promise((resolve, reject) => {
    fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=1be9a6884abd4c3ea143b59ca317c6b2")
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });

  let userIp = null;

  if (geoData && geoData.ip_address) {
    userIp = geoData.ip_address;

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

  const portsOrderedList = document.createElement("ol");
  const portsLogElement = log("User entered the following ports:");

  portsLogElement.appendChild(portsOrderedList);

  for (const port of ports) {
    const fetchUrl = `https://${userIp}:${port}/`;

    log(`Calling port \'${port}\' - \'${fetchUrl}\'`, logType.info, portsOrderedList);

    await new Promise((resolve) => {
      fetch(fetchUrl).catch();

      setTimeout(() => {
        resolve;
      }, requestDelay);
    });
  }

  log("Done!");
  log("Refresh if you want another knock.");
}
