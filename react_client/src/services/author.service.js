import http from "../http-common";

class AuthorDataService {
  getAll() {
    debugger;
    return http.get("/authors");
  }

  get(id) {
    return http.get(`/authors/${id}`);
  }

  create(data) {
    return http.post("/authors", data);
  }

  update(id, data) {
    return http.put(`/authors/${id}`, data);
  }

  delete(id) {
    return http.delete(`/authors/${id}`);
  }

  deleteAll() {
    return http.delete(`/authors`);
  }

  findByName(title) {
    return http.get(`/authors?title=${title}`);
  }
}

export default new AuthorDataService();