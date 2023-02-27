import Link from "next/link"
import classes from "./HowToJoin.module.scss"
const HowToJoin = () => {
  return (
    <>
      <div className={classes.banner_wrapper}>
        <div className={classes.banner_container}>
          <div className={classes.left}>
            <h1>
              <span>The first 100%</span> <span>decentralized and audited</span>{" "}
              <span>community fund</span>
            </h1>
            <p>
              A smart contract is a self-executing contract that has a
              pre-programmed algorithm and is deployed in a publicly accessible
              blockchain network, a smart contract can store value and execute
              transfers when the contract conditions are met.
            </p>
          </div>

          <div className={classes.right}>
            <h1>BNB</h1>
            <div className={classes.dots}>
              <img src="/assets/dots.png" alt="" />
            </div>
          </div>
        </div>
        <div className={classes.features_wrapper}>
          <h2 className={classes.title}>It has features such as:</h2>
          <div className={classes.features_container}>
            <FeatureBox
              desc="invariability, protection against hacking, fairness, honesty, complete transparency and its audited! So there are no backdoors coded."
              id={1}
            />
            <FeatureBox
              desc="It operates strictly in accordance with pre-written contract rules, no less, no more. Smart contract is 100% decentralized, which means that there is no possibility of management on the part of the company or contract control body."
              id={2}
            />
            <FeatureBox
              desc="It cannot be stopped, it cannot be shut down and you cannot be excluded from the program."
              id={3}
            />
            <FeatureBox
              desc="There are no restrictions on what the smart contract algorithm can do. It exists only to simply perform the actions for which it was programmed, when the contract conditions are met, without the need for intervention by a third party or person."
              id={4}
            />
          </div>
        </div>
      </div>
      <div className={classes.compensation_wrapper}>
        <div className={classes.compensation_container}>
          <div className={classes.left}>
            {" "}
            <h2 className={classes.title}>Compensation plan - How it works?</h2>
            <p>
              You can participate in YieldClub by depositing a minimum of 0.05
              BNB to the Fund, you are now eligable to receive 280% back!
            </p>
            <p>
              The 280% is returned in 4 ways (1 passive and 3 via marketing) and
              when the 280% is accumulated through any of the 4 ways, a new
              deposit must be made 1,5x or greater to continue receiving from
              the fund.
            </p>
            <div className={classes.info_points}>
              <div className={classes.info_bar}>
                1. 0.7% return on your Deposit (maximum 400 days) 100% Passive.
              </div>
              <div className={classes.info_bar}>
                2. 13% Direct referral commission for sharing and growing the community fund.
              </div>
              <div className={classes.info_bar}>
                3. Matching commission on partners daily income every time they make a withdrawal
              </div>
              <div className={classes.info_bar}>
                4. Daily reward Pool 3% from each deposit to Top refferrer Pool (30%, 20%, 15%, 10%, 10%, 5%, 5%, 5% to Top referrers). PEAK burn pool 2% from each deposit and 8% from each withdrawal.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.limits_wrapper}>
        <div className={classes.limits_container}>
          <h2 className={classes.title}>Minimum and maximum deposit limits</h2>
          <div className={classes.more_info}>
            <ul className={classes.bullet_points}>
              <div className={classes.vertical_line}></div>
              <li>
                {/* <img src="/assets/checkmark.svg" alt="" /> */}
                <div className={classes.timeline}>
                  <div className={classes.circle}>
                    <div className={classes.circle_filled}></div>
                  </div>
                </div>
                <p>
                  1st cycle, minimum deposit 0.05 BNB, up to 30 BNB.
                </p>
              </li>
              <li>
                {/* <img src="/assets/checkmark.svg" alt="" /> */}
                <div className={classes.timeline}>
                  <div className={classes.circle}>
                    <div className={classes.circle_filled}></div>
                  </div>
                </div>
                <p>2nd cycle, 1,5x or greater than previous deposit, up to 60 BNB.</p>
              </li>
            </ul>
            <ul className={classes.bullet_points}>
              <div className={classes.vertical_line}></div>
              <li>
                {/* <img src="/assets/checkmark.svg" alt="" /> */}
                <div className={classes.timeline}>
                  <div className={classes.circle}>
                    <div className={classes.circle_filled}></div>
                  </div>
                </div>
                <p>
                  3rd cycle, 1,5x or greater than previous deposit, up to 180 BNB.
                </p>
              </li>
              <li>
                {/* <img src="/assets/checkmark.svg" alt="" /> */}
                <div className={classes.timeline}>
                  <div className={classes.circle}>
                    <div className={classes.circle_filled}></div>
                  </div>
                </div>
                <p>4th cycle and beyond, 1,5x or greater than previous deposit, up to 350 BNB.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Next steps */}
      <div className={classes.nextstep_wrapper}>
        <div className={classes.nextstep_container}>
          <h2 className={classes.title}>
            What are the next steps? How to start?
          </h2>
          <div className={classes.step_box_wrapper}>
            <div className={classes.step_box}>
              <span>01</span>
              <p>
                Create or import your Metamask wallet on your device (iOS or
                Android) or use it as a chrome extension.
              </p>
            </div>
            <div className={classes.step_box}>
              <span>02</span>
              <p>
                If you have no BNB, then buy them on exchanges like
                Binance.com, Kraken.com, Coinbase.com.
              </p>
            </div>
            <div className={classes.step_box}>
              <span>03</span>
              <p>
                Enter yieldclub.net with the Reflink and
                start to invest!
              </p>
            </div>
          </div>
          <Link href="/">
            <button className={classes.stake_btn}>Stake Now</button>
          </Link>
        </div>
      </div>
    </>
  )
}

const FeatureBox = ({ desc, id }) => {
  return (
    <div className={classes.feature_box}>
      <p>{desc}</p>
      <div className={classes.icon}>
        <img src="/assets/bold_arrow.png" alt="" />
        <span>{id}</span>
      </div>
    </div>
  )
}

export default HowToJoin
