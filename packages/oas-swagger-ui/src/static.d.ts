import React from 'react';

declare global {
  interface Window {
    securityBadgesField?: string;
    securityBadgesDefaultValue?: Array<{ label: string; value: string }>;
    securityBadgesProcessFn?: (
      securityKey: string,
      value?: string[]
    ) => Array<{ label: string; value: string }>;
  }
}

export {};
