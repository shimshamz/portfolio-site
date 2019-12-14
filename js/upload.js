const uploadType = document.getElementById('upload-type');
const porfolioFields = document.getElementById('portfolioFields');
const photoFields = document.getElementById('photoFields');
const imageUploadBtn = document.getElementById('imageUpload');
const imageName = document.getElementById('imageName');

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

