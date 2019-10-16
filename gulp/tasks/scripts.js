let uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  plumber = require("gulp-plumber"), // модуль для отслеживания ошибок
  rigger = require("gulp-rigger"), // модуль для импорта содержимого одного файла в другой
  sourcemaps = require("gulp-sourcemaps"), // модуль для генерации карты исходных файлов
  scriptsPATH = {
    input: "./dev/static/js/",
    ouput: "./build/static/js/"
  };

module.exports = function() {
  $.gulp.task("libsJS:dev", () => {
    return $.gulp
      .src([
        "node_modules/svg4everybody/dist/svg4everybody.min.js",
        "node_modules/jquery/dist/jquery.js"
      ])
      .pipe(concat("libs.min.js"))
      .pipe($.gulp.dest(scriptsPATH.ouput));
  });

  $.gulp.task("libsJS:build", () => {
    return $.gulp
      .src([
        "node_modules/svg4everybody/dist/svg4everybody.min.js",
        "node_modules/jquery/dist/jquery.js"
      ])
      .pipe(concat("libs.min.js"))
      .pipe(uglify())
      .pipe($.gulp.dest(scriptsPATH.ouput));
  });

  $.gulp.task("js:dev", () => {
    return $.gulp
      .src([
        scriptsPATH.input + "*.js",
        "!" + scriptsPATH.input + "libs.min.js"
      ])
      .pipe(plumber())
      .pipe(rigger())
      .pipe(concat("main.min.js"))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write("./"))
      .pipe($.gulp.dest(scriptsPATH.ouput))
      .pipe(
        $.browserSync.reload({
          stream: true
        })
      );
  });

  $.gulp.task("js:build", () => {
    return $.gulp
      .src([
        scriptsPATH.input + "*.js",
        "!" + scriptsPATH.input + "libs.min.js"
      ])
      .pipe($.gulp.dest(scriptsPATH.ouput));
  });

  $.gulp.task("js:build-min", () => {
    return $.gulp
      .src([
        scriptsPATH.input + "*.js",
        "!" + scriptsPATH.input + "libs.min.js"
      ])
      .pipe(rigger())
      .pipe(concat("main.min.js"))
      .pipe(uglify())
      .pipe($.gulp.dest(scriptsPATH.ouput));
  });
};
