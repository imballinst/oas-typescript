export interface OasSwaggerUiSecurityConfig {
  badgesField?: string;
  badgesDefaultValue?: Array<{ label: string; value: string }>;
  badgesProcessFn?: (
    securityKey: string,
    value?: string[]
  ) => Array<{ label: string; value: string }>;
}

export interface OasSwaggerUiConfig {
  security?: OasSwaggerUiSecurityConfig;
}
