import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

window.renderSwaggerUi = ({ swaggerConfig, oasSwaggerUiConfig }) => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App
        swaggerConfig={swaggerConfig}
        oasSwaggerUiConfig={oasSwaggerUiConfig}
      />
    </React.StrictMode>
  );
};
