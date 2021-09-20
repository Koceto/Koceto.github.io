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

<<<<<<< HEAD
<<<<<<< HEAD
  // const knockElement = document.getElementById("knock-element");
=======
>>>>>>> parent of 3d47144 (Added query parameters for IP and Ports)
=======
  const knockElement = document.getElementById("knock-element");
>>>>>>> parent of 61e845d (minor changes)
  const portsOrderedList = document.createElement("ol");
  const portsLogElement = log("User entered the following ports:");

  portsLogElement.appendChild(portsOrderedList);

<<<<<<< HEAD
<<<<<<< HEAD
  for (const port of ports) {    
      const urlToKnock = `https://${userIp}:${port.trim()}/`;
    log(`Calling port \'${port}\' - \'${urlToKnock}\'`, logType.info, portsOrderedList);

    try {
      await sendUDP(userIp, +port);
    } catch (err) {
      log(`Error: ${err}`, logType.error)
    }
    
    // await new Promise((resolve) => {
    //   const knocker = document.createElement("img");
    //   knocker.src = urlToKnock;
    //   knockElement.appendChild(knocker)
      
    //   setTimeout(() => {
    //     resolve();
    //   }, requestDelay);
    // });
=======
  for (const port of ports) {
    const fetchUrl = `https://${userIp}:${port}/`;

    log(`Calling port \'${port}\' - \'${fetchUrl}\'`, logType.info, portsOrderedList);

    await new Promise((resolve) => {
      fetch(fetchUrl).catch();
=======
  for (const port of ports) {
    const urlToKnock = `https://${userIp}:${port.trim()}/`;

    log(`Calling port \'${port}\' - \'${urlToKnock}\'`, logType.info, portsOrderedList);

    await new Promise((resolve) => {
      const knocker = document.createElement("img");
      knocker.src = urlToKnock;
      knockElement.appendChild(knocker)
>>>>>>> parent of 61e845d (minor changes)

      setTimeout(() => {
        resolve();
      }, requestDelay);
    });
<<<<<<< HEAD
>>>>>>> parent of 3d47144 (Added query parameters for IP and Ports)
=======
>>>>>>> parent of 61e845d (minor changes)
  }

  log("Done!");
  log("Refresh if you want another knock.");
}
