// this function checks to verify if a user is logged in
// pairing a route with this function prevents non-logged-in users from using the route

const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;