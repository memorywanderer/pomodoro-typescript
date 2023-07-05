import React from 'react'

export default function ResetButton({ onResetClick }) {
  return (
    <button onClick={onResetClick} className='button timer__button'><i className="fas fa-sync-alt"></i><span>Reset</span></button>
  )
}
