import React, {useState, useEffect} from 'react'
import Answer from './Answer'

function Question(props) {
  const [answersArray, setAnswersArray] = useState(props.answers)

  function handleClick(answerId){
    setAnswersArray(prevArray => prevArray.map(item => item.answer === answerId ? {...item, isHold: !item.isHold} : {...item, isHold: false}))
  }

  useEffect(() => {
    props.updateAnswers(answersArray)

  }, [answersArray])
  

  const answersElements = answersArray.map(item => 
                  <Answer key={item.answer} id={item.answer} answer={item.answer} isCorrect={item.isCorrect} isHold={item.isHold} handleClick={handleClick} isGameOver={props.isGameOver}/>)
  return (
    <>
        <div className='my-[0.75rem] w-full'>
            <h2 className='text-[#293264] text-md font-semibold'>{props.question}</h2>
            <div className='flex mb-3 cursor-pointer flex-wrap'>
                {answersElements}
            </div>
            <hr />
        </div>

    </>
  )
}

export default Question