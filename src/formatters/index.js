import stylish from './stylish.js';
import getFormatPlain from './plain.js';

const getFormat = (tree, format) => {
  switch (format) {
    case 'plain':
      return getFormatPlain(tree);
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error(`Error: "${format}" - this format is not supported`);
  }
};

export default getFormat;
