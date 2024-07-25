import React from 'react'
import type { GlobalProvider } from "@ladle/react";
import '../src/globals.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';


export const Provider: GlobalProvider = ({
  children
}) => (
 <>
    {children}
  </>
);