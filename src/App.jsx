import {useEffect, useState} from 'react'
import './App.css'
import Question from './Question'
import { ColorRing } from 'react-loader-spinner'

function App() {
  const [questionArray, setQuestionArray] = useState([])
  const [isGameOver, setIsGameOver] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const decodeHTML = (html) => {
      const parser = new DOMParser()
      const decodedString = parser.parseFromString(`<!doctype html><body>${html}`, 'text/html').body.textContent
      return decodedString
    };
    if (!isGameOver) {
      setIsLoading(true)
      fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        .then((response) => response.json())
        .then((data) => {
          const returnArray = data.results.map((item) => {
            const randomNum = Math.floor(Math.random() * 4)
            const allAnswers = item.incorrect_answers.map((answer) => ({
              isCorrect: false,
              isHold: false,
              answer: decodeHTML(answer),
            }))
            allAnswers.splice(randomNum, 0, {
              isCorrect: true,
              isHold: false,
              answer: decodeHTML(item.correct_answer)
            })
            return { question: decodeHTML(item.question), allAnswers: allAnswers }
          })
          setQuestionArray(returnArray)
          setIsLoading(false)
        })
        .catch((error) => console.error(error))
    }
  }, [isGameOver])

  function updateAnswers(newAnswers){
    setQuestionArray(prevArray => prevArray.map(ansArray => ansArray.allAnswers[0].answer === newAnswers[0].answer ? {...ansArray, allAnswers: newAnswers} : ansArray))
  }

  function gameOver(){
    setIsGameOver(true)
    questionArray.forEach(question => question.allAnswers.forEach(answer => (answer.isHold === true && answer.isCorrect === true) ? setCorrectAnswers(prevState => prevState + 1) : ""))
  }

  function playAgain(){
    setQuestionArray([])
    setIsGameOver(false)
    setCorrectAnswers(0)
  }

  const questionElements = questionArray.map(item => 
  <Question key={item.question} question={item.question} answers={item.allAnswers} updateAnswers={updateAnswers} isGameOver={isGameOver}/> )
  return (
      <main className='flex flex-col sm:w-[70%] w-[95%] my-[2.5%] sm:my-10 mx-auto justify-center items-center bg-[#F5F7FB] p-10 rounded-3xl shadow-2xl'>
        <h1 className='text-3xl font-bold text-[#293264] mb-6'>Quizzical</h1>
        { isLoading 
          ? 
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#293264', '#293264', '#293264', '#293264', '#293264']}
            />
          : 
            <>
              {questionElements}
              {isGameOver 
              ?
              <div className='flex items-center'>
                <h2 className='mr-10 text-[#293264] text-md font-bold'>You scored {correctAnswers}/5 correct answers</h2>
                <button className="bg-[#4D5B9E] text-white px-4 py-2 mt-3 rounded-lg font-bold"
                        onClick={playAgain}
                >
                    Play Again
                </button>
              </div>
              :
              <button className="bg-[#4D5B9E] text-white px-4 py-2 mt-3 rounded-lg font-bold"
                      onClick={gameOver}
              >
                    Check Answers
              </button>
              }
            </>
        }
      </main>
    )
}

export default App
