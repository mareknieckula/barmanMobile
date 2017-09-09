var db;

window.onload = function() {
    
    document.getElementById('addNewRecipe').addEventListener('click',saveData);
    db = window.openDatabase("recipes", "1.0", "Recipes", 1000000);
}


function saveData(e) {
    
    db.transaction(saveRecord, onSuccess, onError);
}

function saveRecord(transaction) {
    
    var title = document.getElementById('recipeTitle').value;
    var content = document.getElementById('recipeContent').value;
    transaction.executeSql('CREATE TABLE IF NOT EXISTS recipes(id INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT NOT NULL, Content TEXT NOT NULL)');
    
    var sql = "INSERT INTO recipes (Title,Content) VALUES ('" + title + "', '" + content + "')";
    console.log(sql);
    transaction.executeSql(sql);
    transaction.executeSql("SELECT * FROM recipes", [], getSuccess, getError);
}



function getSuccess(tx, result)
        {
            var rows = result.rows;
            for(var x=0; x< rows.length; x++){
                var title = result.rows[x].Title;
                var content = result.rows[x].Content;
                
                var div = document.createElement("div");
                var h3 = document.createElement("h3");
                var p = document.createElement("p");
                div.setAttribute('data-role','collapsible');
                h3.innerHTML = title;
                p.setAttribute('style','text-align:center');
                p.innerHTML = content;
                div.appendChild(h3);
                div.appendChild(p);
                document.getElementById("userRecipes").appendChild(div);
            }
            
            $('#userRecipes').collapsibleset('refresh');
        }
        function getError(e)
        {
            console.log(e);
        }

function onSuccess() {
    
    console.log("Pomyślnie dodano przepis!");
}

function onError(error) {
    
    console.log("SQL Error: " + error.code);
}


