const chalk = require('chalk');
const sort = require('gulp-sort');

const log = add('@gulp/core/log');

const { isModule } = add('@gulp/utils/stream');

module.exports = (gulp, plugins, config) => {
    const {
        paths: {
            src: {
                sass: {
                    main: src
                }
            },
            output: {
                css: dest
            }
        },
        files: {
            main: {
                css: main
            }
        },
        plugins: params,
        args: {
            sourcemaps: {
                css: maps
            },
            minify
        },
        modules
    } = config;

    const {
        if: _if,
        plumber,
        sass,
        sassUnicode,
        autoprefixer,
        concat,
        groupCssMediaQueries,
        cleanCss,
        cssbeautify,
        sourcemaps,
        rename
    } = plugins;

    return done => {
        log(`${chalk.bold('Сборка CSS файлов...')}`);

        const isMinify = file => (
            (!isModule(file) && minify.css) ||
            (isModule(file) && modules.minify.css)
        );

        return gulp.src(src)
            .pipe(sort({
                comparator: (file1, file2) => file1.stat.birthtime - file2.stat.birthtime
            }))
            .pipe(plumber())
            .pipe(_if(maps, sourcemaps.init()))
            .pipe(sass.sync(params.sass).on('error', sass.logError))
            .pipe(sassUnicode())
            .pipe(autoprefixer())
            .pipe(groupCssMediaQueries())
            .pipe(rename({dirname: ''}))
            .pipe(_if(file => !isModule(file), concat(`${main}.css`)))
            .pipe(_if(isMinify, cleanCss(params.cleanCss), cssbeautify()))
            .pipe(_if(isMinify, rename(path => path.basename += '.min')))
            .pipe(_if(isModule, rename(path => ({
                ...path,
                basename: path.basename.replace(`.${modules.postfix}`, '')
            }))))
            .pipe(_if(maps, sourcemaps.write()))
            .pipe(gulp.dest(dest))
            .on('end', done);
    };
};
