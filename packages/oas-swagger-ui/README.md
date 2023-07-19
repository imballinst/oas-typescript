# oas-swagger-ui

oas-swagger-ui is a customized version of the [Swagger UI distributables](https://github.com/swagger-api/swagger-ui/tree/master/dist). It is built on top of [swagger-ui-react](https://www.npmjs.com/package/swagger-ui-react).

## Demo

https://imballinst.github.io/oas-typescript/oas-swagger-ui

## Installation

Since the original purpose of this package is to customize the Swagger UI distributables, the only way to "install" this package is by copying the [./dist](./dist) package to your project.

## Available customizations

### Showing authorizations and permissions

[Before OAS 3.1.0](https://spec.openapis.org/oas/v3.1.0#patterned-fields-2), we are not allowed to define permissions in the security endpoint object. To help with that, we can define a field called `x-security` (for example), with the exact same form as `security`. This field is following the specification of `security` object in OAS 3.1.0.

> For other security scheme types, the array MAY contain a list of role names which are required for the execution, but are not otherwise defined or exchanged in-band.

As the quote above suggests, previously the array in each of the `security` object only allows OAuth2 scopes. However, with OAS 3.1.0, we can specify things such as required roles, e.g. `admin` (or other authorization-related entries). For example, the following means the endpoint requires the permission `admin:pet`:

```json
{
  "x-security": [
    {
      "authorization": ["admin:pet"]
    }
  ]
}
```

To re-iterate, if you are already using OAS 3.1.0, you won't need to use specification extension, you can just use `security` directly. Now, if we want to use it, we need to define this in our HTML (that loads the Swagger UI).

```html
<script>
  const AUTH_MAP_TO_STRING = {
    petstore_auth: 'Required pet store scope: '
  };

  window.securityBadgesField = 'x-security';
  window.securityBadgesDefaultValue = [{ label: 'Authorization required' }];
  window.securityBadgesProcessFn = (securityKey, security) => {
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
  };
</script>
```

For `oas-swagger-ui` to work with the enhanced view for the security stuff, it needs 3 variables in the `window` scope:

1. `securityBadgesField`: this is to define which field we're going to use.
2. `securityBadgesDefaultValue`: this is to define the initial value of the badges, without the scopes/permissions stuff. This defaults to `[]` when not defined.
3. `securityBadgesProcessFn`: this is the function to process the security field.

Then, run the UI and see that there will be badges above each of the endpoint description!
