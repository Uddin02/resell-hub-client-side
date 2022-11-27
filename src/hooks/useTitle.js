import { useEffect } from "react";

const useTitle = title =>{
    useEffect(()=>{
        document.title = `${title} | Alpha Tour`;
    },[title])
}

export default useTitle;