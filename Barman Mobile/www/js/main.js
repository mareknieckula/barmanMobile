var db;


window.onload = function() {
    
    document.getElementById('addNewRecipe').addEventListener('click',saveData);
    document.getElementById('btnTakePic').addEventListener('click',takePic);
    document.getElementById('btnShowRecipes').addEventListener('click',showData);
    db = window.openDatabase("recipes", "1.0", "Recipes", 1000000);
    
}


function showData(e) {
    
    document.getElementById("userRecipes").innerHTML = "";
    db.transaction(readRecord, reSuccess, reError);
    location.href='index.html#myRecipes';
}

function readRecord(transaction) {
    
    transaction.executeSql('CREATE TABLE IF NOT EXISTS recipes(id INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT NOT NULL, Content TEXT NOT NULL, Image TEXT NOT NULL)');
    transaction.executeSql("SELECT * FROM recipes", [], getSuccess, getError);
}


function saveData(e) {
    
    document.getElementById("userRecipes").innerHTML = "";
    db.transaction(saveRecord, onSuccess, onError);
}

function saveRecord(transaction) {
    
    var title = document.getElementById('recipeTitle').value;
    var content = document.getElementById('recipeContent').value;
    var image = document.getElementById('addedPic').src;
    transaction.executeSql('CREATE TABLE IF NOT EXISTS recipes(id INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT NOT NULL, Content TEXT NOT NULL, Image TEXT NOT NULL)');
    
    var sql = "INSERT INTO recipes (Title,Content,Image) VALUES ('" + title + "', '" + content + "', '" + image + "')";
    console.log(sql);
    transaction.executeSql(sql);
    navigator.notification.alert('Pomyślnie dodano przepis na ' + title + '!',false,'Nowy przepis','OK, Super!');
    location.href='index.html#myRecipes';
    transaction.executeSql("SELECT * FROM recipes", [], getSuccess, getError);
    
}



function getSuccess(tx, result)
        {
            var rows = result.rows;
            for(var x=0; x< rows.length; x++){
                var title = result.rows[x].Title;
                var content = result.rows[x].Content;
                var image = result.rows[x].Image;
                var id = result.rows[x].id;
                
                var div = document.createElement("div");
                var h3 = document.createElement("h3");
                var p = document.createElement("p");
                var button = document.createElement("button");
                var p2 = document.createElement("p");
                var img = document.createElement("img");
                img.setAttribute('src',image);
                div.setAttribute('data-role','collapsible');
                h3.innerHTML = title;
                p.setAttribute('style','text-align:center');
                p.innerHTML = content + "<br/><br/>";
                p2.innerHTML = "<br/><br/>";
                button.innerHTML =  "Usuń ten przepis";
                button.onclick = function() {
                    
                navigator.notification.confirm(
                    
                    'Czy napewno chcesz usunąć przepis na ' + title + '?',
                    
                    function(){
                    
                    db.transaction(function(transaction) {
                    transaction.executeSql('DELETE FROM recipes WHERE id=?', [id], function(transaction, result) {
                        navigator.notification.alert('Pomyślnie usunięto przepis na '+title+'!',false,'Usuwanie zakończone','W porządku!');
                        }, function(transaction, error) {
                        alert(error);});
                        })
                    
                    },
                    'Potwierdź usunięcie',
                    
                    'Tak,Nie'
                    );}
                div.appendChild(h3);
                div.appendChild(p);
                p.appendChild(img);
                p.appendChild(p2);
                p.appendChild(button);
                document.getElementById("userRecipes").appendChild(div);
            
                
            $('#userRecipes').collapsibleset('refresh');
            
            }
            
        }
        function getError(e)
        {
            console.log(e);
        }

function onSuccess() {
    
    console.log("Pomyślnie dodano przepis!")
}

function onError(error) {
    
    console.log("SQL Error: " + error.code);
}

function reSuccess() {
    
    console.log("Pomyślnie odczytano!")
}

function reError(error) {
    
    console.log("SQL Error: " + error.code);
}

function takePic(e)
        {
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                encodingType: Camera.EncodingType.JPEG,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                targetWidth: 200,
                targetHeight: 300,
                correctOrientation: true
        
            }
        
         navigator.camera.getPicture(success,fail, options);
        }
            
        function success(thePicture)
        {
            var image = document.getElementById('addedPic');
            image.src = thePicture;
        }
            
        function fail(e)
        {
            alert("Image failed: " + e.message);
        }

function showInfo() {
    
    info =  'Tytuł: Barman Mobile' + '\n' +
            'Wersja: 1.0' + '\n' +
            'Autor: Marek Nieckula' + '\n' +
            'Opis: Aplikacja Barman Mobile - baza Twoich przepisów na drinki alkoholowe i bezalkoholowe. Użytkownik może dodać własny przepis (będzie on przechowywany w lokalnej bazie danych), do przepisu może dołączyć zdjęcie wybrane z galerii urządzenia mobilbnego. Użyte technologie: WebSQL oraz wtyczka cordova.camera.'
    
    navigator.notification.alert(info,false,'Informacje o Aplikcaji','OK, wszystko jasne!');
}
