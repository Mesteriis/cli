// @flow

import {resolve} from 'path';
import invalidateModuleCache from './invalidate-module-cache';
import {appRoot} from '../constants';
import type BundleConfig from '../@types/config';

export default function buildRollupConfig(config: BundleConfig) {
	invalidateModuleCache(resolve(appRoot, 'dist/rollup.config.js'));
	// eslint-disable-next-line
	const rollupConfig = require(resolve(appRoot, 'dist/rollup.config.js'));

	return rollupConfig({
		input: {
			input: resolve(config.context, config.input),
			treeshake: config.treeshake !== false,
		},
		output: {
			js: resolve(config.context, config.output.js),
			css: resolve(config.context, config.output.css),
			name: config.name,
		},
		plugins: config.plugins,
		cssImages: config.cssImages,
		resolveFilesImport: config.resolveFilesImport,
		context: config.context,
	});
}