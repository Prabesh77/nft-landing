import React, { useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import classes from "./ClaimRewards.module.scss"
import { HiLocationMarker } from "react-icons/hi"
import Web3 from "web3"
import BigNumber from "bignumber.js"
import { toFixed } from "utils/number"
import { poolBonuses } from "utils/constants"

const ClaimRewards = ({ totalInfo, userInfo, handleClaim }) => {
  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React()

  const totalAvailable = userInfo?.getUserAvailable
    ? toFixed(Web3.utils.fromWei(userInfo?.getUserAvailable.toString(10)), 4)
    : 0
  const withdrawLimit = userInfo?.userInfo2
    ? toFixed(Web3.utils.fromWei(userInfo?.userInfo2[0].toString(10)), 4)
    : 0
  const turnOver = userInfo?.userInfo2
    ? toFixed(Web3.utils.fromWei(userInfo?.userInfo2[1].toString(10)), 4)
    : 0
  const totalDeposits = userInfo?.userInfoTotals
    ? toFixed(Web3.utils.fromWei(userInfo?.userInfoTotals[1].toString(10)), 4)
    : 0
  const totalWithdraw = userInfo?.userInfoTotals
    ? toFixed(Web3.utils.fromWei(userInfo?.userInfoTotals[2].toString(10)), 4)
    : 0
  const payout = userInfo?.userInfoTotals
    ? toFixed(Web3.utils.fromWei(userInfo?.userInfoTotals[6].toString(10)), 4)
    : 0
  const directIncome = userInfo?.userInfo
    ? toFixed(Web3.utils.fromWei(userInfo?.userInfo[4].toString(10)), 4)
    : 0
  const poolBonus = userInfo?.userInfo
    ? toFixed(Web3.utils.fromWei(userInfo?.userInfo[5].toString(10)), 4)
    : 0
  const matchBonus = userInfo?.userInfo
    ? toFixed(Web3.utils.fromWei(userInfo?.userInfo[6].toString(10)), 4)
    : 0

  const poolDistribution_ = totalInfo?.contractInfo
    ? new BigNumber(totalInfo?.contractInfo[4])
    : new BigNumber(0)
  const getSponsorReward = () => {
    let reward_ = new BigNumber(0)
    if (totalInfo?.poolTopInfo) {
      const rid_ = totalInfo?.poolTopInfo[0].findIndex((o) => o === account)

      if (rid_ >= 0 && rid_ < poolBonuses.length) {
        reward_ = poolDistribution_
          .div(10)
          .multipliedBy(poolBonuses[rid_])
          .dividedBy(10000)
      }
    }
    return toFixed(Web3.utils.fromWei(reward_.toString(10)), 4)
  }

  return (
    <div className={classes.claimRewards_wrapper}>
      <div className={classes.claimRewards_container}>
        <h2 className={classes.title}>Claim Rewards</h2>
        {/* <div className={classes.address_bar}>
          <div className={classes.left}>
            <p>
              <HiLocationMarker className={classes.icon} />
              Your Address:
            </p>
          </div>
          <input className={classes.right} />
        </div> */}
        <div className={classes.withdrawable_income}>
          <div className={classes.left}>
            <p>
              <img src="/assets/coin.png" alt="" />
              Total Available:
            </p>
            <p>{totalAvailable} BNB</p>
          </div>
          <button
            className={`${classes.right} ${classes.stake_btn} ${
              new BigNumber(totalAvailable).gt(0) ? "" : classes.btn_disabled
            } `}
            onClick={() => handleClaim && handleClaim()}
          >
            Claim
          </button>
        </div>
        <div className={classes.rewards_wrapper}>
          <div className={classes.rewards_left}>
            <div className={classes.stat_bar}>
              <div className={classes.stat_left}>280% Income Limit Remain</div>
              <div className={classes.stat_right}>{payout} BNB</div>
            </div>
            <div className={classes.stat_bar}>
              <div className={classes.stat_left}>Daily Income 0.7%</div>
              <div className={classes.stat_right}>{poolBonus} BNB</div>
            </div>
            <div className={classes.stat_bar}>
              <div className={classes.stat_left}>Direct Referral Income</div>
              <div className={classes.stat_right}>{directIncome} BNB</div>
            </div>
            <div className={classes.stat_bar}>
              <div className={classes.stat_left}>Matching Bonus</div>
              <div className={classes.stat_right}>{matchBonus} BNB</div>
            </div>
            <div className={classes.stat_bar}>
              <div className={classes.stat_left}>Top Sponsor Rewards</div>
              <div className={classes.stat_right}>{getSponsorReward()} BNB</div>
            </div>
          </div>
          <div className={classes.rewards_right}>
            <div className={classes.stat_bar}>
              <div className={classes.stat_left}>Total Deposit</div>
              <div className={classes.stat_right}>{totalDeposits} BNB</div>
            </div>
            <div className={classes.stat_bar}>
              <div className={classes.stat_left}>Total Withdraw</div>
              <div className={classes.stat_right}>{totalWithdraw} BNB</div>
            </div>
            <div className={classes.stat_bar}>
              <div className={classes.stat_left}>Limit Withdraw</div>
              <div className={classes.stat_right}>{withdrawLimit} BNB</div>
            </div>
            {/* <div className={classes.stat_bar}>
              <div className={classes.stat_left}>Hold Bonus</div>
              <div className={classes.stat_right}>0 %</div>
            </div> */}
            <div className={classes.stat_bar}>
              <div className={classes.stat_left}>Turnover</div>
              <div className={classes.stat_right}>{turnOver} BNB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClaimRewards
