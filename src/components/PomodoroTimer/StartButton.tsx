type StartButtonProps = {
  onStartClick: () => void
}

export default function StartButton({ onStartClick }: StartButtonProps) {

  return (
    <button onClick={onStartClick} className='button timer__button'><i className="fas fa-play"></i><span>Start</span></button>
  )
}
