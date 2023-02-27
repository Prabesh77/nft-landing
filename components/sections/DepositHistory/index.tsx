import { gql, useQuery } from "@apollo/client"
import classes from "./DepositHistory.module.scss"
import { BsExclamationCircle } from "react-icons/bs"

const DepositHistory = () => {
  const query = gql`
    query {
      depositEntities(first: 10, orderBy: createdAt, orderDirection: desc) {
        id
        addr
        amount
        date
        createdAt
        updatedAt
        txHash
        txIndex
        timestamp
        blockNumber
      }
    }
  `

  const { loading, data: depositHistory } = useQuery(query)
  return (
    <div className={classes.deposit_history_wrapper}>
      <div className={classes.deposit_history_container}>
        <h2 className={classes.title}>Global Deposit History</h2>

        <div className={classes.history_list}>
          {depositHistory?.depositEntities?.length ? (
            depositHistory?.depositEntities?.map((entity) => (
              <HistoryCard
                invested={0.1}
                wallet="0xE8D...C4473"
                txHash="0x4be...4111a1"
                date="31/05/2022 | 22 : 10 : 06"
              />
            ))
          ) : (
            <div className={classes.not_found}>
              <h3>No history available.</h3>
              <BsExclamationCircle className={classes.icon} />
            </div>
          )}
          {/* <HistoryCard
            invested={0.1}
            wallet="0xE8D...C4473"
            txHash="0x4be...4111a1"
            date="31/05/2022 | 22 : 10 : 06"
          />
          <HistoryCard
            invested={0.1}
            wallet="0xE8D...C4473"
            txHash="0x4be...4111a1"
            date="31/05/2022 | 22 : 10 : 06"
          />
          <HistoryCard
            invested={0.1}
            wallet="0xE8D...C4473"
            txHash="0x4be...4111a1"
            date="31/05/2022 | 22 : 10 : 06"
          />
          <HistoryCard
            invested={0.1}
            wallet="0xE8D...C4473"
            txHash="0x4be...4111a1"
            date="31/05/2022 | 22 : 10 : 06"
          />
          <HistoryCard
            invested={0.1}
            wallet="0xE8D...C4473"
            txHash="0x4be...4111a1"
            date="31/05/2022 | 22 : 10 : 06"
          />
          <HistoryCard
            invested={0.1}
            wallet="0xE8D...C4473"
            txHash="0x4be...4111a1"
            date="31/05/2022 | 22 : 10 : 06"
          />
          <HistoryCard
            invested={0.1}
            wallet="0xE8D...C4473"
            txHash="0x4be...4111a1"
            date="31/05/2022 | 22 : 10 : 06"
          /> */}
        </div>
      </div>
    </div>
  )
}

const HistoryCard = ({ invested, wallet, txHash, date }) => {
  return (
    <div className={classes.history_card}>
      <div className={classes.box}>
        <span className={classes.label}>Invested</span>
        <span className={classes.value}>{invested}</span>
      </div>
      <div className={classes.box}>
        <span className={classes.label}>Wallet</span>
        <span className={classes.value}>{wallet}</span>
      </div>
      <div className={classes.box}>
        <span className={classes.label}>Tx Hash</span>
        <span className={classes.value}>{txHash}</span>
      </div>
      <div className={classes.box}>
        <span className={classes.label}>Deposit Date</span>
        <span className={classes.value}>{date}</span>
      </div>
    </div>
  )
}

export default DepositHistory
