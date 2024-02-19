import React from 'react';

const Feature = (props) => {
    const {logoImage , title , subTitle} = props
    return (
        <div className='flex gap-5 items-center'>
            <div>
                <img src={logoImage} className=' rounded-full w-[30px] h-[30px] ' />
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='font-bold'>{title}</h3>
                <p>{subTitle}</p>
            </div>

        </div>
    );
}

export default Feature;
