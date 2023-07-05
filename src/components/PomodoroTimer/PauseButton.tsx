type PauseButtonProps = {
  onPauseClick: () => void
}
export default function PauseButton({ onPauseClick }: PauseButtonProps) {
  return (
    <button onClick={onPauseClick} className='button timer__button'><i className="fas fa-pause"></i><span>Pause</span></button>
  )
}
