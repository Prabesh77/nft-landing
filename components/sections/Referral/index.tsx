import DepositHistory from "../DepositHistory"
import DirectReferral from "./DirectReferral"
import classes from "./Referral.module.scss"
import ReferralBanner from "./ReferralBanner"

const Referral = ({ 
  state, networks, dispatch, totalInfo, userInfo
 }) => {
  return (
    <div>
      <ReferralBanner
        state={state}
        networks={networks}
        dispatch={dispatch}
        totalInfo={totalInfo}
        userInfo={userInfo}
         />
      <DirectReferral
        state={state}
        networks={networks}
        dispatch={dispatch}
        userInfo={userInfo}
        totalInfo={totalInfo}  />
    </div>
  )
}

export default Referral
