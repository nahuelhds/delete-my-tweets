(
  function deleteNextTweet(index = 0, total = 0, retries = 0, continueAfterRest = false) {
    const totalRetries = 10;
    const restAfter = 30;
    // Rest mechanism for avoiding blocks
    console.debug("Continuar luego de descansar?", continueAfterRest, "Hay tweets eliminados?", total > 0, "Se eliminaron bastantes tweets", total > 0 && total % restAfter === 0);
    if (!continueAfterRest && total > 0 && total % restAfter === 0) {
      const restingSeconds = randomInteger(10, 30);
      console.log(`Descansando ${restingSeconds} segundos antes de continuar...`);
      setTimeout(() => {
        deleteNextTweet(index, total, retries, true);
      }, restingSeconds * 1000);
      return;
    }

    console.log("Tweet nro.", index + 1, "Total de eliminados", total + 1, "Reintentos", retries + 1);
    const menuButtonCandidates = document.querySelectorAll('.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj [d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"]');
    const menuButtonCandidate = menuButtonCandidates[index];
    if (!menuButtonCandidate) {

      if (retries === totalRetries) {
        console.log("Cantidad de reintentos suficientes. No debe haber más tweets. Fin del proceso.");
        return;
      }

      console.log("No se encontraron más botones. Esperando 2 segundos para reintentar...");
      setTimeout(() => {
        deleteNextTweet(0, total, retries + 1);
      }, 2000);
      return;
    }

    const menuButton = menuButtonCandidate.closest('div');
    if (!menuButton) {
      console.warn("No encontré el botón del menú. Salteando al siguiente elemento.");
      deleteNextTweet(index + 1, total, retries);
      return;
    }

    menuButton.scrollIntoView();
    menuButton.click();

    // Emulate the human behavior
    setTimeout(() => {
      const deleteOption = [...document.querySelectorAll("div[role=menuitem] span")].find(div => div.innerText.includes("Eliminar"))

      // Maybe it's a retweet
      if (!deleteOption) {
        console.warn("No encontré el botón de \"Eliminar\"... Posiblemente sea un retweet. Salteando al siguiente elemento.");
        deleteNextTweet(index + 1, total, retries);
        return;
      }

      deleteOption.closest('div');
      deleteOption.click();

      setTimeout(() => {
        const deleteButton = [...document.querySelectorAll('button')]
          .find(div => div.innerText.includes("Eliminar"));
        deleteButton.click();

        console.debug("Tweet eliminado. Continuando con el siguiente...");
        deleteNextTweet(index + 1, total + 1);
      }, randomInteger(250, 1000));

    }, randomInteger(250, 1000));

    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  })();