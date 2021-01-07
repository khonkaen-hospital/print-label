import knex from 'knex';

export default class HisModel {

	public tableName = 'view_ipd_ipd';

	getIpdByAn(knex: knex, an: string) {
		return knex('view_ipd_ipd')
			.select('hn', 'an', 'vn', 'title', 'name', 'surname', 'ward_name', 'age', 'age_type')
			.where({ an: an }).first();
	}

	async getIpdLabel(knex: knex, an: string) {
		let response = await this.getIpdByAn(knex, an);
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

	getOpdByVn(knex: knex, vn: string) {
		return knex('view_opd_visit')
			.select('hn', 'vn', 'title', 'name', 'surname', 'dep_name', 'age', 'age_type')
			.where({ vn: vn }).first();
	}

	async getOpdLabel(knex: knex, vn: string) {
		let response = await this.getOpdByVn(knex, vn);
		if (response) {
			let ageName = this.getAgeType(response.age_type);
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
