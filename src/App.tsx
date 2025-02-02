import trashIcon from "../public/img/trash.svg";
import xLogo from "../public/img/x.svg";
import githubLogo from "../public/img/github.svg";
import blueskyLogo from "../public/img/bluesky.svg";
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
