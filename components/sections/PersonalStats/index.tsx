import classes from "./PersonalStats.module.scss"
const PersonalStats = () => {
  return (
    <div className={classes.personal_stats_wrapper}>
      <div className={classes.personal_stats_container}>
        <div className={classes.left}>
          <h1>BNB</h1>
          <div className={classes.dots}>
            <img src="/assets/dots.png" alt="" />
          </div>
        </div>
        <div className={classes.right}>
          <h2>Personal Statistics</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla
            purus vulputate sit dolor id fringilla sed quis. Adipiscing id in ut
            neque. Egestas malesuada odio purus id. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <button>Join Now</button>
        </div>
      </div>
    </div>
  )
}

export default PersonalStats
