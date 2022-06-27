import Auction from "components/sections/Auction"

const auction = ({
  state,
  networks,
  dispatch,
  totalInfo,
  userInfo,
  connectWallet,
}) => {
  return (
    <div>
      <Auction
        state={state}
        networks={networks}
        dispatch={dispatch}
        totalInfo={totalInfo}
        userInfo={userInfo}
        connectWallet={connectWallet}
      />
    </div>
  )
}

export default auction
