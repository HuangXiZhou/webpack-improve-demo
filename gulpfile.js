const gulp = require('gulp');
const webp = require('gulp-webp'); // 基于 cwebp 的 gulp 插件

// 基于 cwebp 转化图片
gulp.task('webp', () =>
  gulp.src('src/img/*.{png,jpg,jpeg}')
    .pipe(webp({ quality: 75 })) // 详情配置见：https://github.com/imagemin/imagemin-webp#api
    .pipe(gulp.dest('src/img'))
);

// 监听文件夹变化
gulp.task('watch', () =>
  gulp.watch('src/img/*.{png,jpg,jpeg}', ['webp'])
);

gulp.task('default', () =>
  gulp.start('watch')
);
