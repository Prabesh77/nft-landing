export function getNFTInfo(contract, dispatch) {
  if (!contract || !contract.methods) {
    return null
  }
  Promise.all([
    // contract.methods.totalSupply().call(),
  ])
    .then((infos) => {
      const _totalSupply = 0
      // const _totalSupply = infos[0]

      dispatch({
        type: 'nftInfo',
        payload: {
          totalSupply: _totalSupply,
        },
      })
    })
    .catch((err) => console.log('getNFTInfo', err))
}
