// @ts-ignore
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { Operation } from './plugin-overrides/Operation.js';
import { OasSwaggerUiConfig } from './plugin-overrides/types.js';

export function OasSwaggerUi({
  swaggerConfig,
  oasSwaggerUiConfig
}: {
  swaggerConfig: any;
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
