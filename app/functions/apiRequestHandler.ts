export async function apiRequestHandler<ReturnType>(url: string) {
  const { GYMBEAM_API } = process.env;

  if (GYMBEAM_API === undefined) {
    throw new Error('GYMBEAM_API ENV not set');
  }

  const apiResponse = await fetch(`${GYMBEAM_API}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (apiResponse.ok) {
    return await apiResponse.json() as ReturnType;
  }

  return null;
}