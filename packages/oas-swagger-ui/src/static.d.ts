import React from 'react';

declare global {
  interface Window {
    securityBadgesField?: string;
    securityBadgesProcessFn?: (
      securityKey: string,
      value?: string[]
    ) => React.ReactNode[];
  }
}

export {};
