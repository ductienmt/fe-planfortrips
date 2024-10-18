const handleToken = {
  // Function to save the token in session storage
  save: (token) => {
    sessionStorage.setItem("accessToken", token);
  },

  // Function to delete the token from session storage
  delete: () => {
    sessionStorage.removeItem("accessToken");
  },

  // Function to set a timeout for the token
  setTimeout: (duration) => {
    setTimeout(() => {
      handleToken.delete();
    }, duration);
  },
};

export default handleToken;
