import _ from 'lodash';

const spacer = '    ';
const depth = 1;
const indent = (depth) => spacer.repeat(depth);

const makeStringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const keys = Object.keys(data);
  const result = keys.map((key) => `${indent(depth + 1)}${key}: ${makeStringify(data[key], depth + 1)}`);
  return `{\n${result.join('\n')}\n${indent}}`;
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    let result = '';
    if (node.status === 'added') {
      result += `${indent(depth)}+ ${node.key}: ${makeStringify(node.value, depth)}\n`;
    }
    if (node.status === 'deleted') {
      result += `${indent(depth)}- ${node.key}: ${makeStringify(node.value, depth)}\n`;
    }
    if (node.status === 'changed') {
      result += `${indent(depth)}- ${node.key}: ${makeStringify(node.value1, depth)}\n`;
      result += `${indent(depth)}+ ${node.key}: ${makeStringify(node.value2, depth)}\n`;
    }
    if (node.status === 'unchanged') {
      result += `${indent(depth)}  ${node.key}: ${makeStringify(node.value, depth)}\n`;
    }
    if (node.status === 'nested') {
      result += `${indent(depth)}  ${node.key}: {\n${iter(node.value, depth + 1)}\n${indent(depth)}}\n`;
    }
    return result;
  };
  return `{\n${iter(tree, depth)}\n}`;
};

export default stylish;
