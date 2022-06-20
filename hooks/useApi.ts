import React, { useState, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import { ethers } from 'ethers'

const { toChecksumAddress } = require('ethereum-checksum-address')

declare const window: any

export const useGetUserStatus = () => {
  const { account } = useWeb3React()

  const [data, setData] = useState<any>({})

  const getUserStatus =useCallback(async () => {
    if (!account) {
      setData({ })
    }
    if (account) {
      try {
        const { data: userStatus }: any = await axios.get(
          `${process.env.API_ENDPOINT}/user/status?wallet=${account}`
        )
        if (userStatus && userStatus.data) {
          setData(userStatus.data)
        } else {
          setData({
            kycStatus: 'no-started'
          })
        }
      } catch (error) {
        setData({})
      }
    }
  }, [account])

  return [data, getUserStatus]
}

export const useGetUserInfo = () => {
  const { account } = useWeb3React()

  const [data, setData] = useState<any>({})

  const getUserInfo = async () => {
    if (!account) {
      setData({})
    }
    if (account) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const epochTime = Math.round(new Date().getTime() / 1000)
        const type = "User Information Signature"
        const signature = await signer.signMessage(`${type}: ${toChecksumAddress(account)}-${epochTime}`)
        // const msgHash = ethers.utils.hashMessage(`${type}: ${toChecksumAddress(account)}-${epochTime}`);
        // const msgHashBytes = ethers.utils.arrayify(msgHash);
        // const recoverAddress = ethers.utils.recoverAddress(msgHashBytes, signature);
        const { data: userInfo }: any = await axios.get(
          `${process.env.API_ENDPOINT}/user/info?wallet=${account}`,
          {
            headers: {
              "x-type": 'User Information Signature',
              'x-signature': signature,
              'x-timestamp': `${epochTime}`,
            },
          }
        )
        if (userInfo && userInfo.data) {
          setData(userInfo.data)
          return userInfo.data
        }
        return {}
      } catch (error) {
        setData({})
        return {}
      }
    }
  }

  return [data, getUserInfo]
}

export const useKycSubmit = () => {
  const [loading, setLoading] = useState<any>(false)
  const [data, setData] = useState<any>({})

  const submitKYC = async (params) => {
    setLoading(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const epochTime = Math.round(new Date().getTime() / 1000)
      const type = "KYC Signature"
      const signature = await signer.signMessage(`${type}: ${toChecksumAddress(params.wallet)}-${epochTime}`)

      const { data: response }: any = await axios.post(
        `${process.env.API_ENDPOINT}/kyc/veriff/start`,
        {
          ...params,
          "x-type": 'KYC Signature',
          'x-signature': signature,
          'x-timestamp': epochTime,
        }
      )
      if (response && response.data) {
        setData(response.data)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setData(error?.response?.data || {})
    }
  }

  return [loading, data, submitKYC]
}

export const useGetClaims = () => {
  const [data, setData] = useState<any>([])

  const getClaims = async (params = {}) => {
    let queryParams = ''
    Object.keys(params).map((key, idx) => {
      if (idx === 0) {
        queryParams = `?${key}=${params[key]}`
      } else {
        queryParams += `&${key}=${params[key]}`
      }
    })
    try {
      const { data: claimInfo }: any = await axios.get(
        `${process.env.API_ENDPOINT}/claims${queryParams}`
      )
      if (claimInfo && claimInfo.result) {
        setData(claimInfo.result)
      }
    } catch (error) {
      setData([])
    }
  }

  return [data, getClaims]
}

export const useGetClaimSignature = () => {
  const [data, setData] = useState<any>(null)

  const getClaimSignature = async (params) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const epochTime = Math.round(new Date().getTime() / 1000)
      const type = "Claim Signature"
      const signature = await signer.signMessage(`${type}: ${toChecksumAddress(params.wallet)}-${epochTime}`)

      const { data: response }: any = await axios.post(
        `${process.env.API_ENDPOINT}/user/claim-check`,
        {
          ...params,
          "x-type": 'Claim Signature',
          'x-signature': signature,
          'x-timestamp': epochTime,
        }
      )
      if (response && response.data) {
        setData(response.data)
        return response.data
      }
      return null
    } catch (error) {
      setData(null)
      return null
    }
  }

  return [data, getClaimSignature]
}
