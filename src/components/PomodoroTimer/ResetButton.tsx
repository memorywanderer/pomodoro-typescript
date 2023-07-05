type ResetButtonType = {
  onResetClick: () => void
}

export default function ResetButton({ onResetClick }: ResetButtonType) {
  return (
    <button onClick={onResetClick} className='button timer__button'><i className="fas fa-sync-alt"></i><span>Reset</span></button>
  )
}
