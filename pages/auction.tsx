import Auction from "components/sections/Auction"
import NoAuction from "components/sections/Auction/NoAuction"

const AuctionPage = ({
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
      <NoAuction />
    </div>
  )
}

export default AuctionPage
