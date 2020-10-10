import api from "./index";

export function getCurrentUser({ ...params }) {
  return api.get("/v1/users/me", { params });
}
