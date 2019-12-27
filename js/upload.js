const uploadType = document.getElementById('upload-type');
const porfolioFields = document.getElementById('portfolioFields');
const photoFields = document.getElementById('photoFields');
const imageUploadBtn = document.getElementById('imageUpload');
const imageName = document.getElementById('imageName');
let file;
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('form');

// Event listener for upload type dropdown box
uploadType.addEventListener('change', e => {
    const value = e.target.value;
    if (value == 'portfolio') {
        photoFields.style.display = 'none';
        portfolioFields.style.display = 'block';
    } else if (value == 'photo') {
        portfolioFields.style.display = 'none';
        photoFields.style.display = 'block';
    } else {
        portfolioFields.style.display = 'none';
        photoFields.style.display = 'none';
    }
});

// Listener for image input field
imageUploadBtn.addEventListener('change', e => {
    const files = e.target.files;
    file = files[0];
    console.log(file);
    imageName.textContent = file.name;
});

// Event listener that calls handleFormSubmit function on form submit
form.addEventListener('submit', handleFormSubmit);

// Retrieves data from all the form fields and inserts into an object
function getAllFields() {
    var form = new Object();
    const title = getInputVal('title');
    form['title'] = title;
    form['imgLink'] = (file ? 'portfolio-items/' + file.name : "");
    form['dateAdded'] = firebase.firestore.Timestamp.fromDate(new Date());
    if (uploadType.value == 'portfolio') {
        const link = getInputVal('link');
        const githubLink = getInputVal('githubLink');
        const technologies = getInputVal('technologies');
        const itemType = getInputVal('item-type');
        const description = getInputVal('description');
        Object.assign(form, {
            'link': link, 
            'githubLink': githubLink,
            'technologies': technologies,
            'itemType': itemType,
            'description': description
        });
    } else if (uploadType.value == 'photo') {
        const location = getInputVal('location');
        Object.assign(form, {
            'location': location
        });
    }
    console.log(form);
    return form;
}

// Upload image to Firestore storage
function handleImageUpload() {
    if (uploadType.value == 'portfolio') {
        let storageRef = storage.ref('portfolio-items/' + file.name);
        storageRef.put(file);
    } else if (uploadType.value == 'photo') {
        let storageRef = storage.ref('photos/' + file.name);
        storageRef.put(file);
    }
    
}

// Inserts data from form into Firestore database
function handleFormSubmit(e) {
    e.preventDefault();
    const fields = getAllFields();
    if (uploadType.value == 'portfolio') {
        db.collection('portfolio-items').add(fields);
    } else if (uploadType.value == 'photo') {
        db.collection('photos').add(fields);
    }
    if (file) {
        handleImageUpload();
    }
    form.reset();
}

// Retrieves value from a field
function getInputVal(id) {
    return document.getElementById(id).value;
}
