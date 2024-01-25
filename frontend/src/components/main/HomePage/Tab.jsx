import React from 'react';

const Tab = (props) => {
    const {tabcss , title , titlecss  , handleClickedTab , handleClickedTabData , data} = props

    return (
        <button onClick={(event) => { 
            handleClickedTab(event) 
            handleClickedTabData (data)
        }} className={`transition-all duration-500 scroll-smooth h-full lg:px-8 lg:py-2 rounded-full cursor-pointer ${tabcss} ${titlecss}`}>
                {title}
        </button>
    );
}

export default Tab;
