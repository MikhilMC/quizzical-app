import React, { useState } from "react";
import Quizzical from "./components/Quizzical";
import Start from "./components/Start";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  const handleStartQuiz = () => {
    setStartQuiz(true);
  };

  // const content =
  //   startQuiz === false ? (
  //     <div className="quiz-start">
  //       <Start start={handleStartQuiz} />
  //     </div>
  //   ) : (
  //     <div className="quiz">
  //       <Quizzical />
  //     </div>
  //   );

  const content =
    startQuiz === false ? <Start start={handleStartQuiz} /> : <Quizzical />;

  return (
    <div className={`${startQuiz === false ? "quiz-start" : "quiz"}`}>
      {content}
    </div>
  );
}

export default App;
