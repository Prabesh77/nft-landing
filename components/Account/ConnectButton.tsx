import React, { useState } from 'react'
import Button from 'components/Button/Button'
import SelectWalletModal from './SelectWalletModal'
import styles from './Account.module.css'

export default function ConnectButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.connectBtnWrap}>
      <div className={styles.connectBtnInfo}>
        <div className={styles.title}>Connect Wallet</div>
        <div className={styles.description}>Please connect your wallet to get started.</div>
      </div>
      <div className={styles.btnWrap}>
        <Button
          onClick={() => {
            setIsOpen(true)
          }}
        >
          Connect Wallet
        </Button>
      </div>
      <SelectWalletModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
      />
    </div>
  )
}
