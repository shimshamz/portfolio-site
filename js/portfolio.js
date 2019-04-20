var request = new XMLHttpRequest();
var portfolioItems;
var githubIcon = '<i class="fab fa-github"></i>';

request.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
        var jsonResponse = (request.responseText);
        portfolioItems = JSON.parse(jsonResponse).items;
        populatePortfolio(portfolioItems);
    }
}

request.open("GET", '../portfolio.json', true);
request.send();

function populatePortfolio(items) {
    Array.from(items).forEach(function(item) {
        if (item.type == 'project') {
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

    var p = document.createElement('p');
    p.classList.add('title');
    var title = document.createElement('a');
    title.innerHTML = item.title;
    title.setAttribute('href', item.url);

    var githubBtn = document.createElement('a');
    githubBtn.classList.add('github-btn');
    githubBtn.setAttribute('href', item.githubURL);
    githubBtn.innerHTML = 'GitHub ' + githubIcon;

    p.appendChild(title);
    cardHeader.appendChild(p);
    cardHeader.appendChild(githubBtn);

    var screenshot = document.createElement('div');
    screenshot.classList.add('screenshot');
    var img = document.createElement('img');
    img.setAttribute('src', item.imgURL);
    screenshot.appendChild(img);

    card.appendChild(cardHeader);
    card.appendChild(screenshot);

    return card;
}