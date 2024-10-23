const handleToken = {
  save: (token, username, role) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
  },

  delete: () => {
    localStorage.clear();
  },

  setTimeout: (duration) => {
    setTimeout(() => {
      handleToken.delete();
    }, duration);
  },
};

export default handleToken;
