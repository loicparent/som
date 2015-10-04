/* sòm
 * Compute checksum of a file.
 *
 * started at 25/09/2015
 *
 * Change the hashing function from crc-32 to MD5.
 */

"use strict";

var chalk = require( "chalk" ),
    path = require( "path" ),
    fs = require( "fs" ),
    humanSize = require( "human-size" ),
    crc32 = require( "easy-crc32" ).calculate,
    MD5 = require( "MD5" );

var sFileName, sFilePath;

var fShowError = function( sErrorMessage ) {
    console.log( chalk.red.bold.underline( "✘ error:" ), sErrorMessage );
    process.exit( 1 );
};

if( !( sFileName = process.argv[ 2 ] ) ) {
    fShowError( "You need to give a file as argument!" );
}

sFilePath = path.resolve( process.cwd(), sFileName );

fs.stat( sFilePath, function( oError, oStats ) {
    var aLogLines = [];

    if( oError ) {
        fShowError( oError.message );
    }

    if( !oStats.isFile() ) {
        fShowError( "The given path must be a file!" );
    }

    // name
    aLogLines.push( chalk.yellow.bold( sFileName ) );

    // size
    aLogLines.push( chalk.gray( "(" + humanSize( oStats.size ) + ")" ) );

    // checksum
    fs.readFile( sFilePath, { "encoding": "utf-8" }, function( oError, sData ) {
        if( oError ) {
            fShowError( oError );
        }

        aLogLines.push( chalk.green.bold( "sum:" ) + " " + MD5( sData ) );

        console.log( aLogLines.join( " " ) );
    } );
} );
