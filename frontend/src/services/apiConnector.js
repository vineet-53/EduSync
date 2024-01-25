import axios from "axios"
const apiConnector =  async (url , method = "GET" , body = null  , headers = {}) => {
     try{  
        const response = await axios({ 
            method , 
            url , 
            data : body, 
            headers , 
        })
        return response
     }catch(err){ 
        throw err
     }
}

export default apiConnector