export const getCityName = async ({ latitude, longitude }) => {
  const response = await fetch(
    `https://api.api-ninjas.com/v1/reversegeocoding?lat=${latitude}&lon=${longitude}`,
    {
      method: "GET",
      contentType: "application/json",
      headers: {
        "X-Api-Key": "3u0qrd2wfK+eJ+qPqN/+4A==qtzVi9JSTuQ01Nom",
      },
    }
  );
  const data = await response.json();
  return data;
};
