import path from 'path'
import gulp from 'gulp4'
import webpack from 'webpack'
import process from 'process'
import watch from 'gulp-watch'
const isProduction = (process.env.NODE_ENV === 'production')

export const config = {
  entry: './index.js',
  mode: isProduction ? "production" : "development",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../docs')
  },
  context: path.resolve(__dirname, '../src/docs'),
  optimization: {
    minimize: isProduction ? true : false
  },
  module: {
    rules: []
  },
  plugins: [],
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules']
  }
}

export const bundleDocs = () => {
  return new Promise(resolve => webpack(config, (err, stats) => {
    if(err) console.log('Webpack', err)
    console.log(stats.toString({ /* stats options */ }))
    resolve()
  }))
}

export const copyStatic = () => {
  return gulp.src(['./src/docs/**/*.html'])
  .pipe(gulp.dest("./docs"))
}

export const watchStatic = () => {
  return watch('./src/docs/**/*.html', () => {
    gulp.src('./src/docs/**/*.html')
      .pipe(gulp.dest("./docs"))
  })
}

export const watchDocs = () => {
  return new Promise(resolve => webpack(
    Object.assign({}, config, {watch: true}),
    (err, stats) => {
      if(err) console.log('Webpack', err)
      console.log(stats.toString({ /* stats options */ }))
      resolve()
    }
  ))
}

export const watchAll = gulp.parallel(watchStatic, watchDocs)
