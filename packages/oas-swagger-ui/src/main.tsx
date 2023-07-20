import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';

window.renderSwaggerUi = ({ swaggerConfig, oasSwaggerUiConfig }) => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        swaggerConfig={swaggerConfig}
        oasSwaggerUiConfig={oasSwaggerUiConfig}
      />
    </React.StrictMode>,
    document.getElementById('root')!
  );
};
