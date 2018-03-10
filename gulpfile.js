/*!
 * Gulp SMPL Makeup Builder
 *
 * @type Module gulp
 * @license The MIT License (MIT)
 */

'use strict';

/* Get plugins */
var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('./config.json');
var fs = require('fs');
var env = process.env.NODE_ENV;
var pkg = JSON.parse(fs.readFileSync('./package.json'));
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del', 'merge-stream', 'vinyl-buffer']
});

/* Error handler closure */
function errorHandler(task, title) {
    'use strict';

  return function(err) {
        $.util.log(task ? $.util.colors.red('[' + task + (title ? ' -> ' + title : '') + ']') : "", err.toString());
        this.emit('end');
    };
}
/* Build task */
gulp.task('js:webpack', function() {
  return gulp.src(['./src/js/**/*'])
    .pipe($.webpack(require('./webpack.build.config.js')))
    .pipe(gulp.dest('./dist/assets/js/build')).on('end', function() {
      browserSync.reload();
    });
});
/* vendor task */
gulp.task('js:vendor', function() {
  var jsConfig = config.js ? config.js : {vendor: {}};
  var bowerOptions = {};
  var uglifySaveLicense = require('uglify-save-license');
  var uglifyOptions = {
    output: {
      comments: uglifySaveLicense
    }
  };

  var stream = gulp.src('./bower.json')
    .pipe($.mainBowerFiles('**/*.js', bowerOptions)).on('error', errorHandler('js:vendor', 'mainBowerFiles'));

  if (jsConfig.vendor.prepend) {
    stream = $.mergeStream(gulp.src(jsConfig.vendor.prepend), stream)
  }

  if (jsConfig.vendor.append) {
    stream = $.mergeStream(stream, gulp.src(jsConfig.vendor.append))
  }

  return stream.pipe($.sourcemaps.init()).on('error', errorHandler('js:vendor', 'sourcemaps:init'))
    .pipe($.concat('vendor.js')).on('error', errorHandler('js:vendor', 'concat'))
    .pipe($.uglify(uglifyOptions)).on('error', errorHandler('js:vendor', 'uglify'))
    .pipe($.sourcemaps.write('.')).on('error', errorHandler('js:vendor', 'sourcemaps:write'))
    .pipe(gulp.dest('./dist/assets/js/build/'));
});

gulp.task('copy:static', function() {
  return gulp.src(['./src/static/**/*'])
    .pipe(gulp.dest('./dist/'));
});

/* Jade task */

gulp.task('jade', function() {
  // var locale = config.locale ? JSON.parse(fs.readFileSync('./src/locales/' + config.locale + '.json')) : null;
  var jadeOptions = {
    basedir: "./src/jade/",
    pretty : true,
    locals : {
      "ENV"    : env,
      "PACKAGE": pkg,
      // "__"     : locale
    }
  };

  return gulp.src(['./src/jade/**/*.jade'])
  //        .pipe($.changed('./dist/', {extension: '.html'}))
  //        .pipe($.if(global.isWatching, $.cached('jade')))
  //        .pipe($.jadeInheritance({basedir: jadeOptions.basedir}))
    .pipe($.filter(function(file) {
      return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe($.jade(jadeOptions)).on('error', errorHandler('jade', 'compile'))
    .pipe(gulp.dest('./dist/')).on('end', function() {
      browserSync.reload();
    });
});
gulp.task('prebuild', $.sequence(['js:webpack', 'jade']));
gulp.task('build', $.sequence(['jade','js:webpack', 'js:vendor', 'copy:static']));
gulp.task('serve', $.sequence('build', 'browsersync', 'watch'));
gulp.task('make_scripts', $.sequence(['js:vendor'], ['js:webpack'], ['js:buildApp']));
gulp.task('default', ['build']);

/* JS task */
gulp.task('js', function(done) {
    var webpackMode = fs.existsSync('./webpack.config.js');
    $.sequence(webpackMode ? 'js:webpack' : 'js:copy', done);
});

gulp.task('js:copy', function() {
    return gulp.src(['./src/js/**/*'])
      .pipe($.uglify()).on('error', errorHandler('js', 'uglify'))
      .pipe(gulp.dest('./dist/assets/js'));
});


gulp.task('js:buildApp', function(done) {
    $.sequence('js:concat', 'js:cleanup', done);
});

gulp.task('js:concat', function() {
    return gulp.src(['./src/js/**/*'])
      .pipe($.webpack(require('./webpack.concat.config.js')))
      .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('js:concatFast', function() {
    return gulp.src(['./src/js/**/*'])
      .pipe($.webpack(require('./webpack.concat.fast.config.js')))
      .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('js:cleanup', function() {
  $.del('./dist/assets/js/empty.js')
  $.del('./dist/assets/js/build/')
});


/* Browsersync Server */
gulp.task('browsersync', function() {
    browserSync.init({
        server   : "./dist",
        notify   : false,
        port     : 64999,
        ghostMode: {
            clicks: false,
            forms : false,
            scroll: false
        }
    });
});

/* Watcher */
gulp.task('watch', function() {
    global.isWatching = true;

    $.watch("./src/scss/**/*.scss", function() {
        gulp.start('sass');
    });
    $.watch("./src/less/**/*.less", function() {
        gulp.start('less');
    });
    $.watch("./src/jade/**/*.jade", function() {
        gulp.start('jade');
    });
    // $.watch("./src/locales/**/*.js", function() {
    //     gulp.start('jade');
    // });
    $.watch("./src/js/**/*.js", function() {
        gulp.start('js');
    });
    $.watch("./src/static/**/*", function() {
        gulp.start('copy:static');
    });
});

/* Copy tasks */


gulp.task('copy:bower', function() {
    return gulp.src(['./bower_components/**/*'])
      .pipe(gulp.dest('./dist/bower_components'));
});

/* Other tasks */
gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('clean', function() {
    return $.del(['./dist/**/*', './tmp']);
});

gulp.task('clean_ngApp', function() {
  return $.del(['./dist/assets/js/ngApp/**/*']);
});
gulp.task('clean_bundle', function() {
  return $.del(['./dist/assets/js/bundle.js']);
});