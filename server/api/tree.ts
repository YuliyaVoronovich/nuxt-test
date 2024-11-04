// server/api/tree.ts
import fs from 'fs';
import path from 'path';
import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  const filePath = path.resolve('data/task_json.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
});
