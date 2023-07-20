import React from 'react';

declare global {
  interface Window {
    swaggerUiConfig?: {
      url?: string;
    };
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
  }
}

export {};
