export const getItemFromLocalStorage = (item) => { 
    if(localStorage.getItem(item)) { 
        return JSON.parse(localStorage.getItem(item)    )
    }
    return null
}

export const setItemToLocalStorage = (key , value) => { 
    localStorage.setItem(key , JSON.stringify(value))
}

