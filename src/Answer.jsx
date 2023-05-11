import React from 'react'

function Answer(props) {
  return (
    <div className={`${props.isGameOver ? (props.isCorrect ? "bg-[#94D7A2]" : (props.isHold && !props.isCorrect ? "bg-[#F8BCBC]" : "")) : props.isHold ? "bg-[#D6DBF5]" : ""} 
                      border-solid border-[2px] border-[#4D5B9E] text-[#4D5B9E] font-semibold px-4 py-2 my-3 rounded-xl mr-10 sm:hover:bg-[#D6DBF5]`}
        onClick={() => !props.isGameOver ? props.handleClick(props.id) : ""}
    >
        {props.answer}
    </div>
  )
}
export default Answer