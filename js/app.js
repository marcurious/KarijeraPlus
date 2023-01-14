window.onload = function () {
  // Initialize the Google SDK
  gapi.load('auth2', function () {
    gapi.auth2.init({
      client_id: '238561646156-lc2hu8143guqlgrs82o9gdckomitqnub.apps.googleusercontent.com',
      scope: 'profile email'
    });
  });

  // Attach a click event to the login button
  document.getElementById('google-login-btn').addEventListener('click', function () {
    // Get the Google auth instance
    var auth2 = gapi.auth2.getAuthInstance();

    // Sign the user in
    auth2.signIn().then(function (user) {
      // Send the user's ID token to your server
      var id_token = user.getAuthResponse().id_token;
      // Send the token to your server for verification and to create a session
    });
  });
}