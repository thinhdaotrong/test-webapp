var path = require('path');
const { override, fixBabelImports, addWebpackAlias, addLessLoader } = require('customize-cra');

module.exports = function (config, env) {
  return Object.assign(
    config,
    override(
      fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        // style: 'css',
        style: true,
      }),
      addLessLoader({
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: { '@primary-color': '#000', '@heading-color': '#000', '@text-color': '#989898' },
        },
      }),
      // add an alias for "our" imports
      addWebpackAlias({
        ['@hoa/assets']: path.resolve(__dirname, 'src/assets'),
        ['@hoa/components']: path.resolve(__dirname, 'src/components'),
        ['@hoa/config']: path.resolve(__dirname, 'src/config'),
        ['@hoa/containers']: path.resolve(__dirname, 'src/containers'),
        ['@hoa/redux']: path.resolve(__dirname, 'src/redux'),
        ['@hoa/utils']: path.resolve(__dirname, 'src/utils'),
        ['@hoa/lib']: path.resolve(__dirname, 'src/library'),
        ['@hoa/ui']: path.resolve(__dirname, 'src/UI'),
      })
    )(config, env)
  );
};
