// Creating an array to store each of the objects I will
// create later one, which will each contain the filename
// and contents for each of the files in the current directory.
// These contents will not be printed out until all files have
// been read (see filesReturned function)
var allFiles = [];

// Creating a counter to monitor the current value of, and itterate
// through each of the files found in the directory
var counter = 0;

// Requiring the File System module
var fs = require("fs");

// Using the File System module to read the current
// directory I am in, and calling the filesReturned callback
// once they get returned
fs.readdir("./", filesReturned);

// Creating the callback function for the readdir() request above
// which takes in two parametres - any errors, and the files or
// data returned
function filesReturned(err, fileDir){
  // Logging out a message so I know when the data has been returned
  console.log("\nData returned from Directory \n");

  // Calling the readMyFiles() function, which is declared below,
  // so that all of the files that were found in my directory can
  // be read, and their data stored in a global array
  readMyFiles();

  // Declaring the readMyFiles function so that the code within it
  // can be recalled to read through multiple files. I am keeping this
  // function within the filesReturned function as it means the fileDir
  // (data result of the readdir() request earlier) does not need to be
  // passed out to a global variable just to be passed back in again
  function readMyFiles(){

    // Passing in a file from the array returned by the readdir() function.
    // Using the counter to itterate through each of these files.
    fs.readFile(fileDir[counter], {encoding: "utf8"}, function(err, result){
      // Checking to make sure the current file is not called "app.js" i.e.
      // I do not want to store the contents of this file, just the ones
      // that exist in the same directory as it
      if(fileDir[counter] != "app.js")
      {
        // Creating a new object to store the information of this file temporarily
        var thisFile = {
          // Getting the name of the file from the file directory results, again
          // using the counter to identify to it
          name:fileDir[counter],
          // Getting the contents of the file from the parametre "result" that
          // was passed back to the readFile() function callback
          contents:result
        };

        // Pushing this temporary object into the allFiles array, so that it
        // can be stored and accessed later on i.e. once all files have been
        // returned
        allFiles.push(thisFile);
      }

      // Increasing the counter value, so that the next time this function
      // is called, the next file can be accessed from the fileDir array
      counter++;

      // Checking if the counter is still less than the length of the fileDir
      // array. If it is, then there are still files to be read, so it should
      // go back and read more files. If it is now equal to (or greater than
      // - which it should never be) then all the files from the current
      // directory have been read (and their data stored), so we now want
      // to call the filesReturned() function
      if(counter < fileDir.length)
      {
        readMyFiles();
      }else{
        // All of the files have been returned, and therefore all of their information
        // has been stored into the allFiles array. Note - none of the file's data has
        // been logged out to the console yet. It has just been stored in the allFiles array
        console.log("All files have been read, and their data stored");

        allFilesReturned();
      }
    });
  }
}

function allFilesReturned(){
  // Looping through each object we stored in the allFiles array. Each object
  // will contain the filename and contents of each one of the files.
  for(var i=0; i< allFiles.length; i++)
  {
    // Logging out the name of each file, along with it's contents, which are stored
    // within an object, in the allFiles array
    console.log("\t- The contents of " + allFiles[i].name + " was \"" + allFiles[i].contents + "\"");
  }
}
