import Knex from 'knex';
import express from "express";
declare global {
	namespace Express {
		export interface Request {
			db?: Knex;
		}
		export interface Response {
			filename?: string | Buffer;
		}
	}
}
