export const getBaseUrl = (): string => {
  return (
    `${process.env.NEXT_PUBLIC_BACKEND_URL}` || `http://localhost:3002/api/v1`
  );
};
