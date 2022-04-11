import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import he from "he";
import { TailSpin } from "react-loader-spinner";
import Options from "./Options";

const Quizzical = () => {
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((res) =>
        setQuestions(() => {
          setIsQuestionsLoaded(true);
          return res.results.map((item) => {
            const optionsArray = shuffle([
              item.correct_answer,
              ...item.incorrect_answers,
            ]);
            const optionsObjectArray = optionsArray.map((option) => ({
              optionId: nanoid(),
              value: option,
              isSelected: false,
            }));
            return {
              questionId: nanoid(),
              question: item.question,
              options: optionsObjectArray,
              correct_answer: item.correct_answer,
            };
          });
        })
      );
  }, []);

  const [questions, setQuestions] = useState([]);
  const [isQuestionsLoaded, setIsQuestionsLoaded] = useState(false);
  const [doesQuizEnded, setDoesQuizEnded] = useState(false);
  const [score, setScore] = useState(0);
  // console.log(questions);

  const loadQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((res) =>
        setQuestions(() => {
          setIsQuestionsLoaded(true);
          return res.results.map((item) => {
            const optionsArray = shuffle([
              item.correct_answer,
              ...item.incorrect_answers,
            ]);
            const optionsObjectArray = optionsArray.map((option) => ({
              optionId: nanoid(),
              value: option,
              isSelected: false,
            }));
            return {
              questionId: nanoid(),
              question: item.question,
              options: optionsObjectArray,
              correct_answer: item.correct_answer,
            };
          });
        })
      );
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleOptionSelect = (questionId, optionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.questionId === questionId) {
          const latestOptions = question.options.map((option) => ({
            ...option,
            isSelected: option.optionId === optionId ? true : false,
          }));
          return { ...question, options: latestOptions };
        } else {
          return question;
        }
      })
    );
  };

  const handleQuizSubmit = () => {
    // console.log("Quiz submitted");
    // console.log(questions);
    let currentScore = 0;
    questions.forEach((question) => {
      question.options.forEach((option) => {
        if (option.isSelected && option.value === question.correct_answer) {
          currentScore++;
        }
      });
    });
    // console.log(currentScore);
    setScore(currentScore);
    setDoesQuizEnded(true);
  };

  const handleQuizRestart = () => {
    // console.log("Quiz restarted");
    setIsQuestionsLoaded(false);
    setDoesQuizEnded(false);
    loadQuestions();
  };

  const questionList = questions.map((question) => {
    return (
      <div className="questions" key={question.questionId}>
        <h4 className="question-title">{he.decode(question.question)}</h4>
        <Options
          options={question.options}
          questionId={question.questionId}
          selectOption={handleOptionSelect}
          correct_answer={question.correct_answer}
          quizEnded={doesQuizEnded}
        />
        <hr />
      </div>
    );
  });

  const resultPart =
    doesQuizEnded === false ? (
      <div className="quiz-submit" style={{ textAlign: "center" }}>
        <button className="quiz-page-button" onClick={handleQuizSubmit}>
          Check answers
        </button>
      </div>
    ) : (
      <div className="quiz-submit" style={{ textAlign: "center" }}>
        <span className="quiz-score">You scored {score}/5 correct answers</span>
        <button className="quiz-page-button" onClick={handleQuizRestart}>
          Play agin
        </button>
      </div>
    );

  return (
    <div className="quiz-container">
      {isQuestionsLoaded && questionList}
      {isQuestionsLoaded ? (
        resultPart
      ) : (
        <TailSpin color="#293264" height={80} width={80} />
      )}
    </div>
  );
};

export default Quizzical;
