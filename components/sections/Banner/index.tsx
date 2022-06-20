import React, { useEffect, useState } from "react"
import Link from "next/link"
import Web3 from "web3"
import { useWeb3React } from "@web3-react/core"
import ClaimRewards from "../ClaimRewards"
import Income from "../Income"
import classes from "./Banner.module.scss"
import { getWalletAddressEllipsis, isValidAddress } from "utils/common"
import { toFixed } from "utils/number"
import BigNumber from "bignumber.js"
import { checkProperties } from "ethers/lib/utils"
import RemainingSecs from "./RemainingSecs"
import TxLoader from "../../TxLoader/TxLoader"
import TxModal from "../../TxModal/index"
import { useRouter } from "next/router"
import { useYieldClubContract } from "hooks/useContract"
import toast from "react-hot-toast"
import { ConsoleSqlOutlined } from "@ant-design/icons"
import { addresses } from "utils/constants"

const REFERRER_KEY = "REFERRER_ID"

const Banner = ({
  state,
  networks,
  dispatch,
  totalInfo,
  userInfo,
  connectWallet,
}) => {
  const [stakeValue, setStakeValue] = useState(1)
  const [loading, setLoading] = useState(false)
  const [assetInfo, setAssetInfo] = useState({ symbol: "yieldclub" })
  const router = useRouter()
  const tokenContract = useYieldClubContract()

  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React()

  useEffect(() => {
    if (typeof window !== "undefined" && router?.query?.r) {
      localStorage.setItem(REFERRER_KEY, `${router?.query?.r}`)
    }
  }, [])
  const owner = addresses[chainId]?.Owner

  const getReferrer = () => {
    return isValidAddress(localStorage.getItem(REFERRER_KEY))
      ? localStorage.getItem(REFERRER_KEY)
      : owner
  }

  const poolDistribution_ = totalInfo?.contractInfo
    ? new BigNumber(totalInfo?.contractInfo[4])
    : new BigNumber(0)
  const poolDistribution = totalInfo?.contractInfo
    ? toFixed(Web3.utils.fromWei(poolDistribution_.div(10).toString(10)), 4)
    : 0

  let remainingSecs = 0
  let checkpoint = totalInfo?.contractInfo
    ? Number(totalInfo?.contractInfo[3])
    : 0
  checkpoint += 86400 // unix timestamp seconds
  const curTime = Math.floor(Date.now() / 1000)
  if (curTime <= checkpoint) remainingSecs = checkpoint - curTime

  let referralId = account ? getWalletAddressEllipsis(account, 5, 3) : ""

  const toWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).times(10 ** decimals).toString(10)
      : Web3.utils.toWei(value, "ether")

  const { transactions, requests } = state
  const transactionMap = transactions.reduce(
    ([stakes], [hash, type, ...args]) => {
      const transaction = {
        stakes: {},
      }
      switch (type) {
        case "buy":
          transaction.stakes[args[0]] = hash
          break
        default:
          break
      }
      return [{ ...stakes, ...transaction.stakes }]
    },
    new Array(4).fill({})
  )
  const handleTransaction =
    (type, ...args) =>
    (transaction, callback = () => {}) => {
      dispatch({
        type: "txRequest",
        payload: [type, true, ...args],
      })
      transaction
        .on("transactionHash", function (hash) {
          dispatch({
            type: "txHash",
            payload: [hash, false, type, ...args],
          })
        })
        .on("receipt", function (receipt) {
          dispatch({
            type: "txHash",
            payload: [receipt.transactionHash, true, type, callback()],
          })
        })
        .on("error", (err, receipt) => {
          if (err && err.message) {
            console.log(err.message)
          }
          if (receipt) {
            dispatch({
              type: "txHash",
              payload: [receipt.transactionHash, true, type],
            })
          } else {
            dispatch({
              type: "txRequest",
              payload: [type, false, ...args],
            })
          }
        })
    }

  const handleStake = async () => {
    if (!library) return null
    else if (!account) {
      connectWallet()
    } else {
      setAssetInfo({ symbol: "yieldclub" })
      const transaction = tokenContract?.methods?.deposit(getReferrer())
      handleTransaction("buy", "yieldclub")(
        transaction.send({
          from: account,
          value: toWei(stakeValue.toString(), 18),
        }),
        () => {}
      )
    }
  }

  const handleClaim = async () => {
    if (!library) return null
    else if (!account) {
      connectWallet()
    } else {
      setAssetInfo({ symbol: "yieldclub" })
      const transaction = tokenContract?.methods?.withdraw()
      handleTransaction("buy", "yieldclub")(
        transaction.send({
          from: account,
        }),
        () => {}
      )
    }
  }

  return (
    <>
      <div className={classes.banner_wrapper}>
        <div className={classes.banner_container}>
          <div className={classes.left}>
            <h1>YieldClub</h1>
            <h3>is a Community Driven Yield Fund Based On BNB Smart Chain</h3>
            <ul className={classes.bullet_points}>
              <li>
                <img src="/assets/checkmark.svg" alt="" />
                <p>
                  Earn Every Second & Withdraw Every 24 hours With YieldClub.
                </p>
              </li>
              <li>
                <img src="/assets/checkmark.svg" alt="" />
                <p>Benefit From 4 Different Ways of Income.</p>
              </li>
              <li>
                <img src="/assets/checkmark.svg" alt="" />
                <p>YieldClub is the Most Profitable Yield Fund on BSC.</p>
              </li>
              <li>
                <img src="/assets/checkmark.svg" alt="" />
                <p>Become Part Of The Movement Today.</p>
              </li>
            </ul>
            <ul className={classes.stats}>
              <li>
                <span className={classes.label}>Total Staked BNB</span>
                <p>
                  {totalInfo?.contractInfo?.length
                    ? toFixed(Web3.utils.fromWei(totalInfo?.contractInfo[1]), 4)
                    : 0}
                </p>
              </li>
              <li>
                <span className={classes.label}>Total Active Users</span>
                <p>
                  {totalInfo?.contractInfo?.length
                    ? totalInfo?.contractInfo[0]
                    : 0}
                </p>
              </li>
              <li>
                <span className={classes.label}>Top Leader Pool Balance</span>
                <p>
                  {totalInfo?.contractInfo?.length
                    ? toFixed(Web3.utils.fromWei(totalInfo?.contractInfo[4]), 4)
                    : 0}
                </p>
              </li>
            </ul>
          </div>

          <div className={classes.right}>
            <div className={classes.join_box}>
              <h3>Until Reward Distribution :</h3>
              <RemainingSecs totalInfo={totalInfo} />
              <li className={classes.count}>
                <span>{poolDistribution} BNB</span> to be distributed today.
              </li>
              <h2 className={classes.join_title}>Join Now</h2>
              <div className={classes.join_form}>
                <input
                  type="number"
                  value={stakeValue}
                  onChange={(e) => setStakeValue(+e.target.value)}
                />
                <div className={classes.add_buttons}>
                  <button onClick={() => setStakeValue(stakeValue + 1)}>
                    +1 BNB
                  </button>
                  <button onClick={() => setStakeValue(stakeValue + 5)}>
                    +5 BNB
                  </button>
                  <button onClick={() => setStakeValue(stakeValue + 10)}>
                    +10 BNB
                  </button>
                  <button onClick={() => setStakeValue(stakeValue + 50)}>
                    +50 BNB
                  </button>
                  <button onClick={() => setStakeValue(stakeValue + 100)}>
                    +100 BNB
                  </button>
                  <button onClick={() => setStakeValue(stakeValue + 200)}>
                    +200 BNB
                  </button>
                </div>
                <div className={classes.buttons}>
                  <button
                    className={`${classes.stake_btn} ${
                      stakeValue <= 0 ? classes.stake_disabled : ""
                    } `}
                    onClick={() => handleStake()}
                  >
                    Stake Now
                  </button>
                  <button className={classes.guide_btn}>Guide</button>
                </div>
              </div>
              <div className={classes.join_footer}>
                <p>Referral Id:</p>
                <p>{referralId}</p>
              </div>
            </div>
            <img src="/assets/dots.png" alt="" className={classes.dots} />
          </div>
        </div>
        {/* <Income /> */}
        <ClaimRewards
          totalInfo={totalInfo}
          userInfo={userInfo}
          handleClaim={handleClaim}
        />
      </div>
      {/* {loading && <TxLoader />} */}

      <TxModal
        network={chainId}
        pending={assetInfo && requests.buy === assetInfo.symbol}
        disabled={assetInfo && transactionMap[0][assetInfo.symbol]}
        onClose={() => setAssetInfo(null)}
      />
    </>
  )
}

export default Banner
