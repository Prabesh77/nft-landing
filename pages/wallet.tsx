import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import Indicator from 'components/Indicator/Indicator'
import TxModal from 'components/TxModal'
// import PunkSelectionModal from 'components/PunkSelectionModal'
import { useYieldClubContract } from 'hooks/useContract'
import { useOwnedPunks } from 'hooks/useOwnedPunks'
import { addresses } from 'utils/constants'
import { useGetClaimSignature } from 'hooks/useApi'
import ConnectButton from 'components/Account/ConnectButton'
// import WalletCard from 'components/WalletCard/WalletCard'
import styles from 'styles/Wallet.module.css'

const whitelistAddresses = [
  '0xeEE1A0a6E87165C6aB74baE6083cAFa6B5849567', // client account
  '0xb5526d9D8Fe6F2b18fa3C992006bF27b263EDd90', // my account
  '0x70336deF61c306a2917a44456fEa2fA256e1e03F', // test account
]

export default function Wallet({ state, networks, dispatch, userInfo, totalInfo }) {
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
  } = useWeb3React()
  const tokenContract = useYieldClubContract()
  const [isPunkLoading, punks, getOwnedPunks]: any = useOwnedPunks()

  const [_, getClaimSignature]: any = useGetClaimSignature()
  const { transactions, requests } = state
  const network = chainId

  const [assetInfo, setAssetInfo] = useState({ symbol: 'Starter' })
  const [starterId, setStarterId] = useState(-1)
  const [isOpenPunkModal, setIsOpenPunkModal] = useState(false)
  const [claimStatus, setClaimStatus] = useState('')
  const [errMsg, setErrMsg] = useState('')


  useEffect(() => {
    if (account && starterId !== -1) {
      getOwnedPunks('0x897aEA3D51DCBA918C41aE23F5d9A7411671DeE0')
    }
  }, [account, starterId])

  const transactionMap = transactions.reduce(
    ([stakes], [hash, type, ...args]) => {
      const transaction = {
        stakes: {},
      }
      switch (type) {
        case 'claim':
          transaction.stakes[args[0]] = hash
          break
        default:
          break
      }
      return [{ ...stakes, ...transaction.stakes }]
    },
    new Array(4).fill({})
  )

  const handlePunkSelection = (_starterId) => {
    setStarterId(_starterId)
    setIsOpenPunkModal(true)
    setErrMsg('')
  }

  const handleTransaction = (type, ...args) => (
    transaction,
    callback = () => {}
  ) => {
    dispatch({
      type: 'txRequest',
      payload: [type, true, ...args],
    })
    setClaimStatus('request')
    transaction
      .on('transactionHash', function (hash) {
        dispatch({
          type: 'txHash',
          payload: [hash, false, type, ...args],
        })
        setClaimStatus('transactionHash')
      })
      .on('receipt', function (receipt) {
        dispatch({
          type: 'txHash',
          payload: [receipt.transactionHash, true, type, callback()],
        })
        setClaimStatus('receipt')
      })
      .on('error', (err, receipt) => {
        if (err && err.message) {
          console.log(err.message)
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

  const handleClaim = async (_starterId, punkId) => {
    setClaimStatus('')
    const claimSignature = await getClaimSignature({
      wallet: account,
      punkId,
      starterId,
    })
    if (claimSignature) {
      setAssetInfo({ symbol: 'Starter' })
      const { claim } = tokenContract.methods
      const transaction = claim(punkId, starterId, claimSignature)
      handleTransaction('claim', 'Starter')(
        transaction.send({
          type: '0x2',
          from: account,
        }),
        () => {}
      )
      setIsOpenPunkModal(false)
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
      <div className={styles.errorContent}>
        {errMsg && <div className={`errMsgWrap`}>{errMsg}</div>}
      </div>
      {/* <PunkSelectionModal
        isOpen={isOpenPunkModal}
        starterId={starterId}
        loading={isPunkLoading}
        punks={punks.filter((punk, _id) => {
          if (account === whitelistAddresses[0] && _id < 6) {
            return true
          } else if (
            (account === whitelistAddresses[1] ||
              account === whitelistAddresses[2]) &&
            _id >= 6
          ) {
            return true
          }
          return false
        })}
        onClose={() => setIsOpenPunkModal(false)}
        onLinkPunk={handleClaim}
      /> */}
      <TxModal
        network={network}
        pending={assetInfo && requests.claim === assetInfo.symbol}
        disabled={assetInfo && transactionMap[0][assetInfo.symbol]}
        onClose={() => setAssetInfo(null)}
      />
    </section>
  )
}
