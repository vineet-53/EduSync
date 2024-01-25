import React from 'react';
import Title from './Title';
import SubTitle from './SubTitle';

const  Testimonial = (props) => {
    const {userName , rating, review ,courseName , userImage} = props
    return (
        <div className='px-2 py-4 bg-richblack-800 flex-1'>
            <div>
                <div>
                    <img src={userImage} />
                </div>
                <div>
                    <Title 
                        beforeSpanText={userName}
                        titlecss="text-white font-bold"
                    />
                    <SubTitle
                        subTitle={courseName}
                    />
                </div>
            </div>
            <div>
                {review}
            </div>
            {/* rating */}
            <div>

            </div>
        </div>
    );
}

export default Testimonial;
