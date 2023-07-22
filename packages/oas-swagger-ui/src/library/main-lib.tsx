// @ts-ignore
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { Operation } from './plugin-overrides/Operation.js';
import { DefaultSwaggerUiConfig, OasSwaggerUiConfig } from './types.js';

export function OasSwaggerUi({
  swaggerConfig,
  oasSwaggerUiConfig
}: {
  swaggerConfig: DefaultSwaggerUiConfig;
  oasSwaggerUiConfig?: OasSwaggerUiConfig;
}) {
  const plugins = {
    wrapComponents: {
      operation: () => (props: any) =>
        (
          <Operation
            {...props}
            oasSwaggerUiSecurityConfig={oasSwaggerUiConfig?.security}
          />
        )
    }
  };

  return <SwaggerUI {...swaggerConfig} plugins={plugins} />;
}
