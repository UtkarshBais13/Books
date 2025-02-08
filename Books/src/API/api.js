import React, { useState ,useEffect} from "react"
import axios from "axios"



function useFeatchData(url){
    const [loading,setLoading] = useState(false)
const [error , setError] = useState(false)
const [data,setData] = useState([])
    useEffect(()=>{

      const controller = new AbortController()
     ;(async()=>{
      try {
        setLoading(true)
        setError(false)
        const response = await axios.get('/api/v1/public/books/',{
          signal:controller.signal
          
        })
        
        console.log(response.data)
        setData(response.data)
        setLoading(false)
        
      } catch (error) {
        if(axios.isCancel(error)){
          console.log("Request is Cancelled",error.message);
          return
          
        }
        setError(true)
        setLoading(false)
      }
     })()

     return()=>{
      controller.abort()
     }
    },[url])

    return { loading, error, data };
}

    export default useFeatchData