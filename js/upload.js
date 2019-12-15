const uploadType = document.getElementById('upload-type');
const porfolioFields = document.getElementById('portfolioFields');
const photoFields = document.getElementById('photoFields');
const imageUploadBtn = document.getElementById('imageUpload');
const imageName = document.getElementById('imageName');
let file;
const submitBtn = document.getElementById('submitBtn');

uploadType.addEventListener('change', e => {
    const value = e.target.value;
    if (value == 'portfolio') {
        photoFields.style.display = 'none';
        portfolioFields.style.display = 'block';
    } else if (value == 'photo') {
        portfolioFields.style.display = 'none';
        photoFields.style.display = 'block';
    }
});




imageUploadBtn.addEventListener('change', e => {
    const files = e.target.files;
    file = files[0];
    console.log(file);
    imageName.textContent = file.name;
});

submitBtn.addEventListener('click', handleFormSubmit);



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

function handleFormSubmit() {
    const form = getAllFields();
    db.collection('portfolio-items').add(form);
    if (file) {
        handleImageUpload();
    }
    
}

function getInputVal(id) {
    return document.getElementById(id).value;
}
