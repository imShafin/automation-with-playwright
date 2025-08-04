import dotenv from 'dotenv';
import path from 'path';
import * as fs from "node:fs";

const envFile = `.env.${process.env.ENVIRONMENT || 'dev'}`;
dotenv.config({ path: path.resolve(__dirname, '../env', envFile) });

export const BASE_URL = process.env.BASE_URL || '';

const testDataPath = path.resolve(__dirname, `../env/${process.env.ENVIRONMENT || 'dev'}.json`);
//export const TEST_DATA = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));