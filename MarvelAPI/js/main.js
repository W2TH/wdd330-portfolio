const url1 = "https://gateway.marvel.com/v1/public/characters?"
const url2 = "&ts=1&apikey=bc78813236d6d6cc83c2163be59b7650&hash=3051862eab0a5905267bd6c5d240cf97"

function character() {
    let urlQueryParameters = new URLSearchParams(window.location.search),
        queryParameterName = urlQueryParameters.get("name"),
        name = document.getElementById("name").value;
    //console.log(ts);

    if (queryParameterName !== null && queryParameterName !== "") {
        document.getElementById("name").value = queryParameterName;
        connection();
    } else if (name !== null && name !== "") {
        document
            .getElementById("connectionForm")
            .addEventListener("submit", connection);
    }
}

function connection() {

    var name = document.getElementById("name").value;
    var params = "name=" + name;

    fetch(url1 + params + url2)
        .then(res => res.json())
        .then(data => {

            let results = data;
            if (results["data"].count === 0) {
                document.getElementById("characterSection").innerHTML =
                    '<h2 id="characterMainTitle" class="mt-4">No results for <i>' +
                    name +
                    "</i>. Try again.</h2>";

            } else if (results === undefined || results.length == 0) {
                document.getElementById("characterSection").innerHTML =
                    '<h2 id="characterMainTitle">' +
                    "An error might have occured on our end, Sorry. <br>In this case, try again later.</h2>";

            } else {
                var characterAttributes = results["data"].results[0];
                var characterID = results["data"].results[0].id;
                var output = "";

                output +=
                    '<h2 id="characterMainTitle" class="mt-4">' +
                    "Character" +
                    "</h2>" +
                    '<div class="card mb-4" id="characterCard">' +
                    '<div id="characterImage">' +
                    '<img class="card-img-left d-md-block img-fluid"' +
                    ' alt="Picture of ' +
                    characterAttributes.name +
                    '" src="' +
                    characterAttributes.thumbnail["path"] +
                    "." +
                    characterAttributes.thumbnail["extension"] +
                    '">' +
                    "</div>" +
                    '<div class="card-body">' +
                    '<h3 class="mb-0 text-dark" id="characterName">' +
                    characterAttributes.name +
                    "</h3>" +
                    '<p class="card-text mb-3" id="characterDescription">';
                if (characterAttributes.description !== "") {
                    output += characterAttributes.description;
                } else {
                    output += "No Information";
                }
                output +=
                    "</p>" +
                    '<div class="mt-auto">' +
                    '<p class="text-muted mb-0 " id="comicsAvailable">' +
                    "Comics: " +
                    characterAttributes.comics.available +
                    " | " +
                    "Series: " +
                    characterAttributes.series.available +
                    " | " +
                    "Stories: " +
                    characterAttributes.stories.available +
                    " | " +
                    "Events: " +
                    characterAttributes.events.available +
                    "</p>" +
                    '<p class="mb-1 text-muted" id="characterInfoAttribution">' +
                    results["attributionText"] +
                    "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                document.getElementById("characterSection").innerHTML = output;

                comics(characterID);
            } // else {
            //console.log("onload error...");
        });

}

function comics(characterID) {

    fetch("https://gateway.marvel.com:443/v1/public/characters/" +
            characterID +
            "/comics?" +
            url2)
        .then(res => res.json())
        .then(data => {
            var comics = data["data"].results;
            var comicSection = document.getElementById("comicSection");
            let results = data;

            if (results["data"].count === 0) {
                var output = "";
                comicSection.innerHTML = output;
                comicSection.innerHTML = "<h2>No comics Available</h2>";
            } else {
                // comics available
                var output = "";
                var creators = "";

                output +=
                    '<h2 id="comicMainTitle">Comics</h2>' +
                    '<div class="comic-card-columns">';

                for (const i in comics) {
                    if (comics.hasOwnProperty(i)) {
                        const comic = comics[i];

                        output +=
                            '<div class="comic-card mb-0">' +
                            '<a href="./comic.html?comic-id=' +
                            comic.id +
                            '"><img src="' +
                            comic.thumbnail["path"] +
                            "." +
                            comic.thumbnail["extension"] +
                            '" class="comic-card-img" alt="' +
                            comic.title +
                            '">' +
                            //'<div class="comic-card-body">' +
                            '<h5 class="comic-card-title">' +
                            comic.title +
                            "</h5>";


                        output +=
                            //"</div>" +

                            "</div>" +
                            '</a>';
                    }
                }

                output += "</div>";

                comicSection.innerHTML = output;
            }
        });
}

