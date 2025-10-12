import '../css/ProgressRing.css'

const ProgressRing = () => {
  return (
    <div className='progressRing-container'>
      <div className="carbRing ring"></div>
      <div className="fatRing ring"></div>
      <div className="proteinRing ring"></div>
      <div className="calorieRing ring"></div>
    </div>
  )
}

export default ProgressRing
