import gulp from 'gulp4'
import path from 'path'
import process from 'process'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import concat from 'gulp-concat'
import rename from 'gulp-rename'
import gulpIgnore from 'gulp-ignore'

const isProduction = (process.env.NODE_ENV === 'production')

export const bundleComponents = () => {
  return gulp.src('./src/ctrl/index.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(rename({basename:"ctrl-min"}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
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
