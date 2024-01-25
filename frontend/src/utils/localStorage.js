export const getItemFromLocalStorage = (item) => { 
    if(localStorage.getItem(item)) { 
        return JSON.parse(localStorage.getItem(item))

    }
    return null
}

export const setItemToLocalStorage = (kye , value) => { 
    localStorage.setItem(key , JSON.stringify(value))
}

