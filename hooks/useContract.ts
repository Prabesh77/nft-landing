import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import YieldClub from 'lib/ABIs/YieldClub.json'
import { addresses } from 'utils/constants'

export function useYieldClubContract() {
  const {
    library,
    chainId,
    account,
  } = useWeb3React();
  const provider = library || new Web3(process.env.APP_ENV === 'dev' ? 'https://data-seed-prebsc-1-s3.binance.org:8545' : 'https://bsc-dataseed.binance.org/')
  // const provider = library || new Web3(`https://${process.env.APP_ENV === 'dev' ? 'rinkeby' : 'mainnet'}.infura.io/v3/${process.env.INFURA_KEY}`)

  return provider ? new provider.eth.Contract(YieldClub as any, addresses[process.env.APP_ENV === 'dev' ? 97 : 56].YieldClub) : null
}