import _ from 'lodash';

const makeAstTree = (obj1, obj2) => {
  const allKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(allKeys);
  const preparedData = [];
  sortedKeys.forEach((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (value1 === undefined && value2 !== undefined) {
      preparedData.push({
        key,
        value: value2,
        status: 'added',
      });
    } else if (value1 !== undefined && value2 === undefined) {
      preparedData.push({
        key,
        value: value1,
        status: 'deleted',
      });
    } else if (!_.isEqual(value1, value2)) {
      preparedData.push({
        key,
        value1,
        value2,
        status: 'changed',
      });
    } else if (value1 === value2) {
      preparedData.push({
        key,
        value: value1,
        status: 'unchanged',
      });
    }
  });

  const result = preparedData.map((node) => {
    if (node.status === 'added') {
      return `+ ${node.key}: ${node.value}`;
    }
    if (node.status === 'deleted') {
      return `- ${node.key}: ${node.value}`;
    }
    if (node.status === 'changed') {
      return `- ${node.key}: ${node.value1}\n+ ${node.key}: ${node.value2}`;
    }
    if (node.status === 'unchanged') {
      return `  ${node.key}: ${node.value}`;
    }
    return `${node.key}: ${node.value}`;
  });
  return `{\n${result.join('\n')}\n}`;
};

export default makeAstTree;
