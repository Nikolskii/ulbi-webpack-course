import { Configuration } from 'webpack';

export function buildResolves(): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js']
  };
}