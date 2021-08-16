import http from "../http-common";

export default class CustomerDataService {
  getAll() {
    debugger;
    return http.get("/customers");
  }

  get(id) {
    return http.get(`/customers/${id}`);
  }

  create(author) {
    return http.post("/customers", author);
  }

  update(id, author) {
    return http.put(`/customers/${id}`, author);
  }

  delete(id) {
    return http.delete(`/customers/${id}`);
  }

  deleteAll() {
    return http.delete(`/customers`);
  }

  findByName(name) {
    return http.get(`/customers?name=${name}`);
  }
}