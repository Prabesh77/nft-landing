import classes from "./Referral.module.scss"

const DirectReferral = ({ state, networks, dispatch, totalInfo, userInfo }) => {
  const levels = Array.from(Array(20).keys())
  return (
    <div className={classes.referral_wrapper}>
      <div className={classes.referral_container}>
        <div className={classes.left}>
          {" "}
          <h2 className={classes.title}>Direct Referral: 13%</h2>
          <div className={classes.levels_grid}>
            {levels?.map((level) => (
              <LevelBox
                key={level}
                level={{
                  level: level + 1,
                  value: userInfo?.getUserDownlineCount
                    ? userInfo?.getUserDownlineCount[level]
                    : 0,
                }}
              />
            ))}
          </div>
        </div>
        <div className={classes.right}>
          <h2 className={classes.title}>Match Bonus:</h2>
          <div className={classes.levels_grid}>
            {levels?.map((level) => (
              <LevelRow
                key={level}
                level={{
                  level: level + 1,
                  value: totalInfo?.getMatchBonuses
                    ? totalInfo?.getMatchBonuses[level]
                    : 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const LevelBox = ({ level }) => {
  return (
    <div className={classes.level} key={level.level}>
      <span className={classes.value}>{level.value}</span>
      <span className={classes.label}>Level {level.level}</span>
    </div>
  )
}

const LevelRow = ({ level }) => {
  return (
    <div className={classes.level} key={level.level}>
      <span className={classes.label}>Level {level.level}</span>
      <span className={classes.value}>{level.value}</span>
    </div>
  )
}

export default DirectReferral
