import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');
test('check default compare', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(
    readFile('expectStylish.txt'),
  );
});

test('check default compare yaml files', () => {
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(readFile('expectStylish.txt'));
});

test('check compare plain format', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(
    readFile('expectPlain.txt'),
  );
});

test('check compare json format', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toEqual(
    readFile('expectJson.txt'),
  );
});
