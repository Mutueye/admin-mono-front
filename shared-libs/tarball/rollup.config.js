import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import typescript from '@rollup/plugin-typescript';

const pkg = JSON.parse(readFileSync(path.resolve(cwd(), './package.json')));

const resolve = (_path) => path.resolve(__dirname, _path);

const outputList = [
  {
    file: pkg.main,
    format: 'cjs',
    sourcemap: true,
  },
  {
    file: pkg.module,
    format: 'es',
    sourcemap: true,
  },
];

module.exports = outputList.map((outputData) => {
  const output = {
    file: outputData.file,
    format: outputData.format,
    sourcemap: outputData.sourcemap,
  };
  if (outputData.name) output.name = outputData.name;

  return {
    external: ['tar', 'fs'],
    input: resolve('./index.ts'),
    output,
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
  };
});