function singleComic() {
    var urlQueryParameters = new URLSearchParams(window.location.search),
        comicID = urlQueryParameters.get("comic-id");

    fetch("https://gateway.marvel.com:443/v1/public/comics/" +
            comicID +
            "?" +
            url2)
        .then(res => res.json())
        .then(data => {
            var results = data;
            (comicInfo = results["data"].results[0]),
            (comicImage =
                comicInfo.thumbnail["path"] + "." + comicInfo.thumbnail["extension"]),
            (comicDescription = comicInfo.description),
            (comicCharacters = comicInfo.characters.items),
            (comicCreators = comicInfo.creators.items),
            (output = ""),
            (singleComicContainerDiv = document.getElementById(
                "singleComicContainerDiv"
            ));

            output +=
                '<h1 class="header-main-title single-comic__main-title mt-4">' +
                comicInfo.title +
                "</h1>" +
                '<div class="card mb-3">' +
                '<div id="characterImage">' +
                '<img src="' +
                comicImage +
                '" class="card-img-left d-md-block img-fluid" alt="...">' +
                "</div>" +
                '<div class="card-body">' +
                '<h3 class="mb-0 text-dark">' +
                comicInfo.title +
                "</h3>";

            if (comicDescription !== null && comicDescription !== "") {
                output += '<p class="card-text">' + comicDescription + "</p>";
            }

            output +=
                '<p class="card-text mt-3 mb-0">' +
                '<small class="text-muted">' +
                " Characters: ";
            for (const i in comicCharacters) {
                if (comicCharacters.hasOwnProperty(i)) {
                    const character = comicCharacters[i];
                    output +=
                        '<a href="./index.html?name=' +
                        character.name +
                        '">' +
                        character.name +
                        "</a>, ";
                }
            }

            output +=
                "</small>" +
                "</p>" +
                '<p class="card-text">' +
                '<small class="text-muted">' +
                "Creators: ";
            for (const i in comicCreators) {
                if (comicCreators.hasOwnProperty(i)) {
                    const creator = comicCreators[i];
                    var url = new URL(creator.resourceURI),
                        creatorID = url.pathname.substring(
                            url.pathname.lastIndexOf("/") + 1
                        );
                    output +=
                        '<a href="./creator.html?creator-id=' +
                        creatorID +
                        '">' +
                        creator.name.concat(" (" + creator.role + "), ") +
                        "</a> ";
                }
            }

            output +=
                "</small>" +
                "</p>" +
                '<div class="mt-auto text-muted"> ' +
                results["attributionText"] +
                "</div>" +
                "</div>" +
                "</div>";

            singleComicContainerDiv.innerHTML = output;
        });
}

function comicCreator() {

    var urlQueryParameters = new URLSearchParams(window.location.search),
        creatorID = urlQueryParameters.get("creator-id");

    fetch("https://gateway.marvel.com:443/v1/public/creators/" +
            creatorID +
            "?" +
            url2)
        .then(res => res.json())
        .then(data => {
            var results = data,
                output = "",
                creatorInfo = data["data"].results[0],
                creatorFullName = creatorInfo.fullName,
                creatorImage =
                creatorInfo.thumbnail["path"] +
                "." +
                creatorInfo.thumbnail["extension"],
                comicCreatorContainerDiv = document.getElementById(
                    "comicCreatorContainerDiv"
                ),
                creatorComics = creatorInfo.comics.items;

            output +=
                '<h1 class="header-main-title single-comic__main-title">Creator</h1>' +
                '<div class="card mb-3">' +
                '<div id="characterImage">' +
                '<img src="' +
                creatorImage +
                '" class="card-img-left d-md-block img-fluid" alt="...">' +
                "</div>" +
                '<div class="card-body">' +
                '<h3 class="mb-0 text-dark">' +
                creatorFullName +
                "</h3>";

            output +=
                '<p class="text-muted mb-3">' +
                "Comics: " +
                creatorInfo.comics["available"] +
                " | " +
                "Series: " +
                creatorInfo.series["available"] +
                " | " +
                "Stories: " +
                creatorInfo.stories["available"] +
                " | " +
                "Events: " +
                creatorInfo.events["available"] +
                "</p>";

            output +=
                "</small>" +
                "</p>" +
                '<div class="mt-auto text-muted"> ' +
                results["attributionText"] +
                "</div>" +
                "</div>" +
                "</div>";

            output +=
                '<h1 class="header-main-title single-comic__main-title">Comics</h1>' +
                '<div class="row" id="comicColumns"></div>';

            comicCreatorContainerDiv.innerHTML = output;

            for (const i in creatorComics) {
                if (creatorComics.hasOwnProperty(i)) {
                    const comic = creatorComics[i];
                    creatorSingleComic(comic.resourceURI);
                }
            }
        });
}

function creatorSingleComic(comicResourceURI) {
    var url = new URL(comicResourceURI),
        comicID = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
    fetch("https://gateway.marvel.com:443/v1/public/comics/" +
            comicID +
            "?" +
            url2)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            var results = data,
                comicInfo = data["data"].results[0],
                comicImage =
                comicInfo.thumbnail["path"] + "." + comicInfo.thumbnail["extension"],
                comicTitle = comicInfo.title,
                output = "",
                comicColumns = document.getElementById("comicColumns");
            output =
                '<div class="comic-card-columns" >' +
                '<div class="comic-card mb-0">' +
                '<a href="./comic.html?comic-id=' +
                comicInfo.id +
                '">' +
                '<img src="' +
                comicImage +
                '" class="comic-card-img" alt="' +
                comicTitle +
                '">' +
                '<h5 class="comic-card-title">' +
                comicTitle +
                "</h5>" +
                "</a>" +
                "</div>" +
                "</div>";

            comicColumns.innerHTML += output;
        });

}