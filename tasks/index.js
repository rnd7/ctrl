import gulp from 'gulp4'

import { transpileComponents, bundleComponents } from './ctrl'
import { bundleDocs, copyStatic, watchAll } from './docs'

export const build = gulp.parallel(
  transpileComponents,
  bundleComponents,
  copyStatic,
  bundleDocs
)

export const watch = gulp.parallel(
  copyStatic,
  bundleDocs,
  watchAll
)

export default build
