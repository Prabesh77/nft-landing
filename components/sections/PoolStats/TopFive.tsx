import DepositHistory from "../DepositHistory"
import classes from "./PoolStats.module.scss"
import { ZERO, poolBonuses, NETWORKS } from "utils/constants"
import Web3 from "web3"
import { toFixed } from "utils/number"
import { bscLink, getWalletAddressEllipsis } from "utils/common"

const TopFive = ({ state, networks, dispatch, totalInfo, userInfo }) => {
  const topLeaders = Array.from(Array(8).keys()).map((idx) => {
    return {
      sn: idx + 1,
      username:
        totalInfo?.poolTopInfo && totalInfo?.poolTopInfo[0][idx]
          ? totalInfo?.poolTopInfo[0][idx]
          : ZERO,
      deposit:
        totalInfo?.poolTopInfo && totalInfo?.poolTopInfo[1][idx]
          ? toFixed(Web3.utils.fromWei(totalInfo?.poolTopInfo[1][idx]), 4)
          : 0,
      percent: poolBonuses[idx] / 100,
    }
  })

  return (
    <div className={classes.topfive_wrapper}>
      <div className={classes.topfive_container}>
        <h2 className={classes.title}>Top 8 ULTRA Leaders</h2>{" "}
        <p>
          This bonus is exclusively for the top 8 daily highest contributors
          towards YIELDCLUB’s Yield Fund.
        </p>
        <div className={classes.table_holder}>
          <table>
            <thead>
              <tr>
                <td>Top 8</td>
                <td>User Name</td>
                <td>Deposit</td>
                <td>Percent</td>
              </tr>
            </thead>
            <tbody>
              {topLeaders.map((o) => (
                <LeaderInfo
                  sn={o.sn}
                  username={o.username}
                  deposit={`${o.deposit} BNB`}
                  percent={o.percent}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
        </ul>
      </div>
      <DepositHistory />
    </div>
  )
}

const LeaderInfo = ({ sn, username, deposit, percent }) => {
  return (
    <tr>
      <td>{sn}.</td>
      <td>
        <a
          href={`${bscLink}/address/${username}`}
          target="_blank"
          rel="noreferrer"
        >
          {getWalletAddressEllipsis(username)}
        </a>
      </td>
      <td>{deposit}</td>
      <td>{percent}%</td>
    </tr>
  )
}

export default TopFive
