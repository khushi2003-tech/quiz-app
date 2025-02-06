import React from "react";

function ScoreCard({ correctAnswers, totalQuestions, playAgain }) {
  return (
    <div className="text-center mt-4">
      <h2 className="text-2xl font-bold text-[#293264]">
        🎉 Your Score: {correctAnswers} / {totalQuestions}
      </h2>
      <button onClick={playAgain} className="bg-blue-500 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 mt-4">
        Play Again
      </button>
    </div>
  );
}

export default ScoreCard;
