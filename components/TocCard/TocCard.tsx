import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Form, Checkbox, Button } from 'antd'
import { useWeb3React } from '@web3-react/core'
import styles from './TocCard.module.css'

export default function TocCard({ onOpenWallet }) {
  const { account } = useWeb3React()
  const router = useRouter()
  const [form] = Form.useForm()


  const onFinish = (values: any) => {
    router.push('/mint')
  }

  return (
    <div className={styles.cardWrap}>
      <img src="/assets/logo.svg" alt="logo" />
      <div className={styles.description}>
        Welcome to the Starter™ Gateway. Connect your wallet to mint an Starter™
        Pass and begin the pendant creation process.
      </div>
      <div className={styles.formWrap}>
        <Form form={form} name="toc" onFinish={onFinish} scrollToFirstError>
          <Form.Item
            className="terms_condition_wrap"
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('')),
              },
            ]}
          >
            <Checkbox className={styles.checkboxWrap}>
              By Using Chain Starters, you agree with Chain Starters Terms of
              Service and Privacy Policies
            </Checkbox>
          </Form.Item>
          {account ? (
            <Form.Item className={styles.btnWrap} shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                >
                  Enter
                </Button>
              )}
            </Form.Item>
          ) : (
            <Form.Item className={styles.btnWrap}>
              <Button type="primary" onClick={onOpenWallet}>
                Connect your Wallet
              </Button>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  )
}
