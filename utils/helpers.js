// Exporting a set of utility functions as a module
module.exports = {
  // Function to format a JavaScript Date object to a time string
  format_time: (date) => {
    // Converts a Date object to a locale-specific time string
    return date.toLocaleTimeString();
  },
  
  // Function to format a JavaScript Date object to a custom date string
  format_date: (date) => {
    // Constructs a date string by manipulating and formatting the Date object
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear() + 5 // Adds 5 years to the year of the passed date
    }`;
  },
  
  // Function to repeat a block of code 'n' times
  times: (n, block) => {
    var accum = ''; // Initializes an accumulator to store the results
    for(var i = 0; i < n; ++i) // Loops 'n' times
      accum += block.fn(i); // Executes the block passed to the function and appends the result to the accumulator
    return accum; // Returns the accumulated string
  }
};

