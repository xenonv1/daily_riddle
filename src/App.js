import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function RiddleApp() {
  const [riddle, setRiddle] = useState("");
  const [answer, setAnswer] = useState("");
  const [showAnswer, toggleShowAnswer] = useState(false);

  useEffect(() => {
    alert(
      "This site uses cookies for basic functionalities. Our cookies will never gather any personal information eg. name, ip, ...",
    );

    if (!document.cookie) {
      axios.get("https://riddles-api.vercel.app/random").then((res) => {
        setRiddle(res.data.riddle);
        setAnswer(res.data.answer);

        setCookie("riddle", res.data.riddle);
        setCookie("answer", res.data.answer);
      });
    } else {
      const cookies = document.cookie;

      const cookiesSplit = cookies.split(";");

      let cookieValues = [];
      cookiesSplit.forEach((item) => {
        const itemSplit = item.split("=");

        cookieValues.push(itemSplit[1]);
      });

      setRiddle(cookieValues[0]);
      setAnswer(cookieValues[1]);
    }
  }, []);

  function revealAnswer() {
    toggleShowAnswer(!showAnswer);
  }

  function setCookie(name, value) {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
    const expires = date.toUTCString();

    document.cookie = `${name}=${value};expires=${expires};`;
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
