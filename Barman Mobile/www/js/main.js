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
    alert("Pomyślnie dodano przepis!");
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
                button.onclick = function(){
                    
                    db.transaction(function(transaction) {
                    transaction.executeSql('DELETE FROM recipes WHERE id=?', [x], function(transaction, result) {
                    alert('Pomyślnie usunięto!');
                    }, function(transaction, error) {
                        alert(error);});})
                }
                div.appendChild(h3);
                div.appendChild(p);
                p.appendChild(img);
                p.appendChild(p2);
                p.appendChild(button);
                document.getElementById("userRecipes").appendChild(div);
            }
            $('#userRecipes').collapsibleset('refresh');
            
            
            
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
                quality: 80,
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
