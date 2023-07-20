import { ComponentProps } from 'react';
import { OasSwaggerUi } from './library/main-lib';

function App({
  swaggerConfig,
  oasSwaggerUiConfig
}: ComponentProps<typeof OasSwaggerUi>) {
  return (
    <OasSwaggerUi {...swaggerConfig} oasSwaggerUiConfig={oasSwaggerUiConfig} />
  );
}

export default App;
