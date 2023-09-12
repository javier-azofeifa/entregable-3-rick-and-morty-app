import { useState } from "react"
import axios from "axios"

const useFetch = (url) => {

    const [infoApi, setInfoApi] = useState()
    const [hasError, setHasError] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    const getApi = () => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            axios.get(url)
            .then(res => {
                setInfoApi(res.data)
                setHasError(false)
            })
            .catch(err => {
                console.log(err)
                setHasError(true)
            })
            .finally(() => {
                setIsLoading(false)
                clearTimeout(timer)
            })
            
        }, 1500)          
    }
    return [ infoApi, getApi, hasError, isLoading ]
}

export default useFetch