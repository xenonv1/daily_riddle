import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function RiddleApp() {
  const [riddle, setRiddle] = useState("");
  const [answer, setAnswer] = useState("");
  const [showAnswer, toggleShowAnswer] = useState(false);

  useEffect(() => {
    axios.get("https://riddles-api.vercel.app/random").then((res) => {
      setRiddle(res.data.riddle);
      setAnswer(res.data.answer);
    });
  }, []);

  function revealAnswer() {
    toggleShowAnswer(!showAnswer);
  }

  return (
    <div className="main-container">
      <div className="content-container">
        <h1>
          Welcome to <span className="secondary-font">Riddler</span>! Have fun
          solving your daily riddle!
        </h1>
        <h2>{riddle}</h2>
        <button onClick={revealAnswer}>
          {!showAnswer ? "Reveal answer" : "Hide answer"}
        </button>
        {showAnswer ? (
          <h2>{answer}</h2>
        ) : (
          <p className="secondary-font hint">
            Click the button above to reveal the answer to this riddle :)
          </p>
        )}
      </div>
      <div className="credits-container">
        <p>
          Made with by{" "}
          <a
            href="https://github.com/xenonv1/"
            target="_blank"
            rel="noreferrer"
          >
            nb
          </a>{" "}
          with ❤️
        </p>
        <p>
          using{" "}
          <a
            href="https://riddles-api.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            riddles api
          </a>{" "}
          by{" "}
          <a
            href="https://github.com/nkilm"
            target="_blank"
            rel="noreferrer"
          >
            Nikhil Mohite
          </a>
        </p>
        <p>Thank you for providing the riddles!</p>
      </div>
    </div>
  );
}
