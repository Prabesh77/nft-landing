import { ethers } from 'ethers'
import { NETWORKS } from "./constants";

export function toNumber(value, decimal = 12) {
  const regex = new RegExp(`^-?\\d+(?:\\.\\d{0,${decimal}})?`)
  const val = Number(value.toString().match(regex)[0])
  return val < 0.1 ** Math.max(decimal - 5, 2) ? 0 : val
}

export const getWalletAddressEllipsis = (address, head = 6, tail = 4) => {
  return `${address.substring(0, head)}...${address.substring(
    address.length - tail
  )}`;
};

export const bscLink =
process.env.APP_ENV === "dev"
  ? NETWORKS[97].blockExplorerUrls[0]
  : NETWORKS[56].blockExplorerUrls[0]

export const isValidAddress = (address = '') => {
  if(!address) return false;
  return ethers.utils.isAddress(`${address}`);
}
