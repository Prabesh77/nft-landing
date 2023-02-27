import React, { useReducer, useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { useWeb3React } from "@web3-react/core"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { Collapse } from "react-collapse"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Account from "components/Account/Account"
import MenuModal from "components/MenuModal"
import { toNumber } from "utils/common"
import { addresses, NETWORKS } from "utils/constants"
import { useGetTotalInfo, useGetUserInfo } from "hooks/useYieldClub"
import { reducer, initState } from "./store"
import styles from "./Layout.module.css"
import { FiMenu } from "react-icons/fi"
import {
  AiFillTwitterSquare,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai"
import Disclaimer from "components/sections/Disclaimer"

const FETCH_TIME = 3
let balanceTimer = null
let userInfoTimer = null
let totalInfoTimer = null

declare const window: any

export function accountBalance(library, chainId, account, dispatch) {
  if (!library || !library.eth) {
    return
  }
  const fromWei = (value, decimals = 18) =>
    decimals < 18 ? value / 10 ** decimals : library.utils.fromWei(value)
  if (!addresses[chainId] || !account) {
    return
  }
  Promise.all([library.eth.getBalance(account)])
    .then(([_balance]) => {
      const balance = toNumber(fromWei(_balance))
      dispatch({
        type: "balance",
        payload: {
          balance,
        },
      })
    })
    .catch(console.log)
}

export default function Layout({ children, router: { route }, networks }) {
  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React()

  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initState)
  const [restored, setRestored] = useState(false)
  // const [isCollapse, setIsCollapse] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [isLoading, totalInfo, getTotalInfo]: any = useGetTotalInfo()
  const [userInfoIsLoading, userInfo, getUserInfo]: any = useGetUserInfo()

  useEffect(() => {
    const networkId = process.env.APP_ENV === "dev" ? 97 : 56
    if (account && chainId !== networkId && window.ethereum) {
      window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: NETWORKS[networkId].chainId }],
        })
        .then((result) => {})
        .catch((error) => {})
    }
  }, [account, chainId])

  // useEffect(() => {
  //   document.addEventListener('mouseup', (e: any) => {
  //     const container = document.getElementById('collapse-content')
  //     const menuIconElement = document.getElementById('menu-icon')
  //     if (
  //       container &&
  //       !container.contains(e.target) &&
  //       menuIconElement &&
  //       !menuIconElement.contains(e.target)
  //     ) {
  //       setIsCollapse(false)
  //     }
  //   })
  // }, [])

  // useEffect(() => {
  //   setIsCollapse(false)
  //   setTimeout(() => {
  //     if (location.hash) location = location
  //   }, 0)
  // }, [router, library])

  const getBalance = () => {
    if (!account) {
      dispatch({
        type: "balance",
        payload: {
          balance: 0,
        },
      })
      return
    }
    accountBalance(library, chainId, account, dispatch)
  }

  useEffect(() => {
    if (library && account) {
      if (balanceTimer) clearInterval(balanceTimer)
      balanceTimer = setInterval(getBalance, FETCH_TIME * 1000)
      getBalance()
    } else {
      dispatch({
        type: "balance",
        payload: {
          balance: 0,
        },
      })
    }

    getUserInfo()
    if (userInfoTimer) clearInterval(userInfoTimer)
    userInfoTimer = setInterval(getUserInfo, 5 * 1000)

    getTotalInfo()
    if (totalInfoTimer) clearInterval(totalInfoTimer)
    totalInfoTimer = setInterval(getTotalInfo, 5 * 1000)

    return () => {
      balanceTimer && clearInterval(balanceTimer)
      userInfoTimer && clearInterval(userInfoTimer)
      totalInfoTimer && clearInterval(totalInfoTimer)
    }
  }, [library, account, router])

  useEffect(() => {
    if (account && !networks.includes(chainId)) {
      const options = {
        autoClose: 5555,
      }
      toast.error(
        `You are conected to wrong network. Please connect to ${
          process.env.APP_ENV === "dev" ? "BSC Testnet" : "BSC Mainnet"
        }!`,
        options
      )
    }
  }, [account])

  const checkTransactions = () => {
    const { transactions } = state
    Promise.all(
      transactions.map(
        (transaction) =>
          new Promise((resolve) => {
            library.eth
              .getTransactionReceipt(transaction[0])
              .then(() => resolve(transaction[0]))
              .catch(() => resolve(transaction[0]))
          })
      )
    ).then((receipts) => {
      dispatch({
        type: "txHash",
        payload: [receipts.filter((hash) => hash), true],
      })
    })
  }

  useEffect(() => {
    if (!restored && library) {
      setRestored(true)
      checkTransactions()
    }
  }, [library, state.transactions, account])

  return (
    <>
      <Head>
        <title>YieldClub</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="apple-mobile-web-app-title" content="YieldClub" />
        <meta name="application-name" content="YieldClub" />
        <meta
          name="thumbnail"
          content="https://yieldclub.net/feature-meta.jpg"
        />
        <meta name="title" content="YieldClub" />
        <meta
          name="description"
          content="YieldClub is a Community Driven Yield Fund Based On BNB Smart Chain"
        />
        <meta property="og:title" content="YieldClub" />
        <meta
          property="og:image"
          content="https://yieldclub.net/feature-meta.jpg"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="YieldClub is a Community Driven Yield Fund Based On BNB Smart Chain"
        />
        <meta property="og:url" content="https://yieldclub.net" />
        <meta property="og:site_name" content="YieldClub" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="YieldClub" />
        <meta
          property="twitter:description"
          content="YieldClub is a Community Driven Yield Fund Based On BNB Smart Chain"
        />
        <meta
          property="twitter:image"
          content="https://yieldclub.net/feature-meta.jpg"
        />
        <meta name="twitter:site" content="@yieldclub" />
        <meta name="twitter:creator" content="@yieldclub" />
        <meta property="twitter:url" content="https://yieldclub.net" />
        <meta property="og:title" content="YieldClub" />
        <meta name="twitter:title" content="YieldClub" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <main className={`${styles.main} flex-column justify-between`}>
        <ToastContainer />
        <header className={styles.header}>
          <div className={`${styles.nav_menus}`}>
            <div className="flex-center">
              <Link href="/">
                {/* <h2 style={{ color: "#fff", margin: "0" }}>YSD</h2> */}
                <img src="/logo/logo.png" alt="" className={styles.logo} />
              </Link>
            </div>
            <nav className={styles.navbar}>
              <div className={styles.nav_menus_mid}>
                <div className={`flex ${styles.menu}`}>
                  <Link href="/">
                    <a className={router.asPath === "/" ? styles.active : ""}>
                      {" "}
                      Staking
                    </a>
                  </Link>
                </div>

                <div className={`flex ${styles.menu}`}>
                  <Link href="/auction">
                    <a
                      className={
                        router.asPath.includes("auction") ? styles.active : ""
                      }
                    >
                      Auction
                    </a>
                  </Link>
                </div>
              </div>
            </nav>
            <div className="flex-center">
              <Link href="/how-to-join">
                <a>
                  <button className={styles.add_to_wallet}>
                    Add to Wallet
                  </button>
                </a>
              </Link>
              <Link href="/how-to-join">
                <a>
                  <button className={styles.how_to_join}>Buy YSD</button>
                </a>
              </Link>
              <Account
                library={library}
                {...state}
                // loading={loading}
                dispatch={dispatch}
                // connectWallet={connectWallet}
              />
            </div>
          </div>
        </header>

        <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        {React.cloneElement(children, {
          state,
          dispatch,
          networks,
          totalInfo,
          userInfo,
        })}
        <>
          {/* <Disclaimer /> */}
          {/* <footer className={styles.footer_wrapper}>
            <div className={styles.footer_container}>
              <p>© Copyright YieldClub . All Rights Reserved</p>
              <div className={styles.social}>
                <a href="#" target="_blank" rel="noreferrer">
                  <AiFillTwitterSquare className={styles.icon} />
                </a>

                <a href="#" target="_blank" rel="noreferrer">
                  <AiFillInstagram className={styles.icon} />
                </a>

                <a href="#" target="_blank" rel="noreferrer">
                  <AiFillYoutube className={styles.icon} />
                </a>
              </div>
            </div>
          </footer> */}
        </>
      </main>
    </>
  )
}
