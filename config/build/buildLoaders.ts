import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';

import { BuildOptions } from './types/types';
import { buildBabelLoader } from './babel/buildBabelLoader';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource'
  };

  const svgLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true
          // svgoConfig: {
          //   plugins: [
          //     {
          //       name: 'convertColors',
          //       params: {
          //         currentColor: true
          //       }
          //     }
          //   ]
          // }
        }
      }
    ]
  };

  const cssLoaderWithModule = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
      }
    }
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // 'style-loader' creates `style` nodes from JS strings
      // MiniCssExtractPlugin extracts CSS into separate files
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoaderWithModule, // Translates CSS into CommonJS
      'sass-loader' // Compiles Sass to CSS
    ]
  };

  const tsLoader = {
    // ts-loader умеет обрабатывать JSX,
    // без использования TS нужен babel-loader
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          // Без проверки типов
          transpileOnly: isDev,
          // Enable "Fast Refresh"
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
          })
        }
      }
    ],
    exclude: /node_modules/
  };

  // const babelLoader = {
  //   test: /\.tsx?$/,
  //   exclude: /node_modules/,
  //   use: {
  //     loader: 'babel-loader'
  //   }
  // };

  const babelLoader = buildBabelLoader(options);

  return [
    // Порядок имеет значение
    assetLoader,
    scssLoader,
    // tsLoader,
    babelLoader,
    svgLoader
  ];
}