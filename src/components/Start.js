import React from "react";

const Start = (props) => {
  return (
    <div className="start-page">
      <h1 className="start-page--title">Quizzical</h1>
      <p className="start-page--content">Some description if needed</p>
      <button className="start-page--button" onClick={props.start}>
        Start quiz
      </button>
    </div>
  );
};

export default Start;
