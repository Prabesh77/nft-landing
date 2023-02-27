import classes from "./TronIncomeStats.module.scss"
const TronIncomeStats = () => {
  return (
    <>
      <div className={classes.tron_stats_wrapper}>
        <div className={classes.tron_stats_container}>
          <h2 className={classes.title}>Tronincome Statistics</h2>
          <div className={classes.stats}>
            <div className={classes.stat}>
              <p className={classes.label}>Smart contract</p>
              <p className={classes.value}>TQJVr...cyrrs</p>
            </div>
            <div className={classes.stat}>
              <p className={classes.label}>Total Withdrawn:</p>
              <p className={classes.value}>TQJVr...cyrrs</p>
            </div>
            <div className={classes.stat}>
              <p className={classes.label}>Daily reward pool:</p>
              <p className={classes.value}>TQJVr...cyrrs</p>
            </div>
            <div className={classes.stat}>
              <p className={classes.label}>Contract balance:</p>
              <p className={classes.value}>TQJVr...cyrrs</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.tron_stats_wrapper_bottom}>
        <div className={classes.tron_stats_container}>
          <button>View Stats</button>
        </div>
      </div>
    </>
  )
}

export default TronIncomeStats
