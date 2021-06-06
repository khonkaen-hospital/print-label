import Knex from 'knex';

export default class HisModel {

	public tableName = 'view_ipd_ipd';

	getVaccineBySn(knex: Knex, sn: Array<any>) {
		return knex('immunization_center.vaccine_dose')
			.leftJoin('immunization_center.vaccine_manufacturer', 'immunization_center.vaccine_manufacturer.vaccine_manufacturer_id', 'immunization_center.vaccine_dose.vaccine_manufacturer_id')
			.whereIn('vaccine_serial_no', sn);
	}

	getIpdByAn(knex: Knex, an: string) {
		return knex('view_ipd_ipd')
			.select('hn', 'an', 'vn', 'title', 'name', 'surname', 'ward_name', 'age', 'age_type')
			.where({ an: an }).first();
	}

	async getVaccines(db: Knex, sn: string) {
		let response = await this.getIpdByAn(db, sn);
		if (response) {
			let ageName = this.getAgeType(response.age_type);
			return {
				fullname: response.title + response.name + ' ' + response.surname,
				age: response.age + ' ' + ageName,
				ward: response.ward_name,
				hn: response.hn + '',
				an: response.an + ''
			};
		} else {
			return null;
		}
	}

	async getIpdLabel(db: Knex, an: string) {
		let response = await this.getIpdByAn(db, an);
		if (response) {
			let ageName = this.getAgeType(response.age_type);
			return {
				fullname: response.title + response.name + ' ' + response.surname,
				age: response.age + ' ' + ageName,
				ward: response.ward_name,
				hn: response.hn + '',
				an: response.an + ''
			};
		} else {
			return null;
		}
	}

	getOpdByVn(knex: Knex, vn: string) {
		return knex('view_opd_visit')
			.select('hn', 'vn', 'title', 'name', 'surname', 'dep_name', 'age', 'age_type')
			.where({ vn: vn }).first();
	}

	async getOpdLabel(db: Knex, vn: string) {
		let response = await this.getOpdByVn(db, vn);
		if (response) {
			return {
				fullname: response.title + response.name + ' ' + response.surname,
				hn: response.hn + ''
			};
		} else {
			return null;
		}
	}

	getAgeType(age_type: number): string {
		let age = [{ id: 1, name: 'ปี' }, { id: 2, name: 'เดือน' }, { id: 3, name: 'วัน' }];
		let ageObject = age.find(v => v.id === age_type)
		return ageObject?.name || '';
	}
}
