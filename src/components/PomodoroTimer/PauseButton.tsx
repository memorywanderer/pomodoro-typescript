import React from 'react'

export default function PauseButton({ onPauseClick }) {
  return (
    <button onClick={onPauseClick} className='button timer__button'><i className="fas fa-pause"></i><span>Pause</span></button>
  )
}
