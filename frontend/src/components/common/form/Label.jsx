import React from "react";
import { FormLabelStyle } from "../../../styles/constantsStyles";

export default function Label({ htmlFor, children }) {
  return (
    <>
      <label htmlFor={htmlFor} className={FormLabelStyle}>
        {children}
        <span className="text-pink-400"> *</span>
      </label>
    </>
  );
}
