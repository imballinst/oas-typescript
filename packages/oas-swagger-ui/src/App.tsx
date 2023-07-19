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
  return (
    <SwaggerUI
      url={window.oasSwaggerUiConfig?.specUrl || `./api.json`}
      plugins={PLUGINS}
    />
  );
}

export default App;
