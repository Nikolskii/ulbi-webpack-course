import { BuildOptions } from '../types/types';

export function buildBabelLoader({ mode }: BuildOptions) {
  const isDev = mode === 'development';

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              runtime: isDev ? 'automatic' : 'classic'
            }
          ]
        ]
      }
    }
  };
}