import React from 'react';

const ImageContainer = (props) => {
    const {src , alt , backgroundGradient , imagecss} = props
    return (
        <div>
            <img className={`${imagecss} ${backgroundGradient}`} src= {src} alt={alt} />
        </div>
    );
}

export default ImageContainer;
