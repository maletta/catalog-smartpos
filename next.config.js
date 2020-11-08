const withImages = require('next-images');
const path = require('path');

module.exports = withImages({
  webpack(config, options) {
    config.resolve.modules.push(path.resolve('./src'));
    return config;
  },
});
