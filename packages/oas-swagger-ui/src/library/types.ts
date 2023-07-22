export interface OasSwaggerUiSecurityConfig {
  badgesField?: string;
  badgesDefaultValue?: Array<{ label: string; value?: string }>;
  badgesProcessFn?: (
    securityKey: string,
    value?: string[]
  ) => Array<{ label: string; value?: string }>;
}

export interface OasSwaggerUiConfig {
  security?: OasSwaggerUiSecurityConfig;
}

interface BaseSwaggerUiConfig {
  layout?: string;
  requestInterceptor?: (req: any) => any;
  responseInterceptor?: (req: any) => any;
  onComplete?: (system: any) => any;
  docExpansion?: 'list' | 'full' | 'none';
  supportedSubmitMethods?: Array<
    'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace'
  >;
  queryConfigEnabled?: boolean;
  plugins?: Array<object> | Array<Function> | Function;
  displayOperationId?: boolean;
  showMutatedRequest?: boolean;
  defaultModelExpandDepth?: number;
  defaultModelsExpandDepth?: number;
  defaultModelRendering?: 'example' | 'model';
  presets?: Array<Function>;
  deepLinking?: boolean;
  showExtensions?: boolean;
  showCommonExtensions?: boolean;
  filter?: string | boolean;
  requestSnippetsEnabled?: boolean;
  requestSnippets?: object;
  tryItOutEnabled?: boolean;
  displayRequestDuration?: boolean;
  persistAuthorization?: boolean;
  withCredentials?: boolean;
  oauth2RedirectUrl?: string;
}

export type DefaultSwaggerUiConfig =
  | BaseSwaggerUiConfig &
      (
        | {
            spec: string | object;
            url?: never;
          }
        | {
            url: string;
            spec?: never;
          }
      );
