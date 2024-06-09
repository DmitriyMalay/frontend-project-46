import stylish from './stylish.js';
import getFormatPlain from './plain.js';
import getFormatJson from './json.js';

const getFormat = (tree, format) => {
  switch (format) {
    case 'plain':
      return getFormatPlain(tree);
    case 'stylish':
      return stylish(tree);
    case 'json':
      return getFormatJson(tree);
    default:
      throw new Error(`Error: "${format}" - this format is not supported`);
  }
};

export default getFormat;
