"use strict";
const TodoListAbl = require("../../abl/todo-list-abl.js");

class TodoListController {
  create(ucEnv) {
    //return TodoListAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult().getAuthorizedProfiles());
    return TodoListAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  get(ucEnv) {
    return TodoListAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  update(ucEnv) {
    return TodoListAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  delete(ucEnv) {
    return TodoListAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  list(ucEnv) {
    return TodoListAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new TodoListController();
