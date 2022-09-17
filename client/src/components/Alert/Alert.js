import React,{useContext, useEffect} from 'react'
import MainContext from "../../context/MainContext"

const Alert = () => {
    const {alert, setAlert} = useContext(MainContext)

    useEffect(()=>{
        if(alert.message === "")
            return

        setTimeout(() => {
            setAlert({
                message: ""
            })
        }, 2000);
    },[alert, setAlert])

  return alert.message&&(
    <div className={'klase1 klase2-'+alert.status}>
      {alert.message}
    </div>
  )
}

export default Alert