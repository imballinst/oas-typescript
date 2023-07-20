import { OasSwaggerUi } from '@oas-typescript/swagger-ui';
import '@oas-typescript/swagger-ui/lib/style.css';

const AUTH_MAP_TO_STRING: Record<string, string> = {
  petstore_auth: 'Required pet store scope: '
};

function App() {
  return (
    <OasSwaggerUi
      swaggerConfig={{
        url: './api.json',
        deepLinking: true
      }}
      oasSwaggerUiConfig={{
        security: {
          badgesField: 'x-security',
          badgesDefaultValue: [{ label: 'Authorization required' }],
          badgesProcessFn: (securityKey, security) => {
            if (!security) return [];

            const badges = [];
            for (const key in security) {
              const val = security[key];
              badges.push({
                label: AUTH_MAP_TO_STRING[securityKey],
                value: val
              });
            }

            return badges;
          }
        }
      }}
    />
  );
}

export default App;
