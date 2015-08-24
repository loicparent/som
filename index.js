/* sòm
 * Compute checksum of a file.
 *
 * started at 24/08/2015
 */

"use strict";

var chalk = require( "chalk" ),
    path = require( "path" ),
    fs = require( "fs" ),
    humanSize = require( "human-size" ),
    crc32 = require( "easy-crc32" ).calculate;

var sFileName, sFilePath;

var fError = function( sErrorMessage ) {
    console.log( chalk.red.bold.underline( "✘ error:" ), sErrorMessage );
    process.exit( 1 );
};

// check argument
if( !( sFileName = process.argv[ 2 ] ) ) {
    fError( "You need to give a file as argument!" );
}

fs.stat( ( sFilePath = path.resolve( process.cwd(), sFileName ) ), function( oError, oFileStats ) {
    var aLogLines = [];

    if( oError ) {
        fError( oError.message );
    }

    // name
    aLogLines.push( chalk.yellow.bold( sFileName ) );

    // size
    aLogLines.push( chalk.gray( "(" + humanSize( oFileStats.size ) + ")" ) );

    // sum
    aLogLines.push( chalk.green.bold( "sum:" ) + " " + crc32( fs.readFileSync( sFilePath, { "encoding": "utf-8" } ) ) );

    console.log( aLogLines.join( " " ) );
} );
