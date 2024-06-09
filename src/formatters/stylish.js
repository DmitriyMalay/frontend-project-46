import _ from 'lodash';

const spacesCount = 4;
const indent = (depth) => ' '.repeat((depth * spacesCount) - 2);

const makeStringify = (element, spaceCount) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) return data;

    const entries = Object.entries(data);
    const strings = entries.map(([key, value]) => `${indent(depth + 1)}  ${key}: ${iter(value, depth + 1)}`);
    return ['{', ...strings, `${indent(depth)}  }`].join('\n');
  };
  return iter(element, spaceCount);
};

const stylish = (data) => {
  const iter = (tree, depth = 1) => tree.map((node) => {
    const preparedData = (value, symbol) => `${indent(depth)}${symbol} ${node.key}: ${makeStringify(value, depth)}\n`;
    switch (node.status) {
      case 'added':
        return preparedData(node.value, '+');
      case 'deleted':
        return preparedData(node.value, '-');
      case 'unchanged':
        return preparedData(node.value, ' ');
      case 'changed':
        return `${preparedData(node.oldValue, '-')}${preparedData(node.newValue, '+')}`;
      case 'nested':
        return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${indent(depth)}  }\n`;
      default:
        throw new Error(`Type is not defined - ${node.status}`);
    }
  });
  return `{\n${iter(data).join('')}}`;
};

export default stylish;
