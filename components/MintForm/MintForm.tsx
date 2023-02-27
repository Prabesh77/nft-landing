import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { Form, Select, Button } from 'antd'
import Indicator from 'components/Indicator/Indicator'
import styles from './MintForm.module.css'

const { Option } = Select

interface IBuyForm {
  _errMsg: any
  isWhitelisted: boolean
  account: string
  pending: boolean
  userStatus: any
  mintStatus: any
  network: number
  balance: number
  nftInfo: any
  mintCount: any
  disabled: boolean
  onSubmit: Function
}

export default function MintForm({
  _errMsg,
  isWhitelisted,
  account,
  pending,
  userStatus,
  mintStatus,
  network,
  balance,
  nftInfo,
  mintCount,
  disabled,
  onSubmit,
}: IBuyForm) {
  const [form] = Form.useForm()
  const [errMsg, setErrMsg] = useState('')
  const [amount, setAmount] = useState(1)

  const sellCount = 500
  const maxCount = Math.min(2 - mintCount, sellCount - +(nftInfo.totalSupply || 0))
  const nftPrice = 0.03
  const currentNetwork = process.env.APP_ENV === 'dev' ? 97 : 56
  // const amount = form.getFieldsValue().amount || 0

  useEffect(() => {
    setErrMsg('You are not whitelisted')
  }, [account, userStatus, isWhitelisted])

  useEffect(() => {
    setErrMsg(_errMsg)
  }, [_errMsg])

  useEffect(() => {
    if (mintCount === 2) {
      setErrMsg('You have minted all')
    }
  }, [mintCount])

  const onFinish = (values: any) => {
    if (+(nftInfo.totalSupply || 0) === sellCount) {
      return
    } else {
      setErrMsg('')
      onSubmit({
        ethAmount: new BigNumber(amount).times(nftPrice).toString(10),
        amount,
      })
    }
  }

  return (
    <div className={styles.mintFormWrap}>
      <div className={styles.pendantImg}>
        <img src="/assets/Starter_box.png" alt="pendant" />
      </div>
      <div className={styles.mintForm}>
        {errMsg && <div className={`errMsgWrap`}>{errMsg}</div>}
        {mintStatus === 'receipt' && (
          <div className={`successMsg`}>You have minted successfully</div>
        )}
        {/* {account && (
          <div className={`flex-center justify-between ${styles.totalNFTs}`}>
            <div>Remaining</div>
            <strong>{500 - (nftInfo.totalSupply || 0)}</strong>
          </div>
        )} */}
        <div className={styles.title}>Starter™ Pass</div>
        <Form
          className={styles.form}
          form={form}
          name="mint"
          onFinish={onFinish}
          scrollToFirstError
        >
          {+(nftInfo.totalSupply || 0) !== sellCount && (
            <div className={`flex-center justify-between`}>
              <div className={styles.label}>Quantity</div>
              <div className={styles.value}>
                <span
                  className={amount === 1 ? styles.disabled : ''}
                  onClick={() => {
                    if (amount > 1) {
                      setAmount(amount - 1)
                    }
                  }}
                >
                  -
                </span>{' '}
                {amount}{' '}
                <span
                  className={amount >= maxCount ? styles.disabled : ''}
                  onClick={() => {
                    if (amount < maxCount) {
                      setAmount(amount + 1)
                    }
                  }}
                >
                  +
                </span>
              </div>
            </div>
          )}
          {/* {+(nftInfo.totalSupply || 0) !== sellCount && (
            <Form.Item name="amount">
              <Select className={styles.amountField} size="large">
                {new Array(maxCount).fill('0').map((v, idx) => (
                  <Option value={idx + 1} key={idx}>
                    {idx + 1}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )} */}
          <Form.Item className={styles.btnWrap} shouldUpdate>
            {() => (
              <Button
                className={`flex-center justify-between`}
                type="primary"
                htmlType="submit"
                disabled={
                  disabled ||
                  !isWhitelisted ||
                  mintCount === 2 ||
                  userStatus.kycStatus !== 'approved' ||
                  !amount ||
                  new BigNumber(amount)
                    .times(nftPrice)
                    .isGreaterThanOrEqualTo(balance) ||
                  new BigNumber(balance).isZero() ||
                  network !== currentNetwork ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                {+(nftInfo.totalSupply || 0) !== sellCount && (
                  <div className={`flex-center`}>
                    {pending && <Indicator />}
                    <img src="/assets/eth.svg" alt="eth" />
                    <div className={styles.balance}>
                      {new BigNumber(amount).times(nftPrice).toString(10)}
                    </div>
                  </div>
                )}
                <div>
                  {+(nftInfo.totalSupply || 0) === sellCount
                    ? 'Sold Out'
                    : 'Mint'}
                </div>
              </Button>
            )}
          </Form.Item>
          <div className={styles.descriptionWrap}>
            <div className={styles.subtitle}>Description & Details</div>
            <div className={styles.description}>
              The Starter pass entitles you to an exclusive spot in Starter’s
              Starter gallery, as well as the right to redeem it for a one of a
              kind replica of your CryptoPunk. Inspired by the sought after NFT,
              your jewel encrusted pendant will be designed and crafted by
              Starter’s artisans. Purchasing this Starter does not require
              redemption, and itself is a collectible NFT.
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
