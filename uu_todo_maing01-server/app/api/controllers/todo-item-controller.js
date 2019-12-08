"use strict";
const TodoItemAbl = require("../../abl/todo-item-abl.js");

class TodoItemController {
  create(ucEnv) {
    return TodoItemAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  get(ucEnv) {
    return TodoItemAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  update(ucEnv) {
    return TodoItemAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  complete(ucEnv) {
    return TodoItemAbl.complete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  delete(ucEnv) {
    return TodoItemAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  list(ucEnv) {
    return TodoItemAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new TodoItemController();
