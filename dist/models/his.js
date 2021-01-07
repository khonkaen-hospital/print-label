"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class HisModel {
    constructor() {
        this.tableName = 'view_ipd_ipd';
    }
    getIpdByAn(knex, an) {
        return knex('view_ipd_ipd')
            .select('hn', 'an', 'vn', 'title', 'name', 'surname', 'ward_name', 'age', 'age_type')
            .where({ an: an }).first();
    }
    getIpdLabel(knex, an) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.getIpdByAn(knex, an);
            if (response) {
                let ageName = this.getAgeType(response.age_type);
                return {
                    fullname: response.title + response.name + ' ' + response.surname,
                    age: response.age + ' ' + ageName,
                    ward: response.ward_name,
                    hn: response.hn + '',
                    an: response.an + ''
                };
            }
            else {
                return null;
            }
        });
    }
    getOpdByVn(knex, vn) {
        return knex('view_opd_visit')
            .select('hn', 'vn', 'title', 'name', 'surname', 'dep_name', 'age', 'age_type')
            .where({ vn: vn }).first();
    }
    getOpdLabel(knex, vn) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.getOpdByVn(knex, vn);
            if (response) {
                let ageName = this.getAgeType(response.age_type);
                return {
                    fullname: response.title + response.name + ' ' + response.surname,
                    hn: response.hn + ''
                };
            }
            else {
                return null;
            }
        });
    }
    getAgeType(age_type) {
        let age = [{ id: 1, name: 'ปี' }, { id: 2, name: 'เดือน' }, { id: 3, name: 'วัน' }];
        let ageObject = age.find(v => v.id === age_type);
        return (ageObject === null || ageObject === void 0 ? void 0 : ageObject.name) || '';
    }
}
exports.default = HisModel;
//# sourceMappingURL=his.js.map