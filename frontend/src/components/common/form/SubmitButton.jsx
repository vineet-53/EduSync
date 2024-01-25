import React, { useContext } from 'react';

const FormSubmitButton = (props) => {
    const {children , buttoncss } = props
    return (
        <button type={'submit'}  className={' cursor-pointer bg-yellow-100 px-2 py-2 my-8 rounded-md text-center ' + buttoncss}>
            {children}
        </button>
    );
}

export default FormSubmitButton;
