import knex from 'knex';
import express from "express";
declare global {
	namespace Express {
		export interface Request {
			db?: knex;
		}
		export interface Response {
			filename?: string;
		}
	}
}
