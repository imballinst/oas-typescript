export function getQueryParameterString(
  query: Record<string, string | string[] | number | undefined>
) {
  const searchParams = new URLSearchParams();
  for (const name in query) {
    const value = query[name];
    if (!value) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(name, item);
      }
    } else {
      searchParams.append(name, `${value}`);
    }
  }

  return `?${searchParams.toString()}`;
}
