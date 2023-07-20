import React from 'react';

declare global {
  interface Window {
    renderSwaggerUi: (param: {
      swaggerConfig: any;
      oasSwaggerUiConfig: any;
    }) => void;
  }
}

export {};
