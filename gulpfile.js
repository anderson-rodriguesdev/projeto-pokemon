//Adiciona os módulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Compilando o sass, adicionando autoprefixed e dando refresh na pagina
function compilaSass() {
  return gulp
    .src('scss/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}
// gulp.task('sass', compilaSass);
exports.compilaSass = compilaSass;

//função para juntar o javascript
function gulpJs() {
  return gulp
    .src('js/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}
// gulp.task('mainjs', gulpJs);
exports.gulpJs = gulpJs;

//função para plugins
function pluginsJs() {
  return gulp
    .src([
      './js/lib/aos.min.js',
      './js/lib/swiper.min.js',
      './js/lib/axios.min.js',
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}
// gulp.task('pluginjs', pluginsJs);
exports.pluginsJs = pluginsJs;

//função para plugin css
function pluginsCSS() {
  return gulp
    .src('css/lib/*.css')
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}
// gulp.task('plugincss', pluginsCSS);
exports.pluginsCSS = pluginsCSS;

//função para iniciar broswer
function browser() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
}
// gulp.task('browser-sync', browser);
exports.browser = browser;

//função de watch
function watch() {
  gulp.watch('scss/*.scss', compilaSass);
  gulp.watch('js/scripts/*.js', gulpJs);
  gulp.watch('js/lib/*.js', pluginsJs);
  gulp.watch('css/lib/*.css', pluginsCSS);
  gulp.watch('*html').on('change', browserSync.reload);
}
// gulp.task('watch', watch);
exports.watch = watch;

//Tarefa padrão, inicia execução em paralelo
gulp.task(
  'default',
  gulp.parallel(watch, browser, compilaSass, gulpJs, pluginsJs, pluginsCSS),
);
