import { bscLink } from "utils/common"
import classes from "./Disclaimer.module.scss"
import { addresses } from "utils/constants"

const networkId = process.env.APP_ENV === "dev" ? 97 : 56

const Disclaimer = () => {

  return (
    <div className={classes.disclaimer_wrapper}>
      <div className={classes.disclaimer_container}>
        <h2 className={classes.title}>Disclaimer:</h2>
        <p>
          This is an experimental community project, which means this project
          has high risks and high rewards. Once the contract balance drops to
          zero, all the payments will stop immediately. This project is
          decentralized and therefore it belongs to the community. Make a
          deposit at your own risk.
        </p>
      </div>
      <div className={classes.companies}>
        <div className={classes.companies_container}>
          <div className={classes.company}>
            <img src="/assets/companies/medium.png" alt="" />
          </div>
          <a href={`${bscLink}/address/${addresses[networkId].YieldClub}`} target="_blank" rel="noreferrer">
            <div className={classes.company}>
              <img src="/assets/companies/bsc.png" alt="" />
            </div>
          </a>

          <div className={classes.company}>
            <img src="/assets/companies/dapp.png" alt="" />
          </div>
          <div className={classes.company}>
            <img src="/assets/companies/dappradar.png" alt="" />
          </div>
          <div className={classes.company}>
            <img src="/assets/companies/haze.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
