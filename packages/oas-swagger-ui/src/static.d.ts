import React from 'react';

declare global {
  interface Window {
    oasSwaggerUiConfig?: {
      url?: string;
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
