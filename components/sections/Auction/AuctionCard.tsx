import classes from "./Auction.module.scss"
const AuctionCard = () => {
  return (
    <div className={classes.auction_card}>
      <div className={classes.left}>
        <div className={classes.value}>
          <div className={classes.circle}>
            <img src="/green_coin.svg" alt="" />
          </div>
          <h3>12,372</h3>
          <span className={classes.minor}>($3,000.16)</span>
        </div>
        <p className={classes.end_price}>End Price: $0.63</p>
      </div>
      <div className={classes.right}>
        <button>Claim YSD</button>
        <p className={classes.date}>00:24:00 9/12/22</p>
      </div>
    </div>
  )
}

export default AuctionCard
