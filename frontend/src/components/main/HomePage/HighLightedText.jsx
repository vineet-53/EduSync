import React from 'react';

const HighLightedText = ({text , spanTextcss}) => {
    return (
        <span className={`bg-clip-text ${spanTextcss ? spanTextcss : "bg-gradient-to-tr from-blue-400 from-10% to-100% via-blue-200 to-blue-100 "} `}>
            <span className='text-transparent '>
                    {text}
            </span>
        </span>
    );
}

export default HighLightedText;
