"use strict";
const TodoMainAbl = require("../../abl/todo-main-abl.js");

class TodoMainController {
  init(ucEnv) {
    return TodoMainAbl.init(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new TodoMainController();
