import React from 'react';

const Line = ({linecss}) => {
    return (
        <div className={'border-solid border-opacity-40 border-l-transparent border-t-transparent border-b-transparent   border-r-2 border-r-richblack-100 bg-richblack-400/0 h-[3rem]  w-[5%] md:w-[2%] lg:w-[3%]  ' + linecss}> 
        </div>
    );
}

export default Line;
