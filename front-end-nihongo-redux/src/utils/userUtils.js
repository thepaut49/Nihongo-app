export const isConnected = () => {
  const token = sessionStorage.getItem("token");
  return token && token !== "undefined" && token.length > 0;
};
