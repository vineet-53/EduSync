import React , {useState} from 'react';

const Tab = (props) => {
    const {tabcss , title , titlecss  , handleOnclick , activeTab , handleActiveTab  } = props
   
    return (
        <button onClick={async e => { 
            handleOnclick(e)
            handleActiveTab(title)
        }} className={`transition-all duration-800 scroll-smooth h-full lg:px-8 lg:py-2 rounded-full cursor-pointer text-pure-greys-100 ${tabcss} ${titlecss} ${title === activeTab ? "bg-custom-primary": ""}`}>
                {title}
        </button>
    );
}

export default Tab;
