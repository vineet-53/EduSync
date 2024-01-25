import React from 'react';
import HighLightedText from './HighLightedText';
const Title = ({beforeSpanText , spanText , afterSpanText , titlecss , spanTextcss}) => {
    return (
        <h2 className={`font-bold  text-4xl tracking-wide ${titlecss}`}>
                {beforeSpanText}
                <HighLightedText text={spanText} spanTextcss={spanTextcss} />
                {afterSpanText}
        </h2>
    );
}

export default Title;
