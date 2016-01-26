// Creating an array to store each of the objects I will
// create later one, which will each contain the filename
// and contents for each of the files in the current directory.
// These contents will not be saved out until all files have
// been read
var allFiles = [];

// Creating a counter to monitor the current value of, and itterate
// through each of the files found in the directory
var counter = 0;

var totalIgnoredFiles = 0;

// According to http://stackoverflow.com/questions/14173150/how-do-i-create-a-line-break-in-a-javascript-string-to-feed-to-nodejs-to-write-t
// both a return and a new line are required to cause a line break in a
// txt file using JavaScript. Instead of repeatedly typing these, I am
// storing them in the newLine variable
var newLine = "\r\n";

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


  for(file in fileDir)
  {
    var currentFile = fileDir[file];
    // Checking to make sure the current file is not called "app.js" i.e.
    // I do not want to store the contents of this file, just the ones
    // that exist in the same directory as it
    if(checkIgnoreFiles(currentFile))
    {
      // Creating a temporary date object (so I can access the current time)
      var currentDate = new Date();

      // Creating a current time variable, so that I can check to see when each
      // is about to call the .readFile() method (that way I can see if these
      // requests are happending in synchronously or asynchronously)
      var currentTimestamp = currentDate.getTime();
      console.log(fileDir[file] + " requested data at " + currentTimestamp);

      // Passing in a file from the array returned by the readdir() function.
      // Using the counter to itterate through each of these files.
      fs.readFile(currentFile, {encoding: "utf8"}, function(err, data){
        // Creating a new object to store the information of this file temporarily
        var thisFile = {
          // Getting the name of the file from the file directory data, again
          // using the counter to identify to it
          name:fileDir[file],
          // Getting the contents of the file from the parametre "data" that
          // was passed back to the readFile() function callback
          contents:data
        };

        // Logging out when a file is in the process of being read - again to try and
        // compare the time they open the .readFile() request, to the time which
        // it is processed
        currentTimestamp = currentDate.getTime();
        console.log("Data " + "\"" + data + "\" returned data at " + currentTimestamp);

        // Pushing this temporary object into the allFiles array, so that it
        // can be stored and accessed later on i.e. once all files have been
        // returned
        allFiles.push(thisFile);

        // Increasing the counter value, to keep track of how many file results have
        // been returned
        counter++;

        // Checking if the counter is still less than the length of the fileDir
        // array. If it is not then all of the files have been returned, and therefore
        // all of their information has been stored into the allFiles array. Note -
        // none of the file's data has been logged out to the console yet. It has
        // just been stored in the allFiles array
        if(counter == (fileDir.length - totalIgnoredFiles))
        {
          console.log("All files have been read, and their data stored\nNote - some files may have been ignored due to your current settings");
          saveToTxtFile();
        }
      });
    }
  }
}

function saveToTxtFile(){
  // Creating a searchResults variable to store the string that I want
  // to write to the search-results.txt file
  var searchResults = "SEARCH RESULTS - " + Date() + newLine + newLine;

  for(al in allFiles)
  {
    // Storing the file data into the searchResults string, so it can be saved
    // in the search-results.txt file
    searchResults += allFiles[al].name + newLine + "\t" + allFiles[al].contents + newLine + newLine;
  }

  fs.writeFile("search-results.txt", searchResults, function(err) {
    if(err)
    {
        console.log('\nERROR - file not saved: ' + err);
    } else {
      console.log('\nYour search results have been saved');
    }
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

      totalIgnoredFiles++;
    }
  }
  // Return true or false, depending on if this filename contains, or is, a file which we have chosen to
  // ignore i.e. if this function returns true, then the files name and contents will be saved, whereas
  // if it returns false, the file details will not be stored
  return allowFile;
}
