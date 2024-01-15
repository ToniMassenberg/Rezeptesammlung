//var header = document.querySelector('header');
var section = document.querySelector('#section');
//Eine neue Variable, mit einer Referenz auf den Button im Html-Code("Alle Rezepte").
var showAllButton = document.querySelector('button');


var requestURL = 'recipes.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL, true);
request.responseType = 'json';
request.send();

//globale Variable 
request.onload = function() {
    var superRezepte = request.response;
    recipes = superRezepte['recipes']['recipe'];
    //populateHeader(superRezepte);
};

//Funktion, die alle Rezepte mit Nutzung des Buttons aufruft:
showAllButton.onclick = function () {
    showAllRecipes();
};


//Suche, die einzelne Rezepte nach Titel gefiltert ausgibt
function GetRecipes(selectedTitle) {

    section.innerHTML = "";
	
	//Bedingung ist der Key "title", der dem Wert aus der Select-Box entspricht; kopiert das Objekt als zusätzliches Array
    var filteredArray = recipes.filter(function (rezept) {
        return rezept.title === selectedTitle;
    });


    for(var i = 0; i < filteredArray.length; i++) {
		var myMainArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
		var paraZutaten = document.createElement('ul');
		var paraHowto = document.createElement('p');
		var paraNotes = document.createElement('p');

        myH2.textContent = filteredArray[i].title;		
		paraZutaten.textContent = 'Zutaten: ';
		paraHowto.textContent = 'So geht es: ' + filteredArray[i].howto;
		paraNotes.textContent = 'Notizen: ' + filteredArray[i].notes;
		
		//Zutaten als Listenelemente:
        var zutaten = filteredArray[i].zutat;
        for (var j = 0; j < zutaten.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = zutaten[j];
            paraZutaten.appendChild(listItem);
        }
		
        myMainArticle.appendChild(myH2);
        myMainArticle.appendChild(paraZutaten);
        myMainArticle.appendChild(paraHowto);
        myMainArticle.appendChild(paraNotes);

        section.appendChild(myMainArticle);

    }
}		

 //Funktion zum Anzeigen aller Rezepte:
function showAllRecipes() {

    // Zeile zum Leeren des section-Elementes
    section.innerHTML = "";



    for (var i = 0; i < recipes.length; i++) {
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myList = document.createElement('ul');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');

        myH2.textContent = recipes[i].title;
        myList.textContent = 'Zutaten: '
        myPara1.textContent = 'So geht es: ' + recipes[i].howto;
        myPara2.textContent = 'Notizen: ' + recipes[i].notes;

        var zutaten = recipes[i].zutat;
        for (var j = 0; j < zutaten.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = zutaten[j];
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myList);		
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);


        section.appendChild(myArticle);
    }
}

