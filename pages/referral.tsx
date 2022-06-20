import Referral from "components/sections/Referral"

const referral = ({state, networks, dispatch, totalInfo, userInfo}) => {
  return <Referral 
  state={state}
  networks={networks}
  dispatch={dispatch}
  totalInfo={totalInfo}
  userInfo={userInfo}
  />
}

export default referral
