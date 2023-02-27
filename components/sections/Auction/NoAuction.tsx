import classes from "./Auction.module.scss"
import AuctionCard from "./AuctionCard"
const NoAuction = () => {
  return (
    <div className={classes.banner_wrapper}>
      <div className={classes.banner_container}>
        <div className={classes.no_auction_content}>
          <div className={classes.top_content}>
            <h1>No Auction in Progress</h1>
            <p>
              Arbitrage Auctions are a dutch auction that allows for rapid price
              discovery on the risk premium for speculating on Malt returning to
              peg. The processes of speculators pricing this risk itself
              provides direct buying pressure on Malt that helps return it to
              peg.
            </p>
            <button>Learn about Auctions</button>
          </div>

          <div className={classes.auctions}>
            <p className={classes.auction_title}>Won Auctions</p>
            <AuctionCard />
            <AuctionCard />
            <AuctionCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoAuction
