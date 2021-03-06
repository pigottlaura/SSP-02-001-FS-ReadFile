// According to http://stackoverflow.com/questions/14173150/how-do-i-create-a-line-break-in-a-javascript-string-to-feed-to-nodejs-to-write-t
// both a return and a new line are required to cause a line break in a
// txt file using JavaScript. Instead of repeatedly typing these, I am
// storing them in the newLine variable
var newLine = "\r\n";

// Creating a searchResults variable to store the string that I want
// to write to the search-results.txt file
var searchResults = "SEARCH RESULTS - " + Date() + newLine + newLine;

// Creating an ignoreFiles array, where I can list the filetypes (or
// filenames) which I don't wish to store the details of i.e. their
// content and filename. I am doing this because any .js files in this
// folder contain alot of code, and I do not want to be logging this
// out everytime I run the app
var ignoreFiles = [
  ".js",
  ".tern-project",
  ".git",
  "search-results.txt"
]

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
      if(checkIgnoreFiles(fileDir[counter]))
      {
        console.log(fileDir[counter]);
        searchResults += fileDir[counter] + newLine + "\t" + result + newLine + newLine;
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
        console.log("All files have been read, and their data stored\nNote - some files may have been ignored due to your current settings");

        saveToTxtFile("search-results.txt", searchResults);
      }
    });
  }
}

function saveToTxtFile(newFilename, text){
  fs.writeFile(newFilename, text, function(err) {
    console.log('\nYour search results have been saved');
  });
}

function checkIgnoreFiles(_filename){
  // Creating an allowFile variable, which is automatically true i.e. I am assuming that
  // the file names aren't going to be ignored until proved otherwise
  var allowFile = true;

  // Looping through each of the filetypes (or names) that I have stored in the ignoreFiles array,
  for(f in ignoreFiles){
    // Checking if the indexOf the filetype (or name) has an index within the string of the current
    // filename i.e. does it have an index of 0 or more (anything below this does not exist within
    // the _filename string)
    if(_filename.indexOf(ignoreFiles[f]) > -1)
    {
      // If this string contains a name or filetype which I have added to the ignoreFiles array, then
      // change the answer to false
      allowFile = false;
    }
  }
  // Return true or false, depending on if this filename contains, or is, a file which we have chosen to
  // ignore i.e. if this function returns true, then the files name and contents will be saved, whereas
  // if it returns false, the file details will not be stored
  return allowFile;
}
