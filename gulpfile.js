const {task,src,dest,watch,series,parallel} = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
// All paths
const paths = {
  index: {src: ['./src/*.html'], dest: './dist/' },
  html: {src: ['./src/html/*.html'], dest: './dist/html/'},
  images: {src: ['./src/images/*'],dest: './dist/images/'},
  css: {src: ['./src/css/*.css'], dest: './dist/css/'},
  // sass: {src: ['./src/sass/**/*.scss'], dest: './src/css/'},
  fonts_ttf: {src: ['./src/fonts/**/*'], dest: './dist/fonts/'},
  fonts_web: {src: ['./src/webfonts/**/*'], dest: './dist/webfonts/'},
  styles: {src: ['./src/scss/**/*.scss'], dest: './dist/scss/'},
  scripts: {src: ['./src/scripts/*.js'],dest: './dist/scripts/'},
  serverdir:"./dist",
};
function mybuild(){
   series(parallel(copyHtml,copySass,copyCss,copyIndex,copyImages,copyScripts));
}
function mywatch(){
   parallel(mybuild,watcher);
}
function copyFontsTtf() {
  return src(paths.fonts_ttf.src)
    .pipe(dest(paths.fonts_ttf.dest));
}
function copyFontsWeb() {
  return src(paths.fonts_web.src)
    .pipe(dest(paths.fonts_web.dest));
}
function copyIndex() {
  return src(paths.index.src)
  .pipe(dest(paths.index.dest));
}
function copyHtml() {
  return src(paths.html.src)
  .pipe(dest(paths.html.dest));
}
function copySass() {
  // return src(paths.sass.src)
  // .pipe(dest(paths.sass.dest));
}
function copyCss() {
  return src(paths.css.src)
  .pipe(dest(paths.css.dest));
}
function copyScripts() {
  return src(paths.scripts.src)
  .pipe(dest(paths.scripts.dest));
}
function copyImages() {
  return src(paths.images.src)
  .pipe(dest(paths.images.dest));
}
// Watch for file modification at specific paths and run respective tasks accordingly
function watcher() {
  watch(paths.index.src,series(copyIndex,browserSyncReload))
  watch(paths.html.src,series(copyHtml,browserSyncReload))
  watch(paths.css.src,series(copyCss,browserSyncReload))
  watch(paths.images.src,series(copyImages,browserSyncReload))
  // watch(paths.sass.src,series(copySass,browserSyncReload))
  // watch(paths.fonts_ttf.src,series(copyFontsTtf,browserSyncReload))
  // watch(paths.fonts_web.src,series(copyFontsWeb,browserSyncReload))
  watch(paths.scripts.src,series(copyScripts,browserSyncReload))
  browserSyncInit()
}
function browserSyncReload(done) {
  browserSync.reload();
  if(done==!""){
    const myFunction = done;
    myFunction();
  }
}
function browserSyncInit(done) {
  browserSync.init({
    watch: true,
    server: {
      baseDir:paths.serverdir,
    },
    reloadOnRestart: true,
    codeSync: true,
    timestamps: true,
    host: 'localhost',
    port: 9000,
    logPrefix: 'log',
    // files: ['_dist/*.html', '_dist/css/*.css' , '_dist/sass/*.scss'],
  });
  if(done==!""){
    const myFunction = done;
    myFunction();
  }
}
// Export tasks to make them public
exports.copyIndex = copyIndex;
exports.copyScripts = copyScripts;
exports.copySass = copySass;
exports.copyCss = copyCss;
exports.copyHtml = copyHtml;
exports.copyImages = copyImages;
exports.watcher = watcher;
exports.browserSyncInit = browserSyncInit;
exports.browserSyncReload = browserSyncReload;
exports.copyFontsTtf = copyFontsTtf;
exports.copyFontsWeb = copyFontsWeb;
exports.mybuild = mybuild;
exports.default = series(watcher);
