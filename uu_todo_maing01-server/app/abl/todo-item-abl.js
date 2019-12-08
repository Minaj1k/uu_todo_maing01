"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { SysProfileModel } = require("uu_appg01_server").Workspace;
const Errors = require("../api/errors/todo-item-error.js");

//const { LoggerFactory } = require("uu_appg01_server").Logging;
//const logger = LoggerFactory.get("Abl.JokesMainAbl");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  },
  completeUnsupportedKeys: {
    code: `${Errors.Complete.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  }

};

class TodoItemAbl {
  constructor() {
    this.validator = Validator.load();
    this.itemDao = DaoFactory.getDao("item");
    this.listDao = DaoFactory.getDao("list");
  }

  async create(awid, dtoIn) {

    let validationResult = this.validator.validate("itemCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // TODO - list has to exist!
    // let listExist;
    // try {
    //   listExist = await this.listDao.get(dtoIn.list);
    // } catch (e) {
    //   throw e;
    // }
    // if (!listExist){
    //    throw new Errors.List.listDoesNotExist({uuAppErrorMap});
    // }


    dtoIn.awid = awid;
    dtoIn.completed = false;

    let dtoOut = {};
    try {
      dtoOut.item = await this.itemDao.create(dtoIn);
    } catch (e) {
      throw new Errors.Create.itemDaoCreateFailed({uuAppErrorMap});
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async get(awid, dtoIn) {

    let validationResult = this.validator.validate("itemGetDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut = {};
    try {
      let item = await this.itemDao.get(awid,dtoIn.id);
      if (item === null){
        throw new Errors.Get.itemDoesNotExist({uuAppErrorMap, id: dtoIn.id});
      } else {
        dtoOut.item = item;
      }
    } catch (e) {
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async update(awid, dtoIn) {

    let validationResult = this.validator.validate("itemUpdateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let updatedItem = {};
    updatedItem.id = dtoIn.item;
    updatedItem.awid = awid;
    if (dtoIn.list) updatedItem.list = dtoIn.list;
    if (dtoIn.text) updatedItem.text = dtoIn.text;

    let dtoOut = {};
    try {
      dtoOut.item = await this.itemDao.update(updatedItem);
    } catch (e) {
      throw new Errors.Update.itemDaoUpdateFailed({uuAppErrorMap});
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async complete(awid, dtoIn) {

    let validationResult = this.validator.validate("itemCompleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.completeUnsupportedKeys.code,
      Errors.Complete.InvalidDtoIn
    );

    let dtoOut = {};
    try {
      dtoOut.item = await this.itemDao.setCompleted(awid, dtoIn.item, dtoIn.completed);
    } catch (e) {
      throw new Errors.Complete.itemDaoSetCompletedFailed({uuAppErrorMap});
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(awid, dtoIn) {

    let validationResult = this.validator.validate("itemDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    let dtoOut = {};
    try {
      await this.itemDao.delete(awid,dtoIn.id);
    } catch (e) {
      throw new Errors.Delete.itemDaoDeleteFailed({uuAppErrorMap});
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async list(awid, dtoIn) {

    let validationResult = this.validator.validate("itemListDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let dtoOut = {};
    if (dtoIn.list != null || dtoIn.completed != null) {
      try {
        dtoOut = await this.itemDao.listByListAndCompleted(awid, dtoIn.list, dtoIn.completed, dtoIn.pageInfo);
      } catch (e) {
        throw e;
      }
    } else {
      try {
        dtoOut = await this.itemDao.list(awid, dtoIn.pageInfo);
      } catch (e) {
        throw e;
      }
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }


}

module.exports = new TodoItemAbl();
