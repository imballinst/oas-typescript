// Original source from https://github.com/swagger-api/swagger-ui/tree/master.
// All credits belong to Swagger UI maintainers and contributors.
//
// This file is adjusted so that the Operation component can be overriden, because as it is,
// it is super hard to inject a plugin to a specific part in the description.
import { PureComponent } from 'react';
import {
  getExtensions,
  sanitizeUrl,
  escapeDeepLinkPath,
  getList
} from './core/utils.ts';
import { safeBuildUrl } from './core/utils/url.ts';
import { List } from 'immutable';

import loadingIcon from './img/rolling-load.svg';
import './Operation.css';
import { OasSwaggerUiSecurityConfig } from '../types.ts';

export class Operation extends PureComponent<any> {
  static defaultProps = {
    operation: null,
    response: null,
    request: null,
    specPath: List(),
    summary: ''
  };

  render() {
    let {
      specPath,
      response,
      request,
      toggleShown,
      onTryoutClick,
      onResetClick,
      onCancelClick,
      onExecute,
      fn,
      getComponent,
      getConfigs,
      specActions,
      specSelectors,
      authActions,
      authSelectors,
      oas3Actions,
      oas3Selectors,
      oasSwaggerUiSecurityConfig
    } = this.props;
    let operationProps = this.props.operation;

    let {
      deprecated,
      isShown,
      path,
      method,
      op,
      tag,
      operationId,
      allowTryItOut,
      displayRequestDuration,
      tryItOutEnabled,
      executeInProgress
    } = operationProps.toJS();

    let { description, externalDocs, schemes } = op;

    const externalDocsUrl = externalDocs
      ? safeBuildUrl(externalDocs.url, specSelectors.url(), {
          selectedServer: oas3Selectors.selectedServer()
        })
      : '';
    let operation = operationProps.getIn(['op']);
    let responses = operation.get('responses');
    let security = operation.get('security');
    let parameters = getList(operation, ['parameters']);
    let operationScheme = specSelectors.operationScheme(path, method);
    let isShownKey = ['operations', tag, operationId];
    let extensions = getExtensions(operation);

    const Responses = getComponent('responses');
    const Parameters = getComponent('parameters');
    const Execute = getComponent('execute');
    const Clear = getComponent('clear');
    const Collapse = getComponent('Collapse');
    const Markdown = getComponent('Markdown', true);
    const Schemes = getComponent('schemes');
    const OperationServers = getComponent('OperationServers');
    const OperationExt = getComponent('OperationExt');
    const OperationSummary = getComponent('OperationSummary');
    const Link = getComponent('Link');

    const showExtensions = true;

    // Merge in Live Response
    if (responses && response && response.size > 0) {
      let notDocumented =
        !responses.get(String(response.get('status'))) &&
        !responses.get('default');
      response = response.set('notDocumented', notDocumented);
    }

    let onChangeKey = [path, method]; // Used to add values to _this_ operation ( indexed by path and method )

    const validationErrors = specSelectors.validationErrors([path, method]);

    return (
      <div
        className={
          deprecated
            ? 'opblock opblock-deprecated'
            : isShown
            ? `opblock opblock-${method} is-open`
            : `opblock opblock-${method}`
        }
        id={escapeDeepLinkPath(isShownKey.join('-'))}
      >
        <OperationSummary
          operationProps={operationProps}
          isShown={isShown}
          toggleShown={toggleShown}
          getComponent={getComponent}
          authActions={authActions}
          authSelectors={authSelectors}
          specPath={specPath}
        />
        <Collapse isOpened={isShown}>
          <div className="opblock-body">
            {(operation && operation.size) || operation === null ? null : (
              <img
                height={'32px'}
                width={'32px'}
                src={loadingIcon}
                className="opblock-loading-animation"
              />
            )}
            {deprecated && (
              <h4 className="opblock-title_normal"> Warning: Deprecated</h4>
            )}
            {description && (
              <div className="opblock-description-wrapper">
                <div className="opblock-description">
                  <SecurityBadges
                    extensions={extensions}
                    security={security}
                    oasSwaggerUiSecurityConfig={oasSwaggerUiSecurityConfig}
                  />

                  <Markdown source={description} />
                </div>
              </div>
            )}
            {externalDocsUrl ? (
              <div className="opblock-external-docs-wrapper">
                <h4 className="opblock-title_normal">Find more details</h4>
                <div className="opblock-external-docs">
                  {externalDocs.description && (
                    <span className="opblock-external-docs__description">
                      <Markdown source={externalDocs.description} />
                    </span>
                  )}
                  <Link
                    target="_blank"
                    className="opblock-external-docs__link"
                    href={sanitizeUrl(externalDocsUrl)}
                  >
                    {externalDocsUrl}
                  </Link>
                </div>
              </div>
            ) : null}

            {!operation || !operation.size ? null : (
              <Parameters
                parameters={parameters}
                specPath={specPath.push('parameters')}
                operation={operation}
                onChangeKey={onChangeKey}
                onTryoutClick={onTryoutClick}
                onResetClick={onResetClick}
                onCancelClick={onCancelClick}
                tryItOutEnabled={tryItOutEnabled}
                allowTryItOut={allowTryItOut}
                fn={fn}
                getComponent={getComponent}
                specActions={specActions}
                specSelectors={specSelectors}
                pathMethod={[path, method]}
                getConfigs={getConfigs}
                oas3Actions={oas3Actions}
                oas3Selectors={oas3Selectors}
              />
            )}

            {!tryItOutEnabled ? null : (
              <OperationServers
                getComponent={getComponent}
                path={path}
                method={method}
                operationServers={operation.get('servers')}
                pathServers={specSelectors.paths().getIn([path, 'servers'])}
                getSelectedServer={oas3Selectors.selectedServer}
                setSelectedServer={oas3Actions.setSelectedServer}
                setServerVariableValue={oas3Actions.setServerVariableValue}
                getServerVariable={oas3Selectors.serverVariableValue}
                getEffectiveServerValue={oas3Selectors.serverEffectiveValue}
              />
            )}

            {!tryItOutEnabled || !allowTryItOut ? null : schemes &&
              schemes.size ? (
              <div className="opblock-schemes">
                <Schemes
                  schemes={schemes}
                  path={path}
                  method={method}
                  specActions={specActions}
                  currentScheme={operationScheme}
                />
              </div>
            ) : null}

            {!tryItOutEnabled ||
            !allowTryItOut ||
            validationErrors.length <= 0 ? null : (
              <div className="validation-errors errors-wrapper">
                Please correct the following validation errors and try again.
                <ul>
                  {validationErrors.map((error: any, index: number) => (
                    <li key={index}> {error} </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className={
                !tryItOutEnabled || !response || !allowTryItOut
                  ? 'execute-wrapper'
                  : 'btn-group'
              }
            >
              {!tryItOutEnabled || !allowTryItOut ? null : (
                <Execute
                  operation={operation}
                  specActions={specActions}
                  specSelectors={specSelectors}
                  oas3Selectors={oas3Selectors}
                  oas3Actions={oas3Actions}
                  path={path}
                  method={method}
                  onExecute={onExecute}
                  disabled={executeInProgress}
                />
              )}

              {!tryItOutEnabled || !response || !allowTryItOut ? null : (
                <Clear specActions={specActions} path={path} method={method} />
              )}
            </div>

            {executeInProgress ? (
              <div className="loading-container">
                <div className="loading"></div>
              </div>
            ) : null}

            {!responses ? null : (
              <Responses
                responses={responses}
                request={request}
                tryItOutResponse={response}
                getComponent={getComponent}
                getConfigs={getConfigs}
                specSelectors={specSelectors}
                oas3Actions={oas3Actions}
                oas3Selectors={oas3Selectors}
                specActions={specActions}
                produces={specSelectors.producesOptionsFor([path, method])}
                producesValue={specSelectors.currentProducesFor([path, method])}
                specPath={specPath.push('responses')}
                path={path}
                method={method}
                displayRequestDuration={displayRequestDuration}
                fn={fn}
              />
            )}

            {!showExtensions || !extensions.size ? null : (
              <OperationExt
                extensions={extensions}
                getComponent={getComponent}
              />
            )}
          </div>
        </Collapse>
      </div>
    );
  }
}

// Composing components.
function SecurityBadges({
  extensions,
  security,
  oasSwaggerUiSecurityConfig
}: {
  extensions: any;
  security: any;
  oasSwaggerUiSecurityConfig: OasSwaggerUiSecurityConfig;
}) {
  const { badgesField, badgesDefaultValue, badgesProcessFn } =
    oasSwaggerUiSecurityConfig || {};

  if (!extensions.size) return null;
  if (!badgesField || !badgesProcessFn) return null;

  const securityBadges: Array<{ label: string; value?: string }> =
    badgesDefaultValue ? [...badgesDefaultValue] : [];
  const securityArray: any = badgesField.startsWith('x-')
    ? extensions.get(badgesField)
    : security;

  // So the form is like this:
  // [{ petstore_auth: [scopes/permissions] }]
  //
  // Iterate the first security array...
  securityArray.valueSeq().forEach((v: any) => {
    // Here, we want to extract he key value from each of the outer array element.
    v.entrySeq().forEach((v1: any) => {
      // Hence, ehre we can get [petstore_auth, [scopes/permissions]].
      const [securityKey, imSecurityValue] = v1;

      // Then, we iterate the array.
      securityBadges.push(
        ...badgesProcessFn(securityKey, imSecurityValue.toJS())
      );
    });
  });

  return (
    <div className="description-badge-wrapper">
      {securityBadges.map((item: any) => {
        return (
          <div className="description-badge">
            {item.label}
            {item.value && <code>{item.value}</code>}
          </div>
        );
      })}
    </div>
  );
}
