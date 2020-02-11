//this is my work ....


console.log('Testing Console');

var request = window.indexedDB.open('EXAMPLE_DB',1);
//Creating Database


var db;
var db_id = 3;


request.onsuccess = function(event){
    console.log("Database Created Successfully!");
    
    var products =[
        {id:1, name:'Red Men T-shirt', price:'RM20'},
        {id:2, name:'Yellow Men T-shirt', price:'RM40'},
        {id:3, name:'Orange Men T-shirt', price:'RM60'}
     ];
    
    
    
    
     db = event.target.result;
    
    //create transaction from database
    //creating Table
    var transaction = db.transaction ('products','readwrite');
    
    //add success event handleer for transaction
    //you should also add oneerror, onabort event handlers
    transaction.onsuccess = function(event){
        console.log('[Transaction] ALL DONE!');
    }
    
    var productsStore = transaction.objectStore('products');


//put products data in productsStore

    products.forEach(
        function(product){
            var db_op_req = productsStore.add(product);
        
            db_op_req.onsuccess=function(event){
                console.log(event.target.result == product.id);
            //true
            }
        }

    );
}
  

request.onerror = function(event){
    console.log('[onerror]',request.error);
}

request.onupgradeneeded = function(event){
    var db = event.target.result;
    var productsStore = db.createObjectStore('products', {keyPath:'id'});
    
}


         function add() {
             
            var obj_name = document.getElementById("textid");
            var obj_price = document.getElementById("priceid");
             
            var transaction = db.transaction('products','readwrite');
             
             db_id = db_id+1;
             
             var request = transaction.objectStore('products').add({id: db_id, name:obj_name.value, price:obj_price.value});
             
             
            /*var request = db.transaction(["products"], "readwrite")
            .objectStore("products")
            .add({ id: 4, name: "Red Men T-shirt", price: "RM20" });*/
           
            request.onsuccess = function(event) {
               alert("Red Men T-shirt has been added to your database.");
            };
           
            request.onerror = function(event) {
               alert("Unable to add data\r\nRed Men T-shirt is aready exist in your database! ");
            }
         }