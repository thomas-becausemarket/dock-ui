import React from 'react'
import type { GlobalProvider } from "@ladle/react";
import "primereact/resources/themes/lara-light-cyan/theme.css";


export const Provider: GlobalProvider = ({
  children
}) => (
 <>
    {children}
  </>
);