/* eslint-disable @typescript-eslint/no-var-requires */
const reducerGenerator = require('./reducerGenerator.js');
const componentGenerator = require('./componentGenerator.js');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('reducer', reducerGenerator);
};
