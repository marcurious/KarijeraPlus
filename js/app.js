<script>
    gapi.load('auth2', function () {
        gapi.auth2.init({
            client_id: 'YOUR_CLIENT_ID',
            scope: 'profile email'
        });

        document.getElementById('google-login-btn').addEventListener('click', function () {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signIn().then(function (user) {
                var id_token = user.getAuthResponse().id_token;
                // Send the ID token to your server for verification
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'verify-google-token.php');
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        // The ID token is valid, create a session for the user
                        var response = JSON.parse(xhr.responseText);
                        createSession(response.userId);
                    } else {
                        console.log('An error occurred while verifying the ID token');
                    }
                };
                xhr.send('id_token=' + id_token);
            });
        });
    });

    function createSession(userId) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'create-session.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (xhr.status === 200) {
                // The session was created successfully, redirect the user to the dashboard
                window.location.href = '/dashboard.php';
            } else {
                console.log('An error occurred while creating the session');
            }
        };
        xhr.send('user_id=' + userId);
    }
</script>