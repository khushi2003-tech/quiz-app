
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import Question from "./components/Question";
import ScoreCard from "./components/ScoreCard";
import { useTheme } from "./ThemeContext";
import QuizControls from "./components/QuizControls";
import  "./App.css"


function App() {
  const { theme, toggleTheme } = useTheme();
  const [questionArray, setQuestionArray] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [level, setLevel] = useState("easy");
  const [category, setCategory] = useState("9");
  const [timer, setTimer] = useState(30);
  const [manualTime, setManualTime] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=5&type=multiple&difficulty=${level}&category=${category}`
      );
      const data = await response.json();
      if (!data.results) throw new Error("No questions received");

      const formattedQuestions = data.results.map((item) => {
        const randomIndex = Math.floor(Math.random() * 4);
        const answers = item.incorrect_answers.map((answer) => ({
          answer,
          isCorrect: false,
          isSelected: false,
        }));
        answers.splice(randomIndex, 0, {
          answer: item.correct_answer,
          isCorrect: true,
          isSelected: false,
        });
        return { question: item.question, answers };
      });

      setQuestionArray(formattedQuestions);
      setIsLoading(false);
      setTimer(manualTime);
      setQuizStarted(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0 && quizStarted && !isGameOver) {
      const countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer, isGameOver, quizStarted]);

  function updateAnswers(questionIndex, answerIndex) {
    setQuestionArray((prevQuestions) =>
      prevQuestions.map((question, qIdx) =>
        qIdx === questionIndex
          ? {
              ...question,
              answers: question.answers.map((answer, aIdx) => ({
                ...answer,
                isSelected: aIdx === answerIndex,
              })),
            }
          : question
      )
    );
  }

  function gameOver() {
    setIsGameOver(true);
    const score = questionArray.reduce((total, question) =>
      total + question.answers.filter((ans) => ans.isSelected && ans.isCorrect).length, 0
    );
    setCorrectAnswers(score);
  }

  function playAgain() {
    setQuestionArray([]);
    setIsGameOver(false);
    setCorrectAnswers(0);
    setQuizStarted(false);
  }

  return (
    <main className={`flex flex-col items-center p-10 rounded-xl shadow-lg transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <button onClick={toggleTheme} className="absolute top-5 right-5 p-2 bg-gray-700 text-white rounded hover:bg-gray-500 transition-all">
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
      <h1 className="text-4xl font-extrabold text-[#293264] mb-6">Quizzical</h1>
      {!quizStarted && (
        <QuizControls 
          setLevel={setLevel} 
          setCategory={setCategory} 
          setManualTime={setManualTime} 
          fetchQuestions={fetchQuestions} 
        />
      )}
      {isLoading && <ColorRing visible={true} height="80" width="80" />} 
      {quizStarted && (
        <>
          <h3 className="text-lg font-bold">⏳ Time Left: {timer}s</h3>
          {questionArray.map((item, qIdx) => (
            <Question key={qIdx} questionIndex={qIdx} question={item.question} answers={item.answers} updateAnswers={updateAnswers} isGameOver={isGameOver} />
          ))}
          {isGameOver ? (
            <ScoreCard correctAnswers={correctAnswers} totalQuestions={questionArray.length} playAgain={playAgain} />
          ) : (
            <button onClick={gameOver} className="bg-green-500 text-white px-5 py-3 rounded-lg font-bold hover:bg-green-700 mt-4 transition-all">
              Check Answers
            </button>
          )}
        </>
      )}
    </main>
  );
}

export default App;
