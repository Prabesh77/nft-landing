import React, { useEffect, useState } from "react"
import Web3 from "web3"
import classes from "./PoolStats.module.scss"
import { addresses } from "utils/constants"
import { bscLink, getWalletAddressEllipsis } from "utils/common"
import { toFixed } from "utils/number"
import BigNumber from "bignumber.js"

const networkId = process.env.APP_ENV === "dev" ? 97 : 56

const StatsBanner = ({ state, networks, dispatch, userInfo, totalInfo }) => {
  const totalWithdraw = totalInfo?.contractInfo
    ? toFixed(Web3.utils.fromWei(totalInfo?.contractInfo[2]), 4)
    : 0
  const contractBalance = totalInfo?.getContractBalance
    ? toFixed(Web3.utils.fromWei(totalInfo?.getContractBalance), 4)
    : 0

  let dailyRewardPool_ = totalInfo?.yDayATH
    ? new BigNumber(totalInfo?.yDayATH).multipliedBy(70).dividedBy(10000)
    : new BigNumber(0)
  let dailyRewardPool = toFixed(
    Web3.utils.fromWei(dailyRewardPool_.toString(10)),
    4
  )

  return (
    <div className={classes.banner_wrapper}>
      <div className={classes.banner_container}>
        <div className={classes.left}>
          <h1>Pool Statistics</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla
            purus vulputate sit dolor id fringilla sed quis. Adipiscing id in ut
            neque. Egestas malesuada odio purus id. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Fringilla purus vulputate sit dolor id
            fringilla sed quis.
          </p>
        </div>

        <div className={classes.right}>
          <img src="/assets/dots.png" alt="" className={classes.dots} />
          <a
            href={`${bscLink}/address/${addresses[networkId].YieldClub}`}
            target="_blank"
            rel="noreferrer"
          >
            <StatsBox
              label="Smart Contract"
              value={getWalletAddressEllipsis(addresses[networkId].YieldClub)}
            />
          </a>
          <div></div>
          <StatsBox label="Total Withdrawn" value={`${totalWithdraw} BNB`} />
          <StatsBox
            label="Daily Reward Pool"
            value={`${dailyRewardPool} BNB`}
          />
          <div></div>
          <StatsBox label="Contract Balance" value={`${contractBalance} BNB`} />
        </div>
      </div>
    </div>
  )
}

const StatsBox = ({ label, value }) => {
  return (
    <div className={classes.box}>
      <div className={classes.arrow_holder}>
        <img src="/assets/custom_arrow.png" alt="" />
      </div>

      <div className={classes.label}>{label}</div>
      <div className={classes.value}>{value}</div>
    </div>
  )
}

export default StatsBanner
