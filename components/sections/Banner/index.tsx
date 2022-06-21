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
  const [currentTab, setCurrentTab] = useState(0)
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

  return (
    <>
      <div className={classes.banner_wrapper}>
        <div className={classes.banner_container}>
          <div className={classes.row_one}>
            <div className={classes.left}>
              <div className={classes.label}>APR</div>
              <h2>600%</h2>
            </div>
            <div className={classes.right}>
              <div className={classes.label}>Current YSD Price</div>
              <p>$.998121</p>
            </div>
          </div>
          <nav className={classes.navbar}>
            <div className={classes.nav_menus}>
              <div
                className={`flex ${classes.menu}`}
                onClick={() => setCurrentTab(0)}
              >
                {/* <Link href="/"> */}
                <a className={currentTab === 0 ? classes.active : ""}>
                  {" "}
                  Staking
                </a>
                {/* </Link> */}
              </div>

              <div className={`flex ${classes.menu}`}>
                {/* <Link href="/referral"> */}
                <a
                  className={currentTab === 1 ? classes.active : ""}
                  onClick={() => setCurrentTab(1)}
                >
                  Auction
                </a>
                {/* </Link> */}
              </div>
            </div>
          </nav>

          <div className={classes.stake}>
            <p className={classes.title}>My Stake</p>
            <div className={classes.stats}>
              <div className={classes.left}>
                <div className={classes.circle}></div>
                <h3>10,000.2819</h3>
                <span className={classes.minor}>($3,000.16)</span>
              </div>
              <div className={classes.right}>
                <span className={classes.label}>YSD in Wallet</span>
                <p className={classes.value}>
                  <div className={classes.circle}></div> 10,000.2819
                  <span className={classes.minor}>($3,000.16)</span>
                </p>
              </div>
            </div>
            <div className={classes.stake_actions}>
              <nav className={classes.stake_nav}>
                <div className={classes.nav_menus}>
                  <div
                    className={`flex ${classes.menu}`}
                    onClick={() => setStakeTab(0)}
                  >
                    {/* <Link href="/"> */}
                    <a className={stakeTab === 0 ? classes.active : ""}>
                      {" "}
                      Stake
                    </a>
                    {/* </Link> */}
                  </div>

                  <div className={`flex ${classes.menu}`}>
                    {/* <Link href="/referral"> */}
                    <a
                      className={stakeTab === 1 ? classes.active : ""}
                      onClick={() => setStakeTab(1)}
                    >
                      Unstake
                    </a>
                    {/* </Link> */}
                  </div>
                </div>
              </nav>
              <form
                className={`${classes.stake_action_form} ${
                  +stakeActionValue < 1 ? classes.input_error : ""
                } `}
              >
                <input
                  type="number"
                  value={stakeActionValue}
                  onChange={(e) => setStakeActionValue(e.target.value)}
                  placeholder="Input Fill Text"
                />

                <div className={classes.buttons}>
                  <span>Max</span>
                  <button
                    className={`${
                      +stakeActionValue > 0 ? classes.active_btn : ""
                    }`}
                  >
                    Stake
                  </button>
                </div>
              </form>
              {+stakeActionValue < 1 && (
                <span className={classes.error_message}>Insufficient YSD</span>
              )}
            </div>
          </div>

          <div className={classes.rewards}>
            <p className={classes.title}>My Rewards</p>
            <div className={classes.stats}>
              <div className={classes.left}>
                <div className={classes.circle}>
                  <img src="/coin_icon.png" alt="" />
                </div>
                <h3>10,000.2819</h3>
                <span className={classes.minor}>($3,000.16)</span>
              </div>
              <div className={classes.right}>
                <button>Collect</button>
              </div>
            </div>
            <div className={classes.reward_stats}>
              <div className={classes.stat}>
                <span className={classes.label}>Darned to date:</span>
                <div className={classes.value}>
                  <div className={classes.circle}>
                    <img src="/coin_icon.png" alt="" />
                  </div>{" "}
                  <p>10,000.2819</p>
                  <span className={classes.minor}>($3,000.16)</span>
                </div>
              </div>
              <div className={classes.stat}>
                <span className={classes.label}>Collected to date:</span>
                <div className={classes.value}>
                  <div className={classes.circle}>
                    <img src="/coin_icon.png" alt="" />
                  </div>{" "}
                  <p>10,000.2819</p>
                  <span className={classes.minor}>($3,000.16)</span>
                </div>
                <h5>Last Collected 06:45, Mar.28, 2022</h5>
              </div>
            </div>
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

export default Banner
