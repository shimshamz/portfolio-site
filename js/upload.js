const uploadType = document.getElementById('upload-type');
const porfolioFields = document.getElementById('portfolioFields');
const photoFields = document.getElementById('photoFields');
const imageUploadBtn = document.getElementById('imageUpload');
const imageName = document.getElementById('imageName');
let file;
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('form');

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




imageUploadBtn.addEventListener('change', e => {
    const files = e.target.files;
    file = files[0];
    console.log(file);
    imageName.textContent = file.name;
});

form.addEventListener('submit', handleFormSubmit);



function getAllFields() {
    var form = new Object();
    const title = getInputVal('title');
    form['title'] = title;
    form['imgLink'] = (file ? 'portfolio-items/' + file.name : "");
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

function handleImageUpload() {
    let storageRef = storage.ref('portfolio-items/' + file.name);
    storageRef.put(file);
}

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

function getInputVal(id) {
    return document.getElementById(id).value;
}
