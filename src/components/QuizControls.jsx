import React from "react";

function QuizControls({ setLevel, setCategory, setManualTime, fetchQuestions }) {
  return (
    <div className="flex flex-col space-y-3 items-center w-full">
      <select onChange={(e) => setLevel(e.target.value)} className="p-3 border rounded w-64 bg-gray-200 text-gray-700">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <select onChange={(e) => setCategory(e.target.value)} className="p-3 border rounded w-64 bg-gray-200 text-gray-700">
        <option value="9">General Knowledge</option>
        <option value="21">Sports</option>
        <option value="23">History</option>
        <option value="18">Science</option>
      </select>

      <input
        type="number"
        onChange={(e) => setManualTime(parseInt(e.target.value, 10) || 30)}
        className="p-3 border rounded w-64 bg-gray-200 text-gray-700"
        placeholder="Set Timer (seconds)"
      />

      <button onClick={fetchQuestions} className="bg-blue-500 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-700 w-64">
        Start Quiz
      </button>
    </div>
  );
}

export default QuizControls;
