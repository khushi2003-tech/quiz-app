import React from "react";
import Answer from "./Answer";

function Question({ question, questionIndex, answers, updateAnswers, isGameOver }) {
  return (
    <div className="mb-6 w-full">
      <h2 className="text-lg font-bold text-[#293264] mb-4">{question}</h2>
      <div className="grid grid-cols-2 gap-2">
        {answers.map((ans, ansIndex) => (
          <Answer
            key={ansIndex}
            answer={ans}
            questionIndex={questionIndex}
            answerIndex={ansIndex}
            updateAnswers={updateAnswers}
            isGameOver={isGameOver}
          />
        ))}
      </div>
    </div>
  );
}

export default Question;

