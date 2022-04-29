const { src, dest, watch, series } = require("gulp");
const terser = require("gulp-terser");
// const minify = require("gulp-clean-css");
const sass = require("gulp-sass")(require("sass"));

// compile scss into css
function compilescss() {
  // 1 where is my scss file
  return (
    src("src/sass/*.scss")
      // 2 pass that file through sass compiler
      .pipe(sass())
      // 3 where do I save compiled files
      //   .pipe(dest('app/css'));
      .pipe(dest("dist/css"))
  );
}
// Copy Html gulp.task("copyHtml",

function copyHtml() {
  return src("src/*.html").pipe(dest("dist/"));
}

function watchTask() {
  watch("src/sass/*.scss", compilescss);
  watch("src/*.html", copyHtml);
  watch("src/js/*.js", jsmin); // change to your source directory
}

// minify js
function jsmin() {
  return src("src/js/*.js") // change to your source directory
    .pipe(terser())
    .pipe(dest("dist/js")); // change to your final/public directory
}

//   Default Gulp task
exports.default = series(compilescss, copyHtml, jsmin, watchTask);
