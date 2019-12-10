const uploadBtn = document.getElementById('uploadBtn');
const signInBtn = document.getElementById('signInBtn');

uploadBtn.addEventListener('click', e => {
    //auth(email, password);

    modal = document.getElementById('signIn');
    modal.style.display = 'flex';
    setTimeout(function() {
        modal.style.opacity = 1;
    }, 50);
});

signInBtn.addEventListener('click', e => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    auth(email, password);
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
})

function auth(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        console.log('Login successful!');
        closeModal();
    }).catch(function(error) {
        console.log(error.message);
    });
}