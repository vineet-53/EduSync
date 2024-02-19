import React from 'react';

const SubTitle = ({subTitle , subTitlecss}) => {
    return (
        <p className={`text-richblack-400  ${subTitlecss}`} >
                {subTitle}
        </p>
    );
}

export default SubTitle;
