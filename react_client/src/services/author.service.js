import http from "../http-common";

class AuthorDataService {
  getAll() {
    debugger;
    return http.get("/authors");
  }

  get(id) {
    return http.get(`/authors/${id}`);
  }

  create(author) {
    return http.post("/authors", author);
  }

  update(id, author) {
    return http.put(`/authors/${id}`, author);
  }

  delete(id) {
    return http.delete(`/authors/${id}`);
  }

  deleteAll() {
    return http.delete(`/authors`);
  }

  findByName(name) {
    return http.get(`/authors?name=${name}`);
  }
}

export default new AuthorDataService();