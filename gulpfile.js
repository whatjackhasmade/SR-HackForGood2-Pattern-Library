/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GULP
 * The gulp wrapper around patternlab-node core, providing tasks to interact with the core library.
 ******************************************************/
const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));

/* SCSS/CSS Packages */
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");

/* JS Babel and Minifcation Packages */
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify-es").default;

/******************************************************
 * PATTERN LAB  NODE WRAPPER TASKS with core library
 ******************************************************/
const config = require("./patternlab-config.json");
const patternlab = require("@pattern-lab/patternlab-node")(config);

function build() {
  return patternlab
    .build({
      watch: argv.watch,
      cleanPublic: config.cleanPublic
    })
    .then(() => {
      // do something else when this promise resolves
    });
}

function serve() {
  return patternlab
    .serve({
      cleanPublic: config.cleanPublic
    })
    .then(() => {
      gulp.start("watch");
      // do something else when this promise resolves
    });
}

/* Gulp Task: SCSS Compiling */
gulp.task("sass", function() {
  return gulp
    .src(`source/scss/style.scss`)
    .pipe(customPlumber("Error running Sass"))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: false }))
    .pipe(
      cleanCSS({ debug: true }, details => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      })
    )
    .pipe(gulp.dest(`source/css`));
});

/* Gulp Task: JavaScript Compiling */
gulp.task("scripts", function() {
  return gulp
    .src([
      `source/scripts/base/**/*.js`,
      `source/scripts/components/**/*.js`,
      `source/scripts/script.js`
    ])
    .pipe(sourcemaps.init())
    .pipe(concat(`source/site.js`))
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write(`./`))
    .pipe(gulp.dest(`./`));
});

/* Gulp Task: Browsersync change on file updates */
gulp.task("watch", ["sass", "scripts"], function() {
  gulp.watch([`source/scripts/**/*.js`], ["scripts"]);
  gulp.watch([`source/scss/**/*.scss`], ["sass"]);
});

gulp.task("patternlab:version", function() {
  patternlab.version();
});

gulp.task("patternlab:help", function() {
  patternlab.help();
});

gulp.task("patternlab:patternsonly", function() {
  patternlab.patternsonly(config.cleanPublic);
});

gulp.task("patternlab:liststarterkits", function() {
  patternlab.liststarterkits();
});

gulp.task("patternlab:loadstarterkit", function() {
  patternlab.loadstarterkit(argv.kit, argv.clean);
});

gulp.task("patternlab:build", function() {
  build().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task("patternlab:serve", function() {
  serve().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task("patternlab:installplugin", function() {
  patternlab.installplugin(argv.plugin);
});

gulp.task("default", ["patternlab:serve"]);

/* Gulp Task: Custom error message handling in console */
function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>"
    })
  });
}
