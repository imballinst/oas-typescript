import React from 'react';
import { DefaultSwaggerUiConfig, OasSwaggerUiConfig } from './library/types';

declare global {
  interface Window {
    renderSwaggerUi: (param: {
      swaggerConfig: DefaultSwaggerUiConfig;
      oasSwaggerUiConfig?: OasSwaggerUiConfig;
    }) => void;
  }
}

export {};
