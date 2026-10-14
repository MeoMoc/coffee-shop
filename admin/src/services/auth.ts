import api from "../utils/request";

const authService = {
  register: async (username, email, password, role = "ADMIN") => {
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
        role,
      });
      const token = response.data;
      if (token) {
        localStorage.setItem("token", token);
      }
      return { success: true, token };
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      return { success: false, error: error.response?.data || error.message };
    }
  },

  login: async (username, password) => {
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });
      const token = response.data;
      if (token) {
        localStorage.setItem("token", token);
      }
      return { success: true, token };
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return { success: false, error: error.response?.data || error.message };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default authService;
