import classes from '../css/MacroProgressCard.module.css'

const ProgressBar = ({percentage, color = "gray"}) => {
    return (
        <div className={classes.progressBarContainer}>
            <div 
                className={classes.progressBar}
                style={{
                    width: `${Math.min(100, Math.max(0, percentage))}%`,
                    backgroundColor: color
                }}
                
            >
            </div>
        </div>
    )
}

const MacroProgressCard = () => {
  return (
    <div className={classes.macroProgressCard}>
      <section>
        <label>Protein</label>
        <ProgressBar percentage={75} />
      </section>
      <section>
        <label>Carbohydrates</label>
        <ProgressBar percentage={75}/>
      </section>
      <section>
        <label>Fats</label>
        <ProgressBar percentage={75} />
      </section>
    </div>
  )
}

export default MacroProgressCard
