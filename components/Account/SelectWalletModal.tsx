import { useWeb3React } from '@web3-react/core'
import { connectors } from './connectors'
import { Modal, Button } from 'antd'
import { isMobile } from 'react-device-detect'
import styles from './WalletModal.module.css'

interface IWalletModal {
  isOpen: boolean
  onClose: Function
}

export default function SelectWalletModal({ isOpen, onClose }: IWalletModal) {
  const { activate } = useWeb3React()

  const setProvider = (type) => {
    window.localStorage.setItem('provider', type)
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Modal
      className={`walletModalWrap ${styles.walletWrap}`}
      visible={!!isOpen}
      centered
      footer={null}
      onCancel={handleCancel}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className={styles.title}>Connect your Wallet</div>
        <div
          className={styles.btnWrap}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {!isMobile && (
            <Button
              type="primary"
              onClick={() => {
                activate(connectors.injected)
                setProvider('injected')
                onClose()
              }}
            >
              <img src="/assets/wallet/metamask.png" alt="wallet" />
              MetaMask
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => {
              activate(connectors.coinbaseWallet)
              setProvider('coinbaseWallet')
              onClose()
            }}
          >
            <img src="/assets/wallet/coinbase.png" alt="wallet" />
            CoinBase
          </Button>
          <Button
            type="primary"
            onClick={() => {
              activate(connectors.walletConnect)
              setProvider('walletConnect')
              onClose()
            }}
          >
            <img src="/assets/wallet/walletconnect.png" alt="wallet" />
            Wallet Connect
          </Button>
        </div>
      </div>
    </Modal>
  )
}
