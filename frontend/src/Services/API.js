import axios from "axios";

const API_BASE_URL = "/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const validateToken = async (token) => {
  try {
    const response = await getAccountInformation(token);
    return {
      status: response.status,
      accountInformation: response.accountInformation,
    };
  } catch (error) {
    console.error("Error validating token:", error);
    return { status: false };
  }
};

export const getAccountInformation = async (token) => {
  try {
    if (!token) {
      return { status: false, message: "No token has been found" };
    }

    const response = await api.post("/get-account-information", { token });
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error getting account information:", error);
    return { status: false, message: error.response?.data?.message };
  }
};

export const checkApiStatus = async () => {
  try {
    const response = await api.get("/check-status");
    return response.data.status;
  } catch (error) {
    console.error("Error checking API status:", error);
    return false;
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(
      "Error during login:",
      error.response?.data?.message || error.message
    );
    return {
      status: false,
      message: error.response?.data?.message,
    };
  }
};

export const requestPasswordChange = async (username) => {
  try {
    const response = await api.post("/request-password-change", { username });
    return response.data;
  } catch (error) {
    console.error(
      "Error requesting password change:",
      error.response?.data?.message || error.message
    );
    return {
      status: false,
      message: error.response?.data?.message,
    };
  }
};

export const changePassword = async (username, password, token) => {
  try {
    const response = await api.post("/change-password", {
      username,
      password,
      token,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error changing password:",
      error.response?.data?.message || error.message
    );
    return {
      status: false,
      message: error.response?.data?.message,
    };
  }
};

export const getUserSpreadsheet = async (type) => {
  try {
    const response = await api.get(`/clients/user-spreadsheet/${type}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting user spreadsheet:",
      error.response?.data?.message || error.message
    );
    return {
      status: false,
      message: error.response?.data?.message,
    };
  }
};

export const getUserSpreadsheetColumns = async (type) => {
  try {
    const response = await api.get(`/clients/user-columns-spreadsheet/${type}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting user spreadsheet columns:",
      error.response?.data?.message || error.message
    );
    return {
      status: false,
      message: error.response?.data?.message,
    };
  }
};

export const getUserSpreadsheetData = async (type) => {
  try {
    const response = await api.get(`/clients/user-spreadsheet-data/${type}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting user spreadsheet data:",
      error.response?.data?.message || error.message
    );
    return {
      status: false,
      message: error.response?.data?.message,
    };
  }
};

export const createSpreadsheet = async (type) => {
  if (type === "normal") {
    try {
      const response = await api.post(`/clients/create-normal-spreadsheet`);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating user normal spreadsheet:",
        error.response?.data?.message || error.message
      );
      return {
        status: false,
        message: error.response?.data?.message,
      };
    }
  } else if (type === "order") {
    try {
      const response = await api.post(`/clients/create-order-spreadsheet`);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating user order spreadsheet:",
        error.response?.data?.message || error.message
      );
      return {
        status: false,
        message: error.response?.data?.message,
      };
    }
  }
};
