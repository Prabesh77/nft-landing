import { useState, useEffect, useCallback } from 'react'
import { graphClient } from 'utils/constants'
import { gql } from '@apollo/client'

export const useOwnedPunks = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function getQuery(address) {
    const { data } = await graphClient.query({
      fetchPolicy: 'network-only',
      query: gql`
      {
        tokenOwnerEntities(
          first: 1000,
          where: {
            owner: "${address}"
          }
        ) {
          id
          owner
          punkIndex
          createdAt
          updatedAt
        }
      }`,
    })

    return data
  }

  const getOwnedPunks = async (address: string) => {
    if (!address) return
    setIsLoading(true)
    let res = await getQuery(address)
    if (res && res.tokenOwnerEntities) {
      setData(res.tokenOwnerEntities || [])
    }
    setIsLoading(false)
  }

  return [isLoading, data, getOwnedPunks]
}
