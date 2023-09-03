const path = require('path');

module.exports = {
  entry: './public/game.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
};
