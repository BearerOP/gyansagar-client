export const getToken = () => {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      return authToken;
    } else {
      return null;
    }
  };
  