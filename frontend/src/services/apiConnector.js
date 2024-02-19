import axios from "axios"
const apiConnector =  async (method ,  url , body = null  , headers = {}) => {
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