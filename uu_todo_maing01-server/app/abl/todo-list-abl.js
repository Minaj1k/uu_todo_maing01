"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { SysProfileModel } = require("uu_appg01_server").Workspace;
const Errors = require("../api/errors/todo-list-error.js");

const { LoggerFactory } = require("uu_appg01_server").Logging;
const logger = LoggerFactory.get("Abl.TodoListAbl");

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
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  }
};

class TodoListAbl {
  constructor() {
    this.validator = Validator.load();
    this.itemDao = DaoFactory.getDao("item");
    this.listDao = DaoFactory.getDao("list");
  }

  async create(awid, dtoIn) {

    let validationResult = this.validator.validate("listCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    dtoIn.awid = awid;

    let dtoOut = {};
    try {
      dtoOut.list = await this.listDao.create(dtoIn);
    } catch (e) {
      throw new Errors.Create.listDaoCreateFailed({uuAppErrorMap});
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async get(awid, dtoIn) {

    let validationResult = this.validator.validate("listGetDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut = {};
    try {
      let list = await this.listDao.get(awid,dtoIn.id);
      if (list === null){
        throw new Errors.Get.listDoesNotExist({uuAppErrorMap, id: dtoIn.id});
      } else {
        dtoOut.list = list;
      }
    } catch (e) {
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async update(awid, dtoIn) {

    let validationResult = this.validator.validate("listUpdateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let updatedList = {};
    updatedList.id = dtoIn.list;
    updatedList.awid = awid;
    if (dtoIn.name) updatedList.name = dtoIn.name;

    let dtoOut = {};
    try {
      dtoOut.list = await this.listDao.update(updatedList);
    } catch (e) {
      throw new Errors.Update.listDaoUpdateFailed({uuAppErrorMap});
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(awid, dtoIn) {

    let validationResult = this.validator.validate("listDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    if (dtoIn.forceDelete == null) dtoIn.forceDelete = false;

    let itemListResult;
    try {
      itemListResult = await this.itemDao.listByListAndCompleted(awid, dtoIn.id);
    } catch (e) {
      throw new Errors.Delete.listDaoDeleteFailed({uuAppErrorMap});
    }

    if (itemListResult.itemList.length > 0 && dtoIn.forceDelete == true){
      for (let item of itemListResult.itemList){
        try {
          await this.itemDao.delete(item.awid, item.id);
        } catch (e) {
          throw new Errors.Delete.itemDaoDeleteFailed({uuAppErrorMap});
        }
      }
      try {
        await this.listDao.delete(awid,dtoIn.id);
      } catch (e) {
        throw new Errors.Delete.listDaoDeleteFailed({uuAppErrorMap});
      }

    } else if (itemListResult.itemList.length > 0 && dtoIn.forceDelete == false) {
      throw new Errors.Delete.listNotEmpty({uuAppErrorMap});
    } else {
      try {
        await this.listDao.delete(awid,dtoIn.id);
      } catch (e) {
        throw new Errors.Delete.listDaoDeleteFailed({uuAppErrorMap});
      }
    }

    let dtoOut = {};

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async list(awid, dtoIn) {

    let validationResult = this.validator.validate("listListDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let dtoOut = {};

    try {
      dtoOut = await this.listDao.list(awid, dtoIn.pageInfo);
    } catch (e) {
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }


}

module.exports = new TodoListAbl();
