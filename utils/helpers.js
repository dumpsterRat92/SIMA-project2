module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear() + 5
      }`;
    },
    times: (n, block) => {
      var accum = '';
      for(var i = 0; i < n; ++i)
        accum += block.fn(i);
      return accum;
    }
  };
