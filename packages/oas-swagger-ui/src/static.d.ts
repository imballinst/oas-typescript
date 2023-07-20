import React from 'react';

declare global {
  interface Window {
    oasSwaggerUiConfig?: {
      security?: {
        badgesField?: string;
        badgesDefaultValue?: Array<{ label: string; value: string }>;
        badgesProcessFn?: (
          securityKey: string,
          value?: string[]
        ) => Array<{ label: string; value: string }>;
      };
    };
    renderSwaggerUi: (param: {
      swaggerConfig: any;
      oasSwaggerUiConfig: any;
    }) => void;
  }
}

export {};
