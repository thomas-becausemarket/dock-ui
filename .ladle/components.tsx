import React from 'react'
import type { GlobalProvider } from "@ladle/react";
import { PrimeReactProvider } from "primereact/api";
// import Tailwind from 'primereact/passthrough/tailwind';
import { twMerge } from 'tailwind-merge';

import '../src/globals.css'
import "primereact/resources/themes/lara-light-teal/theme.css";
import 'primeicons/primeicons.css';


export const Provider: GlobalProvider = ({
  children
}) => (
  <PrimeReactProvider value={{ unstyled: false, pt: {}, ptOptions: { mergeSections: true, mergeProps: true, classNameMergeFunction: twMerge } }}>
    {children}
  </PrimeReactProvider>
);