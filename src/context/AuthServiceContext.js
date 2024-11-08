class AuthService {
  setToken(token) {
    sessionStorage.setItem("token", token);
  }

  getToken() {
    return sessionStorage.getItem("token");
  }

  clearToken() {
    sessionStorage.removeItem("token");
  }

  setRole(role) {
    sessionStorage.setItem("role", role);
  }

  getRole() {
    return sessionStorage.getItem("role");
  }

  clearRole() {
    sessionStorage.removeItem("role");
  }

  setUsername(username) {
    sessionStorage.setItem("username", username);
  }

  getUsername() {
    return sessionStorage.getItem("username");
  }

  clearUsername() {
    sessionStorage.removeItem("username");
  }
}

export default new AuthService();
