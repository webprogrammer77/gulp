let plumber = require("gulp-plumber"),
  scss = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  csso = require("gulp-csso"),
  csscomb = require("gulp-csscomb"),
  sourcemaps = require("gulp-sourcemaps"),
  rename = require("gulp-rename"),
  stylesPATH = {
    input: "./dev/static/styles/",
    ouput: "./build/static/css/"
  },
  autoprefixerList = [
    "Chrome >= 45",
    "Firefox ESR",
    "Edge >= 11",
    "Explorer >= 8",
    "iOS >= 9",
    "Safari >= 9",
    "Android >= 4.4",
    "Opera >= 30"
  ];

module.exports = function() {
  $.gulp.task("styles:dev", () => {
    return $.gulp
      .src(stylesPATH.input + "styles.scss")
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(scss())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 3 versions"]
        })
      )
      .pipe(sourcemaps.write())
      .pipe(rename("styles.min.css"))
      .pipe($.gulp.dest(stylesPATH.ouput))
      .on("end", $.browserSync.reload);
  });
  $.gulp.task("styles:build", () => {
    return $.gulp
      .src(stylesPATH.input + "styles.scss")
      .pipe(scss())
      .pipe(
        autoprefixer({
          //browsers: autoprefixerList,
          overrideBrowserslist: ["last 16 versions"]
        })
      )
      .pipe(csscomb())
      .pipe($.gulp.dest(stylesPATH.ouput));
  });
  $.gulp.task("styles:build-min", () => {
    return $.gulp
      .src(stylesPATH.input + "styles.scss")
      .pipe(scss())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 16 versions"]
        })
      )
      .pipe(csscomb())
      .pipe(csso())
      .pipe(rename("styles.min.css"))
      .pipe($.gulp.dest(stylesPATH.ouput));
  });
};
