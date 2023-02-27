import DepositHistory from "../DepositHistory"
import classes from "./PoolStats.module.scss"
import StatsBanner from "./StatsBanner"
import TopFive from "./TopFive"

const PoolStats = ({ 
  state, networks, dispatch, totalInfo, userInfo
 }) => {
  return (
    <div>
      <StatsBanner
        state={state}
        networks={networks}
        dispatch={dispatch}
        totalInfo={totalInfo}
        userInfo={userInfo}
       />
      <TopFive
        state={state}
        networks={networks}
        dispatch={dispatch}
        totalInfo={totalInfo}
        userInfo={userInfo} />
    </div>
  )
}

export default PoolStats
