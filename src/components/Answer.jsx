import React from "react";

function Answer({ answer, questionIndex, answerIndex, updateAnswers, isGameOver }) {
  return (
    <button
      onClick={() => !isGameOver && updateAnswers(questionIndex, answerIndex)}
      className={`border-2 rounded-xl px-4 py-2 my-2 transition-all w-full font-semibold 
        ${
          isGameOver
            ? answer.isCorrect
              ? "bg-green-400 text-white"
              : answer.isSelected
              ? "bg-red-400 text-white"
              : "bg-gray-300"
            : answer.isSelected
            ? "bg-blue-300 text-white"
            : "hover:bg-gray-200"
        }`}
    >
      {answer.answer}
    </button>
  );
}

export default Answer;

