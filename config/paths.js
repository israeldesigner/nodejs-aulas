const path = require('path')

module.exports = {
  // Source files
  frontend: path.resolve(__dirname, '../frontend'),

  // Production build files
  build: path.resolve(__dirname, '../dist'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),
}
