import trashIcon from "./assets/trash.svg";
import xLogo from "./assets/x.svg";
import githubLogo from "./assets/github.svg";
import blueskyLogo from "./assets/bluesky.svg";
import "./App.css";

function App() {
  function handleClick() {
    alert("Not implemented yet");
  }

  return (
    <>
      <img src={trashIcon} className="logo" alt="logo" />
      <h1>Delete my tweets</h1>
      <p>Go to your profile and then click the button</p>
      <div className="card">
        <button onClick={handleClick}>Delete them all</button>
      </div>
      <footer>
        by <strong>nahuelhds</strong>
        <p>
          <a
            href={"https://bsky.app/profile/nahuelhds.bsky.uy"}
            target={"_blank"}
          >
            <img src={blueskyLogo} />
            Bluesky
          </a>
          <a href={"https://github.com/nahuelhds"} target={"_blank"}>
            <img src={xLogo} />
            Twitter
          </a>
          <a href={"https://x.com/nahuelhds/delete-my-tweets"} target="_blank">
            <img src={githubLogo} />
            GitHub
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
