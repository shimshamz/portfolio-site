var request = new XMLHttpRequest();
var portfolioItems;
var githubIcon = '<i class="fab fa-github"></i>';

/* request.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
        var jsonResponse = (request.responseText);
        portfolioItems = JSON.parse(jsonResponse).items;
        populatePortfolio(portfolioItems);
    }
}

request.open("GET", '../portfolio.json', true);
request.send(); */

db.collection('portfolio-items').orderBy("dateAdded", "desc").get().then((snapshot) => {
    portfolioItems = snapshot.docs;
    populatePortfolio(portfolioItems);
})

function populatePortfolio(items) {
    Array.from(items).forEach(function(item) {
        item = item.data();
        if (item.itemType == 'project') {
            var list = document.getElementById('projects');
        } else {
            var list = document.getElementById('coursework');
        }
        var newCard = createCard(item);
        list.appendChild(newCard); 
    });
}

function createCard(item) {
    var card = document.createElement('div');
    card.classList.add('item-card');

    var cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    var title = document.createElement('p');
    title.classList.add('title');
    var titleLink = document.createElement('a');
    titleLink.innerHTML = item.title;
    titleLink.setAttribute('href', item.link);

    var githubBtn = document.createElement('a');
    githubBtn.classList.add('github-btn');
    githubBtn.setAttribute('href', item.githubLink);
    githubBtn.innerHTML = 'GitHub ' + githubIcon;

    title.appendChild(titleLink);
    cardHeader.appendChild(title);
    cardHeader.appendChild(githubBtn);

    card.appendChild(cardHeader);

    var screenshot = document.createElement('div');
    screenshot.classList.add('screenshot');
    if (item.imgLink) {
        let storageRef = storage.ref(item.imgLink);
        storageRef.getDownloadURL().then(function(url) {
            var img = document.createElement('img');
            img.setAttribute('src', url);
            screenshot.appendChild(img);
        }).catch(function(error) {
            console.log(error);
        });
    }
    card.appendChild(screenshot);

    var tech = document.createElement('p');
    tech.classList.add('tech');
    tech.innerHTML = item.technologies;
    var desc = document.createElement('p');
    desc.classList.add('desc');
    desc.innerHTML = item.description;

    card.appendChild(tech);
    card.appendChild(desc);

    return card;
}