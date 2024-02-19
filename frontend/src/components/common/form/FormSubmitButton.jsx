import React, { useContext } from 'react';
import { FormSubmitButtonStyle } from '../../../styles/constantsStyles';

const FormSubmitButton = (props) => {
    const { children, buttoncss } = props
    return (
        <button type="submit" className={`${FormSubmitButtonStyle} ${buttoncss}`}>
            {children}
        </button>
    );
}

export default FormSubmitButton;
