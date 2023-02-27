import { useWeb3React } from "@web3-react/core"
import DirectReferral from "./DirectReferral"
import classes from "./Referral.module.scss"
import { CopyToClipboard } from "react-copy-to-clipboard"
import toast from "react-hot-toast"

const ReferralBanner = ({ state, networks, dispatch, totalInfo, userInfo }) => {
  const { account } = useWeb3React()
  let referralLink = ""
  let referralTxt = "You will get your ref link after investing"
  if (typeof window !== "undefined") {
    referralLink = window?.location?.origin || ""
  }
  if (account && userInfo?.userInfo && Number(userInfo?.userInfo[1]) > 0) {
    referralLink += `?r=${account}`
    referralTxt = referralLink
  }

  const handleCopy = () => {
    toast.success("Copied to clipboard!")
  }

  return (
    <div className={classes.banner_wrapper}>
      <div className={classes.banner_container}>
        <div className={classes.left}>
          <h1>Referral</h1>
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
                Set a unique username for your referral link – it looks cool and
                professional
              </p>
            </li>
            <li>
              {/* <img src="/assets/checkmark.svg" alt="" /> */}
              <div className={classes.timeline}>
                <div className={classes.circle}>
                  <div className={classes.circle_filled}></div>
                </div>
              </div>
              <p>Earn 13% direct commission on each direct partner.</p>
            </li>
            <li>
              {/* <img src="/assets/checkmark.svg" alt="" /> */}
              <div className={classes.timeline}>
                <div className={classes.circle}>
                  <div className={classes.circle_filled}></div>
                </div>
              </div>
              <p>
                Each direct ACTIVE partner unlocks 1 level of matching-bonus
                (active partner : min 0.05 BNB)
              </p>
            </li>
            <li>
              {/* <img src="/assets/checkmark.svg" alt="" /> */}
              <div className={classes.timeline}>
                <div className={classes.circle}>
                  <div className={classes.circle_filled}></div>
                </div>
              </div>
              <p>
                20 level matching-bonus will get unlocked as soon as you reach
                20 direct partner
              </p>
            </li>
          </ul>

          <div className={classes.actions}>
            <CopyToClipboard text={referralLink} onCopy={() => handleCopy()}>
              <button className={classes.left_action}>
                {referralTxt}
                <img src="/assets/copy.svg" />
              </button>
            </CopyToClipboard>
            {/* <button className={classes.set_btn}>Set Name</button> */}
          </div>
        </div>

        <div className={classes.right}>
          <img src="/assets/dots.png" alt="" className={classes.dots} />
          <div className={classes.box}>
            <div className={classes.left}>
              <img src="/assets/coin.png" alt="" />
            </div>
            <div className={classes.right}>
              <div className={classes.label}>Direct Invited</div>
              <div className={classes.value}>
                {userInfo?.userInfoTotals ? userInfo?.userInfoTotals[0] : 0}
              </div>
            </div>
          </div>
          <div className={classes.box}>
            <div className={classes.left}>
              <img src="/assets/coin.png" alt="" />
            </div>
            <div className={classes.right}>
              <div className={classes.label}>Total Team</div>
              <div className={classes.value}>
                {userInfo?.userInfoTotals ? userInfo?.userInfoTotals[3] : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReferralBanner
