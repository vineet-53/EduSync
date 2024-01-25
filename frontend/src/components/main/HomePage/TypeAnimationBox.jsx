import React from 'react';
import  {TypeAnimation } from "react-type-animation"
const TypeAnimationBox = ({
  animationText  :codeblock , animationContainerGradient : codeColor , backgroundGradient
} ) => {
    return (
        <div className={`h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 w-full border-4 border-richblack-100 bg-white bg-opacity-5 backdrop-blur-lg rounded drop-shadow-lg lg:w-[470px]`}>
        {/* Indexing */}
          <div className="text-center flex flex-col  w-[10%] select-none text-richblack-400 font-inter font-bold ">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
              <p>11</p>
          </div>  

        {/* Codes */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1 text-richblack-400 `}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
            speed = {1} 
          />
        </div>
      </div>
    );
}

export default TypeAnimationBox;
