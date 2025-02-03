import trashIcon from "/img/trash.svg";
import xLogo from "/img/x.svg";
import githubLogo from "/img/github.svg";
import blueskyLogo from "/img/bluesky.svg";
import "./App.css";

function App() {
  async function handleClick() {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    if (!tab) {
      return console.warn("No tab found!");
    }

    if (!tab.id) {
      return console.warn("Tab id is undefined. Cannot proceed");
    }

    void chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["lib/delete-tweets.js"],
    });
  }

  return (
    <>
      <img src={trashIcon} className="logo" alt="logo" />
      <h1>Delete my tweets!</h1>
      <p>
        <a href={"https://x.com"} target={"_blank"}>
          Go to X/Twitter
        </a>
        , then to your profile and finally click the button
      </p>
      <div className="card">
        <button onClick={handleClick}>Start deleting</button>
      </div>
      <footer>
        by <strong>nahuelhds</strong>
        <p>
          <a
            href={"https://bsky.app/profile/nahuelhds.bsky.uy"}
            target={"_blank"}
          >
            <img src={blueskyLogo} alt={"Bluesky"} />
            Bluesky
          </a>
          <a href={"https://github.com/nahuelhds"} target={"_blank"}>
            <img src={xLogo} alt={"X/Twitter"} />
            Twitter
          </a>
          <a href={"https://x.com/nahuelhds/delete-my-tweets"} target="_blank">
            <img src={githubLogo} alt={"GitHub"} />
            GitHub
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
