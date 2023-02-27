import TxLoader from 'components/TxLoader/TxLoader'
import { Modal } from 'antd'
import styles from './TxModal.module.css'

interface ITransaction {
  network: number
  pending: boolean
  disabled: string
  onClose: Function
  desc?: string
}

export default function TxModal({
  desc,
  network,
  pending,
  disabled,
  onClose,
}: ITransaction) {
  const handleCancel = () => {
    onClose()
  }

  return (
    <Modal
      className={`transactionModalWrap ${styles.txModalWrap}`}
      visible={!!pending}
      centered
      footer={null}
      onCancel={handleCancel}
    >
      {pending && <TxLoader hash={pending ? disabled : ''} network={network} desc={desc} />}
    </Modal>
  )
}
