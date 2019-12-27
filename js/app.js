const uploadBtn = document.getElementById('uploadBtn');
const signInBtn = document.getElementById('signInBtn');

// Upload button event listener to open sign in modal
uploadBtn.addEventListener('click', e => {
    //auth(email, password);

    openModal('signIn');

    //openModal('upload');
});

// Sign in button event listener to take email and password inputs
signInBtn.addEventListener('click', e => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    auth(email, password);
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
})

// Auth function authenticates user. Upload modal will open if user is authenticated.
function auth(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        console.log('Login successful!');
        closeModal();
        setTimeout(function() {
            openModal('upload');
        }, 150);
    }).catch(function(error) {
        console.log(error.message);
    });
}