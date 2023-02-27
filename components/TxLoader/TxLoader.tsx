import Button from "components/Button/Button"
import { getEtherscan } from "utils/links"
import styles from "./TxLoader.module.css"

interface ITxLoader {
  hash?: string
  network?: number
  desc?: string
}

export const scanLabels = {
  56: "BSC Scan",
  97: "BSC Scan",
}

export default function TxLoader({ hash, network, desc }: ITxLoader) {
  const text = hash ? "Transaction pending..." : "Waiting for confirmation..."
  return (
    <>
      {/* <div className={styles.overlay}></div> */}
      <div className={styles.loader}>
        {!hash && <div className={styles.loader_icon}></div>}

        {hash && (
          <img
            className={styles.loadingIcon}
            src="/logo/icon.svg"
            alt="loading"
          />
        )}
        <h3>{text}</h3>
        <p>{desc || ""}</p>
        <span>Confirm This Transaction in Your Wallet</span>
        {hash && (
          <Button href={getEtherscan(hash, network)} className={styles.padded}>
            View on {scanLabels[network] || "Etherscan"}
          </Button>
        )}
      </div>
    </>
  )
}
