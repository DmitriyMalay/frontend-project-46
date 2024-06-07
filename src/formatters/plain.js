import _ from 'lodash';

const checkValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getFormatPlain = (data) => {
  const iter = (tree, path = '') => {
    const result = tree.filter((type) => type.status !== 'unchanged')
      .map((node) => {
        const fullPath = `${path}${node.key}`;
        switch (node.status) {
          case 'added':
            return `Property '${fullPath}' was added with value: ${checkValue(node.value)}`;
          case 'deleted':
            return `Property '${fullPath}' was removed`;
          case 'changed':
            return `Property '${fullPath}' was updated. From ${checkValue(node.oldValue)} to ${checkValue(node.newValue)}`;
          case 'nested':
            return iter(node.children, `${fullPath}.`);
          default:
            throw new Error(`This type doesn't exist: ${node.status}`);
        }
      });
    return result.join('\n');
  };
  return iter(data);
};

export default getFormatPlain;
