import PoolStats from "components/sections/PoolStats"
import React from "react"

const statistics = ({state, networks, dispatch, totalInfo, userInfo}) => {
  return <PoolStats 
  state={state}
  networks={networks}
  dispatch={dispatch}
  totalInfo={totalInfo}
  userInfo={userInfo}
  />
}

export default statistics
