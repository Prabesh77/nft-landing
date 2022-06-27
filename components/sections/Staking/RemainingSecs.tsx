import classes from "./Banner.module.scss"
import { useEffect, useState } from "react"

let timer

const RemainingSecs = ({ totalInfo }) => {
  let checkpoint = totalInfo?.contractInfo
    ? Number(totalInfo?.contractInfo[3])
    : 0
  checkpoint += 86400 // unix timestamp seconds
  const [toUpdate, setToUpdate] = useState(['00','00','00']) //unused state. Just used to update component.
  useEffect(() => {
    if (timer) clearInterval(timer)
    if (checkpoint > Math.floor(Date.now() / 1000)) {
      timer = setInterval(function () {
        let remainingSecs = 0
        const curTime = Math.floor(Date.now() / 1000)
        if (curTime <= checkpoint) remainingSecs = checkpoint - curTime
        if (remainingSecs > 0) {
          const HHMMSS = new Date(remainingSecs * 1000)
            .toISOString()
            .substr(11, 8)
            .split(":")
          setToUpdate(HHMMSS) //used this state just to update the timer component
        }
      }, 1000)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [checkpoint])
  return (
    <div className={classes.timer}>
      <div className={classes.time_box}>
        <div className={classes.time}>{toUpdate[0]}</div>
        <div className={classes.label}>
          <span>Hours</span>
        </div>
      </div>
      <div className={classes.time_box}>
        <div className={classes.time}>{toUpdate[1]}</div>
        <div className={classes.label}>
          <span>Minutes</span>
        </div>
      </div>
      <div className={classes.time_box}>
        <div className={classes.time}>{toUpdate[2]}</div>
        <div className={classes.label}>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  )
}

export default RemainingSecs
