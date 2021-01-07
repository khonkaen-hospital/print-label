"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HisModel {
    constructor() {
        this.tableName = 'view_ipd_ipd';
    }
    getIpdByAn(knex, vn) {
        return knex('view_ipd_ipd').where({ vn: vn }).first();
    }
    getOpdByVn(knex, an) {
        return knex('view_opd_visit').where({ an: an }).first();
    }
}
exports.default = HisModel;
//# sourceMappingURL=his.js.map