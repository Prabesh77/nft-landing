import Banner from "components/sections/Banner"
import DepositHistory from "components/sections/DepositHistory"
import Disclaimer from "components/sections/Disclaimer"
import Features from "components/sections/Features"
import PersonalStats from "components/sections/PersonalStats"
import TronIncomeStats from "components/sections/TronIncomeStats"

const index = ({
  state,
  networks,
  dispatch,
  totalInfo,
  userInfo,
  connectWallet,
}) => {
  return (
    <div>
      <Banner
        state={state}
        networks={networks}
        dispatch={dispatch}
        totalInfo={totalInfo}
        userInfo={userInfo}
        connectWallet={connectWallet}
      />
      {/* <PersonalStats /> */}
      {/* <TronIncomeStats /> */}
      {/* <DepositHistory /> */}
      {/* <Features /> */}
    </div>
  )
}

export default index
