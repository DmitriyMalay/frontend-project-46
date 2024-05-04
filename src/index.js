import fs, { readFile } from 'fs';
import path from 'path';
import parser from '../parcer.js';


const getData = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');
const getFormat = (filepath) => filepath.split('.')[1];

const genDiff = (filepath1, filepath2, format) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  console.log(data1);
  console.log(data2);

  const obj1 = parser(data1, getFormat(filepath1));
  const obj2 = parser(data2, getFormat(filepath2));
  console.log(obj1);
  console.log(obj2);

};

export default genDiff;



