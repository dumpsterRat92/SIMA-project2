const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the user to the login page
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      // If the user is logged in, execute function that will allow them to view
      //call next() if the user is authenticated
      next();
    }
  };
  
  module.exports = withAuth;