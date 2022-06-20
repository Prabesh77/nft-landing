import React, { useState, useCallback } from 'react'
import Multicall from '@dopex-io/web3-multicall'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { addresses } from 'utils/constants'
import { useYieldClubContract } from 'hooks/useContract'

export const useGetTotalInfo = () => {
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
  } = useWeb3React()

  const [isLoading, setIsLoading] = useState(false)

  const provider = library || new Web3(process.env.APP_ENV === 'dev' ? 'https://data-seed-prebsc-1-s3.binance.org:8545' : 'https://bsc-dataseed.binance.org/')

  let multicall: any;
  if(chainId === 97) {
    multicall = new Multicall({
      chainId: chainId || 97,
      multicallAddress: "0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C",
      // multicallAddress: "0x6e5BB1a5Ad6F68A8D7D6A5e47750eC15773d6042",
      provider: provider.currentProvider,
    })
  } else {
    multicall = new Multicall({
      chainId: chainId || 56,
      provider: provider.currentProvider,
    })
  }

  const tokenContract = useYieldClubContract()

  const [data, setData] = useState<any>([])

  const getTotalInfo = async () => {
    setIsLoading(true)
    try {
      const _multicallMethods = [
        tokenContract.methods.contractInfo(),
        tokenContract.methods.getContractBalance(),
        tokenContract.methods.poolTopInfo(),
        tokenContract.methods.getMatchBonuses(),
        tokenContract.methods.yDayATH(),
      ]
      const multicallData: any = await multicall.aggregate(_multicallMethods)
      setData({
        contractInfo: multicallData[0], // return (total_users, total_deposited, total_withdraw, pool_last_draw, pool_balance, daily_rate)
        getContractBalance: multicallData[1],
        poolTopInfo: multicallData[2],
        getMatchBonuses: multicallData[3],
        yDayATH: multicallData[4],
      })
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false)
  }

  return [isLoading, data, getTotalInfo]
}

export const useGetUserInfo = () => {
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
  } = useWeb3React()

  const [isLoading, setIsLoading] = useState(false)

  const provider = library || new Web3(process.env.APP_ENV === 'dev' ? 'https://data-seed-prebsc-1-s3.binance.org:8545' : 'https://bsc-dataseed.binance.org/')

  let multicall: any;
  if(chainId === 97) {
    multicall = new Multicall({
      chainId: chainId || 97,
      multicallAddress: "0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C",
      // multicallAddress: "0x6e5BB1a5Ad6F68A8D7D6A5e47750eC15773d6042",
      provider: provider.currentProvider,
    })
  } else {
    multicall = new Multicall({
      chainId: chainId || 56,
      provider: provider.currentProvider,
    })
  }

  const tokenContract = useYieldClubContract()

  const [data, setData] = useState<any>([])

  const getUserInfo = async () => {
    if(!account) {
      setData({
        // users: null,
        // users2: null,
        // payoutOf: null,
      })
      return;
    };

    setIsLoading(true)
    try {
      const _multicallMethods = [
        tokenContract.methods.userInfo(account),
        tokenContract.methods.getUserAvailable(account),
        tokenContract.methods.userInfoTotals(account),
        tokenContract.methods.userInfo2(account),
        tokenContract.methods.getUserDownlineCount(account),
      ]
      const multicallData: any = await multicall.aggregate(_multicallMethods)
      setData({
        userInfo: multicallData[0],
        getUserAvailable: multicallData[1],
        userInfoTotals: multicallData[2],
        userInfo2: multicallData[3],
        getUserDownlineCount: multicallData[4],
      })
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false)
  }

  return [isLoading, data, getUserInfo]
}
