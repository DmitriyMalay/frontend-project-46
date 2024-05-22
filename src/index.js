import fs from 'fs';
// import _ from 'lodash';
import path from 'path';
import getParcedData from '../parcer.js';
import stylish from './stylish.js';
import makeAstTree from './makeAstTree.js';

const getData = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');

const getFormat = (filepath) => path.extname(filepath).split('.')[1];

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const obj1 = getParcedData(data1, getFormat(filepath1));
  const obj2 = getParcedData(data2, getFormat(filepath2));
  const tree = makeAstTree(obj1, obj2);
  return stylish(tree);
};

export default genDiff;
