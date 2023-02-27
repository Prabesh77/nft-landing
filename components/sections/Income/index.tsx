import classes from "./Income.module.scss"

const Income = () => {
  return (
    <div className={classes.income_wrapper}>
      <div className={classes.income_container}>
        <h2 className={classes.title}>Unclaimed Income</h2>
        <div className={classes.withdrawable_income}>
          <div className={classes.left}>
            <p>
              <img src="/assets/coin.png" alt="" />
              Withdrawable Income:
            </p>
            <p>0.0000 BNB</p>
          </div>
          <button className={classes.right}>Withdraw</button>
        </div>
        <div className={classes.stats}>
          <div className={classes.stats_col}>
            <div className={classes.stat_title}>INCOME</div>
            <div className={classes.stat}>
              <span>Passive Income</span>
              <p>0.0000 BNB</p>
              <div className={classes.timeline}>
                <div className={classes.circle}>
                  <div className={classes.circle_filled}></div>
                </div>
              </div>
            </div>
            <div className={classes.stat}>
              <span>Passive Income</span>
              <p>0.0000 BNB</p>
              <div className={classes.timeline}>
                <div className={classes.circle}>
                  <div className={classes.circle_filled}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.stats_col}>
            <div className={classes.stat_title}>BONUS</div>
            <div className={classes.stat}>
              <span>Passive Income</span>
              <p>0.0000 BNB</p>
              <div className={classes.timeline}>
                <div className={classes.circle}>
                  <div className={classes.circle_filled}></div>
                </div>
              </div>
            </div>
            <div className={classes.stat}>
              <span>Passive Income</span>
              <p>0.0000 BNB</p>
              <div className={classes.timeline}>
                <div className={classes.circle}>
                  <div className={classes.circle_filled}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.stats_col}>
            <div className={classes.stat_title}>REWARD</div>
            <div className={classes.stat}>
              <span>Passive Income</span>
              <p>0.0000 BNB</p>
              <div className={classes.timeline}>
                <div className={classes.circle}>
                  <div className={classes.circle_filled}></div>
                </div>
              </div>
            </div>
            <div className={classes.stat}>
              <span>Passive Income</span>
              <p>0.0000 BNB</p>
              <div className={classes.timeline}>
                <div className={classes.circle}>
                  <div className={classes.circle_filled}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Income
