var gulp = require('gulp'),
    argv = require('yargs').argv,
    fs = require('fs'),
    clean = require('gulp-clean'),
    zip = require('gulp-zip');

var host = {
    dev: 'http://dev.kdweibo.cn',
    devtest: 'http://devtest.kdweibo.cn',
    kdtest: 'https://dotest.kdweibo.cn',
    yzj: 'https://do.yunzhijia.com'
}[argv.e] || 'https://do.yunzhijia.com';

var todayDate = function () {
    var now = new Date();
    return now.getFullYear() + zeroize(now.getMonth() + 1) + zeroize(now.getDate());
};

var dateTime = function () {
    var now = new Date();
    return now.getFullYear() + '.' + zeroize(now.getMonth() + 1) + '.' + zeroize(now.getDate()) + ' ' + zeroize(now.getHours()) + ':' + zeroize(now.getMinutes());
}

var zeroize = function (s) {
    s = s + '';
    if (s.length === 1) s = '0' + s;
    return s;
};

var buildDate = dateTime()

var config = {
    "appId": "101091520",
    "appIndex": host + "/cloud-office/index.html",
    "interceptPath": host + "/cloud-office/",
    "buildDate": buildDate
};

gulp.task('clean', function () {
    return gulp.src(['./dist/conf.txt'], {
        read: false
    })
        .pipe(clean());
});

gulp.task('config', function (cb) {
    fs.writeFile('dist/conf.txt', JSON.stringify(config), cb)
});

gulp.task('zip', ['config'], function () {
    var version
    if (argv.e === 'yzj') {
        version = argv.e + '_' + buildDate
    } else {
        version = argv.e
    }
    return gulp.src(['dist/**/*'], { base: 'dist' })
        .pipe(zip('cloudoffice_' + version + '.zip'))
        .pipe(gulp.dest('release'))
        .on('end', function () {
            // gulp.start('clean')
            console.log(argv.e + '_' + buildDate)
        });
});
