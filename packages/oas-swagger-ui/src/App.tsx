// @ts-ignore
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { Operation } from './plugin-overrides/Operation.tsx';

const PLUGINS = {
  wrapComponents: {
    operation: () => Operation
  }
};

function App() {
  const swaggerUiConfig = window.swaggerUiConfig || {};

  return <SwaggerUI {...swaggerUiConfig} plugins={PLUGINS} />;
}

export default App;
