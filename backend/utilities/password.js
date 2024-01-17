const bcrypt = require("bcrypt")
exports.passwordHash = async (password , saltRounds) => { 
    try { 
        return await bcrypt.hash(password, saltRounds)
    }
    catch(err)  { 
        console.error("error hashing password")
        throw err.message
    }
}
exports.passwordCompare =async (password , hashPassword) => { 
    try { 
        await bcrypt.compare(password, hashPassword)
        return true
    }catch(err) { 
        console.error('password not matched')
        throw "password not matched with hashpassword"
    }
}