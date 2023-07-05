import React from 'react'

export default function StartButton({ onStartClick }) {

  return (
    <button onClick={onStartClick} className='button timer__button'><i className="fas fa-play"></i><span>Start</span></button>
  )
}
