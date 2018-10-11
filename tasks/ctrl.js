import gulp from 'gulp4'
import path from 'path'
import process from 'process'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import concat from 'gulp-concat'
import rename from 'gulp-rename'
import gulpIgnore from 'gulp-ignore'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

const isProduction = true // (process.env.NODE_ENV === 'production')


export const config = {
  entry: './index.js',
  mode: isProduction ? "production" : "development",
  output: {
    filename: 'ctrl-min.js',
    path: path.resolve(__dirname, '../dist')
  },
  context: path.resolve(__dirname, '../src/ctrl'),
  optimization: {
    minimize: isProduction ? true : false
  },
  devtool: 'source-map',
  module: {
    rules: [ {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  plugins: [],
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules']
  }
}

export const bundleComponents = () => {
  return new Promise(resolve => webpack(config, (err, stats) => {
    if(err) console.log('Webpack', err)
    console.log(stats.toString({ }))
    resolve()
  }))
}

export const transpileComponents = () => {
  return gulp.src("./src/ctrl/*")
    .pipe(gulpIgnore.exclude('index.js'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(rename({prefix:"ctrl-", suffix:"-min"}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
}
