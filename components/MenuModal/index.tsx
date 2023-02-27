import { Modal } from 'antd'
import Link from 'next/link'
import styles from './MenuModal.module.css'

interface IMenu {
  isOpen: boolean
  onClose: Function
}

export default function MenuModal({ isOpen, onClose }: IMenu) {
  const handleCancel = () => {
    onClose()
  }

  return (
    <Modal
      className={`menuModalWrap`}
      visible={!!isOpen}
      footer={null}
      closable={false}
      style={{ top: 5, left: 0 }}
      onCancel={handleCancel}
    >
      <div className={styles.menuWrap}>
        <div className={styles.menuItem} onClick={() => onClose()}>
          <Link href="/mint">Mint Starter™</Link>
        </div>
        <div className={styles.menuItem} onClick={() => onClose()}>
          <Link href="/wallet">Starter™ Wallet</Link>
        </div>
        <div className={styles.menuItem} onClick={() => onClose()}>
          <Link href="/library">Starter™ Library</Link>
        </div>
        <div className={styles.menuItem} onClick={() => onClose()}>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className={styles.menuItem} onClick={() => onClose()}>
          <a href="https://www.starter.com" target="_blank">
            Starter.com
          </a>
        </div>
      </div>
    </Modal>
  )
}
