/* eslint-disable no-undef */
// module.exports = {
//   plugins: {
//     'postcss-preset-env': {
//       browsers: 'last 2 versions',
//     },
//     tailwindcss: {},
//   },
// }

const tailwindcss = require('tailwindcss');
module.exports = {
  plugins: [
    'postcss-preset-env',
    tailwindcss
  ],
};
// module.exports = {
//   plugins: [
//       require('tailwind'),
//       require('postcss-preset-env')({ stage: 1 }),
//       require('postcss-mixins'),
//       require('postcss-import')(),
//   ],
// }
// module.exports = {
//   plugins: [
//     require('postcss-preset-env'),
//     require('postcss-grid-system'),
//     require('postcss-aspect-ratio'),
//     require('autoprefixer'),
//   ]
// }