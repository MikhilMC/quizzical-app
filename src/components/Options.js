import React from "react";
import he from "he";

const Options = (props) => {
  // console.log(props.options);
  return (
    <div className="options-group">
      {props.options.map((option) => {
        const style = {
          backgroundColor:
            props.quizEnded === false
              ? option.isSelected
                ? "#D6DBF5"
                : ""
              : option.value === props.correct_answer
              ? "#94D7A2"
              : option.isSelected
              ? "#F8BCBC"
              : "",
        };
        return (
          <div
            className="answer-option"
            key={option.optionId}
            onClick={() =>
              props.selectOption(props.questionId, option.optionId)
            }
            style={style}
          >
            <span className="option">{he.decode(option.value)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Options;
