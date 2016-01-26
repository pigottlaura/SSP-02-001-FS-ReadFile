// Creating an array to store each of the objects I will
// create later one, which will each contain the filename
// and contents for each of the files in the current directory.
// These contents will not be printed out until all files have
// been read (see filesReturned function)
var allFiles = [];

// Creating an ignoreFiles array, where I can list the filetypes (or
// filenames) which I don't wish to store the details of i.e. their
// content and filename. I am doing this because any .js files in this
// folder contain alot of code, and I do not want to be logging this
// out everytime I run the app
var ignoreFiles = [
  ".js",
  ".tern-project",
  ".git"
];

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

  // Looping through the contents of the fileDir parametre
  // so that all of the files that were found in my directory can
  // be read, and their data stored in a global array
  for(i in fileDir)
  {
    // Checking to make sure the current file is not called "app.js" i.e.
    // I do not want to store the contents of this file, just the ones
    // that exist in the same directory as it
    if(checkIgnoreFiles(fileDir[i]))
    {
      // Creating a new object to store the information of this file temporarily
      var thisFile = {
        // Getting the name of the file from the file directory results, again
        // using i to identify to it
        name:fileDir[i],
        // Passing the current file into the readFileSync() function
        // to get the contents of the file. Using i to itterate through
        // each of these files in turn.
        contents: fs.readFileSync(fileDir[i])
      };

      // Pushing this temporary object into the allFiles array, so that it
      // can be stored and accessed later on i.e. once all files have been
      // returned
      allFiles.push(thisFile);
    }
  }

  // All of the files have been returned, and therefore all of their information
  // has been stored into the allFiles array. Note - none of the file's data has
  // been logged out to the console yet. It has just been stored in the allFiles array
  console.log("All files have been read, and their data stored\nNote - some files may have been ignored due to your current settings");

  allFilesReturned();
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
