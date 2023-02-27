import React, { useEffect, useState } from "react"
import Link from "next/link"
import Web3 from "web3"
import { useWeb3React } from "@web3-react/core"
import ClaimRewards from "../ClaimRewards"
import Income from "../Income"
import classes from "./Auction.module.scss"
import { getWalletAddressEllipsis, isValidAddress } from "utils/common"
import { toFixed } from "utils/number"
import BigNumber from "bignumber.js"
import { checkProperties } from "ethers/lib/utils"
import TxLoader from "../../TxLoader/TxLoader"
import TxModal from "../../TxModal/index"
import { useRouter } from "next/router"
import { useYieldClubContract } from "hooks/useContract"
import toast from "react-hot-toast"
import { ConsoleSqlOutlined } from "@ant-design/icons"
import { addresses } from "utils/constants"

const REFERRER_KEY = "REFERRER_ID"

const Auction = ({
  state,
  networks,
  dispatch,
  totalInfo,
  userInfo,
  connectWallet,
}) => {
  const [stakeTab, setStakeTab] = useState(0)
  const [stakeValue, setStakeValue] = useState(1)
  const [stakeActionValue, setStakeActionValue] = useState("")
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

  const [maxedOut, setMaxedOut] = useState(false)

  return (
    <>
      <div className={classes.banner_wrapper}>
        <div className={classes.banner_container}>
          <div className={classes.row_one}>
            <div className={classes.left}>
              <div className={classes.label}>Auction In Progress</div>
              <h2>$.97</h2>
              <span>10:00 Until Price Reduction</span>
            </div>
          </div>

          <div className={classes.stake}>
            <p className={classes.title}>Pending Bid</p>
            <div className={classes.stats}>
              <div className={classes.left}>
                <div className={classes.circle}>
                  <img src="/green_coin.svg" alt="" />
                </div>
                <h3>12,372</h3>
                <span className={classes.minor}>($3,000.16)</span>
              </div>
            </div>
          </div>

          <div className={classes.rewards}>
            <p className={classes.title}>Make A Bid</p>
            <form
              className={`${classes.stake_action_form} ${
                maxedOut || stakeActionValue == "12000" ? classes.maxed : ""
              } `}
            >
              <input
                type="number"
                min="0"
                max="12000"
                value={maxedOut ? 12000 : stakeActionValue}
                onChange={(e) => {
                  setStakeActionValue(e.target.value)
                }}
                placeholder="Input Fill Text"
              />

              <div className={classes.buttons}>
                <span onClick={() => setMaxedOut(true)}>Max</span>
              </div>
            </form>
            <div className={classes.stats}>
              <div className={classes.left}>
                <p>You Receive</p>
              </div>
              <div className={classes.right}>
                <div className={classes.circle}>
                  <img src="/green_coin.svg" alt="" />
                </div>
                <h3>12,372</h3>
                <span className={classes.minor}>($0)</span>
              </div>
            </div>
            <button className={classes.place_bid_btn}>Place Bid</button>
          </div>
        </div>
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

export default Auction
