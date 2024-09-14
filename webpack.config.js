const path = require('path');

module.exports = {
  // Other Webpack config options
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
