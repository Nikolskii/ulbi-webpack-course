import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { BuildOptions } from './types/types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // 'style-loader' creates `style` nodes from JS strings
      // MiniCssExtractPlugin extracts CSS into separate files
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader', // Translates CSS into CommonJS
      'sass-loader' // Compiles Sass to CSS
    ]
  };

  const tsLoader = {
    // ts-loader умеет обрабатывать JSX,
    // без использования TS нужен babel-loader
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  };

  return [
    // Порядок имеет значение
    scssLoader,
    tsLoader
  ];
}