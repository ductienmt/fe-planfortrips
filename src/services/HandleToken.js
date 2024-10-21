const handleToken = {
  // Function to save the token in session storage
  save: (token, username, role) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
  },

  // Function to delete the token from session storage
  delete: () => {
    localStorage.clear();
  },

  // Function to set a timeout for the token
  setTimeout: (duration) => {
    setTimeout(() => {
      handleToken.delete();
    }, duration);
  },
};

export default handleToken;
