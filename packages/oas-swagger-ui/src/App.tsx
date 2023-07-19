// @ts-ignore
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { Operation } from './plugin-overrides/Operation.tsx';

const PLUGINS = {
  wrapComponents: {
    operation: () => Operation
  }
};

const AUTH_MAP_TO_STRING: Record<string, string> = {
  petstore_auth: 'Required pet store scope: '
};

window.securityBadgesField = 'x-security';
window.securityBadgesProcessFn = (securityKey, security) => {
  if (!security) return [];

  const badges: React.ReactNode[] = ['Authorization required'];
  for (const key in security) {
    const val = security[key];
    badges.push(
      <>
        {AUTH_MAP_TO_STRING[securityKey]}
        <code>{val}</code>
      </>
    );
  }

  return badges;
};

function App() {
  return <SwaggerUI url={`./api.json`} plugins={PLUGINS} />;
}

export default App;
