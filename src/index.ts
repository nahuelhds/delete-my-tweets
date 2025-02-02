// @ts-nocheck
(function deleteNextTweet(index = 0, total = 0, retries = 0, continueAfterRest = false) {

  // Selectors. This may change in the near future.
  const menuButtonSelector = '.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj [d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"]';
  const retweetIconSelector = 'path[d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"]'

  // Config
  const totalRetries = 10;
  const restAfterDeletedTweetsCount = 100;

  // Rest mechanism for avoiding blocks
  console.debug("Continuar luego de descansar?", continueAfterRest, "Hay tweets eliminados?", total > 0, "Se eliminaron bastantes tweets", total > 0 && total % restAfterDeletedTweetsCount === 0);

  if (!continueAfterRest && total > 0 && total % restAfterDeletedTweetsCount === 0) {
    const restingSeconds = randomInteger(10, 30);
    console.warn(`Descansando ${restingSeconds} segundos antes de continuar...`);
    setTimeout(() => {
      deleteNextTweet(index, total, retries, true);
    }, restingSeconds * 1000);
    return;
  }

  console.log("Tweet nro.", index + 1, "Total de eliminados", total + 1, "Reintentos", retries + 1);
  const menuButtonCandidates = document.querySelectorAll(menuButtonSelector);
  const menuButtonCandidate = menuButtonCandidates[index];
  if (!menuButtonCandidate) {

    if (retries === totalRetries) {
      console.log("Cantidad de reintentos suficientes. No debe haber más tweets. Fin del proceso.");
      return;
    }

    console.log("No se encontraron más botones. Esperando 2 segundos para reintentar...");
    setTimeout(() => {
      // Scroll all the way down for avoiding get into a loop of finding just retweets
      window.scrollTo(0, document.body.scrollHeight)
      document.querySelector("article").scrollIntoView(false);
      deleteNextTweet(0, total, retries + 1);
    }, 2000);
    return;
  }

  const menuButton = menuButtonCandidate.closest('div');
  if (!menuButton) {
    console.info("No encontré el botón del menú. Salteando al siguiente elemento.");
    // Scroll all the way down for avoiding get into a loop of finding just retweets

    deleteNextTweet(index + 1, total, retries);
    return;
  }

  // ALways show the element
  menuButton.scrollIntoView(false);
  menuButton.click();

  // Emulate the human behavior
  setTimeout(() => {
    const menuOptions = [...document.querySelectorAll("div[role=menuitem] span")];
    const deleteOption = menuOptions
      .find(div => div.innerText.includes("Eliminar"))

    // Maybe it's a retweet
    if (!deleteOption) {
      console.debug("No encontré el botón de \"Eliminar\". Verificando si es un retweet.");

      const retweetIcons = [...menuButton.closest("article").querySelectorAll(retweetIconSelector)];

      // if we have two retweet icons is because it's a retweet (the "you retweeted" on the post heaeder and the actual retweet icon).
      const isRetweet = retweetIcons.length === 2;
      if (!isRetweet) {
        // Scroll all the way down for avoiding get into a loop of finding just retweets

        console.error('No encontré los botones de "Eliminar" ni de "Deshacer repost". Omitiendo el elemento.');
        deleteNextTweet(index + 1, total, retries);
        return;
      }

      // Click outside so the opened menu closes
      menuOptions[0].closest("div[role=menu]")
        .previousSibling
        .previousSibling
        .click()

      setTimeout(() => {

        // The second one is the button
        const retweetButton = retweetIcons[1].closest("div");
        retweetButton.scrollIntoView(false);
        retweetButton.click();

        setTimeout(() => {
          const undoRetweetButton = [...document.querySelectorAll('div[role=menuitem] span')]
            .find(div => div.innerText.includes("repost"))

          if (!undoRetweetButton) {
            console.error('Parecía un retweet pero no encontré el "Deshacer repost". Omitiendo el elemento.');
            deleteNextTweet(index + 1, total, retries);
            return;
          }

          const undoAction = undoRetweetButton.closest('div');
          undoAction.scrollIntoView(false);
          undoAction.click();

          setTimeout(() => {

            console.warn("Retweet deshecho.");
            deleteNextTweet(index + 1, total + 1);

          }, randomInteger(250, 1000));

        }, randomInteger(250, 1000));
      }, randomInteger(250, 1000));

      return;
    }

    const deleteAction = deleteOption.closest('div');
    deleteAction.scrollIntoView(false);
    deleteAction.click();

    setTimeout(() => {

      const deleteButton = [...document.querySelectorAll('button')]
        .find(div => div.innerText.includes("Eliminar"));

      deleteButton.scrollIntoView(false);
      deleteButton.click();

      console.warn("Tweet eliminado.");
      deleteNextTweet(index + 1, total + 1);

    }, randomInteger(250, 1000));

  }, randomInteger(250, 1000));

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
})();