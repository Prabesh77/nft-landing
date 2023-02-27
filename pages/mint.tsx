import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useYieldClubContract } from 'hooks/useContract'
import { addresses } from 'utils/constants'
import { getNFTInfo } from 'utils/library'
import MintForm from 'components/MintForm/MintForm'
import ConnectButton from 'components/Account/ConnectButton'
import TxModal from 'components/TxModal'
import styles from 'styles/Mint.module.css'

const FETCH_TIME = 3
let nftTimer = null
let whitelistTimer = null

export default function Mint({ state, networks, dispatch, totalInfo, userInfo }) {
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
  } = useWeb3React()

  const tokenContract = useYieldClubContract()
  const [assetInfo, setAssetInfo] = useState({ symbol: 'Starter' })
  const [mintStatus, setMintStatus] = useState('')
  const [errMsg, setErrMsg] = useState('')

  // useEffect(() => {
  //   getUserWhitelistInfo()
  //   if (whitelistTimer) clearInterval(whitelistTimer)
  //   whitelistTimer = setInterval(getUserWhitelistInfo, FETCH_TIME * 1000)
  //   return () => whitelistTimer && clearInterval(whitelistTimer)
  // }, [account])

  const { transactions, requests } = state
  const network = chainId
  const toWei = (value, decimals = 18) =>
    decimals < 18
      ? new BigNumber(value).times(10 ** decimals).toString(10)
      : library.utils.toWei(value)

  const loadInfo = () => {
    getNFTInfo(tokenContract, dispatch)
  }

  useEffect(() => {
    if (nftTimer) clearInterval(nftTimer)
    loadInfo()
    nftTimer = setInterval(loadInfo, FETCH_TIME * 1000)
    return () => nftTimer && clearInterval(nftTimer)
  }, [])

  const transactionMap = transactions.reduce(
    ([stakes], [hash, type, ...args]) => {
      const transaction = {
        stakes: {},
      }
      switch (type) {
        case 'buy':
          transaction.stakes[args[0]] = hash
          break
        default:
          break
      }
      return [{ ...stakes, ...transaction.stakes }]
    },
    new Array(4).fill({})
  )

  const handleTransaction = (type, ...args) => (
    transaction,
    callback = () => {}
  ) => {
    dispatch({
      type: 'txRequest',
      payload: [type, true, ...args],
    })
    setMintStatus('request')
    transaction
      .on('transactionHash', function (hash) {
        dispatch({
          type: 'txHash',
          payload: [hash, false, type, ...args],
        })
        setMintStatus('transactionHash')
      })
      .on('receipt', function (receipt) {
        dispatch({
          type: 'txHash',
          payload: [receipt.transactionHash, true, type, callback()],
        })
        setMintStatus('receipt')
      })
      .on('error', (err, receipt) => {
        setMintStatus('failure')
        if (err && err.message) {
          setErrMsg(err.message)
        }
        if (receipt) {
          dispatch({
            type: 'txHash',
            payload: [receipt.transactionHash, true, type],
          })
        } else {
          dispatch({
            type: 'txRequest',
            payload: [type, false, ...args],
          })
        }
      })
  }

  const handleBuy = async (form) => {
    setMintStatus('')
    const { ethAmount, amount } = form
    if (userInfo.kycSignature) {
      setAssetInfo({ symbol: 'Starter' })
      const { mint1 } = tokenContract.methods
      const transaction = mint1(amount, userInfo.kycSignature)
      handleTransaction('buy', 'Starter')(
        transaction.send({
          type: '0x2',
          from: account,
          value: toWei(ethAmount.toString(10), 18),
        }),
        () => {}
      )
    }
  }
  if (!account) {
    return (
      <section className={`${styles.content}`}>
        <div className={`connectionWrap flex-all limited`}>
          <ConnectButton />
        </div>
      </section>
    )
  }
  return (
    <section className={`${styles.content}`}>
      <div className={`${styles.buyFormWrapper} flex-all limited`}>
        <div className={`flex-center ${styles.buyWrapper}`}>
          {/* <MintForm
            _errMsg={errMsg}
            account={account}
            mintStatus={mintStatus}
            pending={assetInfo && requests.buy === assetInfo.symbol}
            balance={state.balance}
            nftInfo={state.nftInfo || {}}
            network={network}
            disabled={assetInfo && transactionMap[0][assetInfo.symbol]}
            onSubmit={handleBuy}
          /> */}
        </div>
        <TxModal
          network={network}
          pending={assetInfo && requests.buy === assetInfo.symbol}
          disabled={assetInfo && transactionMap[0][assetInfo.symbol]}
          onClose={() => setAssetInfo(null)}
        />
      </div>
    </section>
  )
}
