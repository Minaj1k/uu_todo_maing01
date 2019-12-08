"use strict";
const TodoMainUseCaseError = require("./todo-main-use-case-error.js");

const Create = {
  UC_CODE: `${TodoMainUseCaseError.ERROR_PREFIX}item/create/`,

  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  listDoesNotExist: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}listDoesNotExist`;
      this.message = "List with given id does not exist.";
    }
  },

  itemDaoCreateFailed: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}itemDaoCreateFailed`;
      this.message = "Add item by item DAO create failed.";
    }
  }
};

const Get = {
  UC_CODE: `${TodoMainUseCaseError.ERROR_PREFIX}item/get/`,

  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  itemDoesNotExist: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}itemDoesNotExist`;
      this.message = "Item with given id does not exist.";
    }
  }
};

const Update = {
  UC_CODE: `${TodoMainUseCaseError.ERROR_PREFIX}item/update/`,

  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  itemDaoUpdateFailed: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}itemDaoUpdateFailed`;
      this.message = "Update item by item DAO update failed.";
    }
  }
};

const Complete = {
  UC_CODE: `${TodoMainUseCaseError.ERROR_PREFIX}item/complete/`,

  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Complete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  itemDaoSetCompletedFailed: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Complete.UC_CODE}itemDaoSetCompletedFailed`;
      this.message = "Update item by item DAO setCompleted failed.";
    }
  }
};

const Delete = {
  UC_CODE: `${TodoMainUseCaseError.ERROR_PREFIX}item/delete/`,

  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  itemDaoDeleteFailed: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}itemDaoDeleteFailed`;
      this.message = "Delete item by item DAO delete failed.";
    }
  }
};

const List = {
  UC_CODE: `${TodoMainUseCaseError.ERROR_PREFIX}item/list/`,

  InvalidDtoIn: class extends TodoMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

module.exports = {
  Create, Get, Update, Complete, Delete, List
};
