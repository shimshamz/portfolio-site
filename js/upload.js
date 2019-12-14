const uploadType = document.getElementById('upload-type');
const imageUploadBtn = document.getElementById('imageUpload');
const imageName = document.getElementById('imageName');

const containers = getAllFieldContainers();
const fields = getAllFields();
console.log(containers);

uploadType.addEventListener('change', e => {
    const value = e.target.value;
    if (value == 'portfolio') {

    }
});

imageUploadBtn.addEventListener('change', e => {
    const files = e.target.files;
    console.log(files[0]);
    imageName.textContent = files[0].name;
    const formData = new FormData();
    formData.append('image', files[0]);

    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then(data => {
        return data;
    })
    .catch(console.error);
});

function getAllFieldContainers() {
    const titleContainer = document.getElementById('titleContainer');
    const linkContainer = document.getElementById('linkContainer');
    const githubLinkContainer = document.getElementById('githubLinkContainer');
    const imageUploadContainer = document.getElementById('imageUploadContainer');
    const locationContainer = document.getElementById('locationContainer');
    const technologiesContainer = document.getElementById('technologiesContainer');
    const descriptionContainer = document.getElementById('descriptionContainer');

    return [titleContainer, linkContainer, githubLinkContainer, imageUploadContainer, locationContainer, technologiesContainer, descriptionContainer];
}

function getAllFields() {
    const title = document.getElementById('title');
    const link = document.getElementById('link');
    const githubLink = document.getElementById('githubLink');
    const imageUpload = document.getElementById('imageUpload');
    const location = document.getElementById('location');
    const technologies = document.getElementById('technologies');
    const description = document.getElementById('description');

    return [title, link, githubLink, imageUpload, location, technologies, description];
}