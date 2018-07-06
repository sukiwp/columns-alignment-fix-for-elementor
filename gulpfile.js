'use strict';

/**
 * Define configurations
 */

const config = {
	src: {
		pot: [ './**/*.php', '!./__build/**/*.php' ],
		build: [
			'./*',
			'./assets/css/**/*',
			'./languages/**/*',

			// exclude files and folders
			'!**/Thumbs.db',
			'!**/.DS_Store',
			'!./.gitignore',
			'!./package*.json',
			'!./gulpfile.js',
			'!./node_modules',
			'!./README.md',
			'!./LICENSE',
			'!./LICENSE.md',
			'!./__build',
		],
	},
	dest: {
		pot: './languages',
		build: './__build/columns-alignment-fix-for-elementor',
		zip: './__build/zip',
	},
};

/**
 * Init Gulp and plugins
 */

const gulp          = require( 'gulp' );

// Translation
const wpPot         = require( 'gulp-wp-pot' );

// Others
const fs            = require( 'fs' );
const del           = require( 'del' );
const replace       = require( 'gulp-replace' );
const watch         = require( 'gulp-watch' );
const zip           = require( 'gulp-zip' );

/**
 * Task: Change theme info (style.css file header) based on package.json values.
 */
gulp.task( 'plugin_info', function() {
	var info = JSON.parse( fs.readFileSync( './package.json' ) );

	// Change theme version on style.css
	return gulp.src( [ './' + info.name + '.php' ] )
		.pipe( replace( /(Plugin Name: ).*/, '$1' + info.title ) )
		.pipe( replace( /(Plugin URI: ).*/, '$1' + info.uri ) )
		.pipe( replace( /(Description: ).*/, '$1' + info.description ) )
		.pipe( replace( /(Version: ).*/, '$1' + info.version ) )
		.pipe( replace( /(Author: ).*/, '$1' + info.author.name ) )
		.pipe( replace( /(Author URI: ).*/, '$1' + info.author.url ) )
		.pipe( replace( /(Text Domain: ).*/, '$1' + info.name ) )
		.pipe( replace( /(Tags: ).*/, '$1' + info.keywords.join( ', ' ) ) )

		.pipe( replace( /(ELEMENTOR_CAF_VERSION', ').*?('.*)/, '$1' + info.version + '$2' ) )

		.pipe( gulp.dest( './' ) );
} );

/**
 * Task: Change info on readme.txt based on package.json values.
 */
gulp.task( 'readme_txt', function() {
	var info = JSON.parse( fs.readFileSync( './package.json' ) );

	var contributors = info.contributors.map(function( contributor ) {
		return contributor.name;
	});

	// Change theme version on eadme.txt
	return gulp.src( [ './readme.txt' ] )
		.pipe( replace( /(===).*(===)/, '$1 ' + info.title + ' $2' ) )
		.pipe( replace( /(Contributors: ).*/, '$1' + contributors.join( ', ' ) ) )
		.pipe( replace( /(Tags: ).*/, '$1' + info.keywords.join( ', ' ) ) )
		.pipe( replace( /(Stable tag: ).*/, '$1' + info.version ) )

		.pipe( replace( /(\s\s).*(\s\s== Description ==)/, '$1' + info.description + '$2' ) )

		.pipe( replace( /(== Description ==\s\s).*(\s\s)/, '$1' + info.description + '$2' ) )

		.pipe( gulp.dest( './' ) );
} );

/**
 * Wrapper Task: Set theme info files.
 */
gulp.task( 'info', gulp.series( 'plugin_info', 'readme_txt' ) );

/**
 * Task: Generate .pot file for translation.
 */
gulp.task( 'pot', function() {
	var info = JSON.parse( fs.readFileSync( './package.json' ) );

	return gulp.src( config.src.pot )
		.pipe( wpPot( {
			domain: info.name,
			package: info.title,
			metadataFile: 'columns-alignment-fix-for-elementor.php',
		} ) )
		.pipe( gulp.dest( config.dest.pot + '/' + info.name + '.pot' ) );
} );

/**
 * Task: Watch all files and copy to 'build' folder.
 */
gulp.task( 'watch', function() {
	watch( './package.json', function() {
		gulp.task( 'info' )();
	} );

	watch( config.src.pot, function() {
		gulp.task( 'pot' )();
	} );

	watch( config.src.build, { base: './' }, function( obj ) {
		if ( 'unlink' === obj.event ) {
			del( config.dest.build + '/' + obj.relative, { force: true } );
		} else {
			gulp.src( obj.path, { base: './' } )
				.pipe( gulp.dest( config.dest.build ) );
		}
	} );
} );

/**
 * Task: Clean files in "__build" directory.
 */
gulp.task( 'clean', function() {
	return del( config.dest.build + '/*', { force: true } );
} );

/**
 * Task: Copy selected files from sources to "__build" directory.
 */
gulp.task( 'copy', function() {
	return gulp.src( config.src.build, { base: './' } )
		.pipe( gulp.dest( config.dest.build ) );
} );

/**
 * Wrapper Task: Build.
 */
gulp.task( 'build', gulp.series( 'pot', 'info', 'clean', 'copy' ) );

/**
 * Wrapper Task: Default task.
 */
gulp.task( 'default', gulp.series( 'build', 'watch' ) );

/**
 * Wrapper Task: Build to zip.
 */
gulp.task( 'zip', function() {
	var info = JSON.parse( fs.readFileSync( './package.json' ) );

	return gulp.src( config.dest.build + '/**/*', { buffer: false, base: config.dest.build } )
		.pipe( zip( info.name + '.zip' ) )
		.pipe( gulp.dest( config.dest.zip ) );
} );