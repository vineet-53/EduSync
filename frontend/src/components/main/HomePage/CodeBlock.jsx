import React from 'react';
import { Title , SubTitle , PrimaryButton} from "../../common" 
import TypeAnimationBox from './TypeAnimationBox';
const CodeBlock = (props) => {
    const { beforeSpanText, afterSpanText, spanText, subTitle, buttonText1, buttonText2, animationText, animationContainerGradient, backgroundGradient, reverse, titlecss } = props
    return (
        <div className={`flex flex-col lg:flex-row gap-10 lg:justify-between  ${reverse ? "lg:flex-row-reverse" : ""}`}>
            <div className='flex flex-col lg:w-3/6 lg:pr-24'>
                <div className='flex flex-col gap-4 '>
                    <Title
                        beforeSpanText={beforeSpanText}
                        afterSpanText={afterSpanText}
                        spanText={spanText}
                        titlecss={titlecss}
                    />
                    <SubTitle
                        subTitle={subTitle}
                    />
                </div>
                <div className='flex gap-4 py-5 w-full '>
                    <PrimaryButton hasArrow={true} linkto="/signup" isActive={true} >
                        {buttonText1}
                    </PrimaryButton>
                    <PrimaryButton linkto="/login" textColor='text-white'>
                        {buttonText2}
                    </PrimaryButton>
                </div>
            </div>
            <TypeAnimationBox
                animationContainerGradient={animationContainerGradient}
                backgroundGradient={backgroundGradient}
                animationText={animationText}
            />
        </div>
    );
}

export default CodeBlock;
