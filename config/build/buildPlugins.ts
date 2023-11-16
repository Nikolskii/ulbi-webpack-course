import path from 'path';
import webpack, { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import { BuildOptions } from './types/types';

export function buildPlugins({ mode, paths, analyzer, platform }: BuildOptions): Configuration['plugins'] {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico')
    }),
    // Подменяет глобальные переменные, которые мы используем в коде на те значения,
    // котоые мы задаем на этапе сборки. Полезно, чтобы не попадал лишний код в сборку.
    // Например, для mobile, когда desktop
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode)
    })
  ];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
    // Выносит проверку типов в отдельный процесс, не нагружая сборку
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshPlugin());
  }

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }));
    plugins.push(new CopyPlugin({
      patterns: [
        {
          from: path.resolve(paths.public, 'locales'),
          to: path.resolve(paths.output, 'locales')
        }
      ]
    }));
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}