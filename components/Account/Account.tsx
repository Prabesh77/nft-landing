import React, { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import BigNumber from "bignumber.js"
import Button from "components/Button/Button"
import { getWalletAddressEllipsis } from "utils/common"
import { connectors } from "./connectors"
import SelectWalletModal from "./SelectWalletModal"
import styles from "./Account.module.css"

interface IAccount {
  balance: string
}

const providers = {
  injected: {
    iconUrl: "/assets/wallet/metamask.png",
  },
  coinbaseWallet: {
    iconUrl: "/assets/wallet/coinbase.png",
  },
  walletConnect: {
    iconUrl: "/assets/wallet/walletconnect.png",
  },
}
declare const window: any

export default function Account({ balance }: IAccount) {
  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React()

  const [isOpen, setIsOpen] = useState(false)

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined)
  }

  const disconnect = () => {
    refreshState()
    deactivate()
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          disconnect()
        }
      })
    }
  }, [])

  useEffect(() => {
    const provider = window.localStorage.getItem("provider")
    if (provider) activate(connectors[provider])
  }, [])

  return (
    <div className={styles.account}>
      {!active ? (
        <Button
          onClick={() => {
            setIsOpen(true)
          }}
        >
          Connect Wallet
        </Button>
      ) : (
        <div className={`flex-center ${styles.walletInfo}`}>
          <div className={`flex-center ${styles.accountInfo}`}>
            <img className={styles.ethIcon} src="/assets/eth.png" alt="eth" />
            {new BigNumber(balance).dp(4, 1).toString(10)} BNB |{" "}
            {getWalletAddressEllipsis(account, 5, 3)}
            <img
              className={styles.walletIcon}
              src={
                providers[window.localStorage.getItem("provider") || "injected"]
                  .iconUrl
              }
              alt="wallet"
            />
          </div>
          <Button onClick={disconnect}>Disconnect</Button>
        </div>
      )}
      <SelectWalletModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
      />
    </div>
  )
}
