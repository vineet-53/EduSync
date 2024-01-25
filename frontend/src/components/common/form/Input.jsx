import React from 'react';

const Input = (props) => {
    const {labelName , inputcss   ,  placeholder , id , type , value , handleEvent } = props
    return (

        <li className={'flex flex-col gap-2  text-richblack-100 ' + inputcss}>
            {labelName ? <label htmlFor={id}>{labelName}
            <span className='text-pink-400'> *</span>
            </label>  : ""  }
            <input className={'bg-custom-tertiary text-white  px-4 py-2 rounded-md ' + inputcss } value = {value} type={`${type ? type : "text"}`} id={id} placeholder={placeholder} onChange={handleEvent} maxLength={id === "phone" ? 10 : ""} />
        </li>
    );
}

export default Input;
