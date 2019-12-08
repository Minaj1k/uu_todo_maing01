"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TodoListMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    let filter = {
      awid: awid,
      id: id
    };
    return await super.findOne(filter);
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async delete(awid, id) {
    return await super.deleteOne({awid, id});
  }

  async list(awid, pageInfo = {pageIndex: 0, pageSize: 1000}) {
    pageInfo.sort = {_id: 1};
    return await super.find({awid}, pageInfo);
  }
}

module.exports = TodoListMongo;
