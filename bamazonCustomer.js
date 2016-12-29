var prompt = require('prompt');
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon_db"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id" + connection.threadID);
});


//This function displays items sold intitially
function displayInventory() {
	connection.query('SELECT * FROM Products', function(err, inventory){
		if (err) throw err;
		console.log("Inventory");
		for(var i = 0; i < inventory.length; i++){
			console.log("Item ID: " + inventory[i].item_id + " | Product: " + inventory[i].product_name + " | Department: " + inventory[i].department_name + " | Price: " + inventory[i].price + " | Quantity: " + inventory[i].stock_quantity);
		}

		inquirer.prompt([

		{
			type: "input",
			message: "What is the ID of the item you would like to buy?",
			name: "item_id"
		},
		{
			type: "input",
			message: "How many would you like to buy?",
			name: "quantity"
		}
			]).then(function(order) {
				var quantity = order.stock_quantity;
				var itemId = order.item_id;
				connection.query('SELECT * FROM Products WHERE id= ' + itemId, function(err, selectedItem){
					if (err) throw err;
					if (selectedItem[0].stock_quantity - quantity >= 0) {
						console.log("Our inventory has enough of that item " + (selectedItem[0].product_name) + "!");
						console.log("Quantity in stock: " + selectedItem[0].stock_quantity + " Order Quantity: " + quantity);
						console.log("Your total equals " + (order.quantity * selectedItem[0].price) + " dollars. Thank you for shopping on Bamazon!");
						
						//To update the inventory and remove purchased item 
						connection.query('UPDATE Products SET StockQuantity=? WHERE item_id=?', (selectedItem[0].stock_quantity - quantity, itemId),
						function(err, inventory) {
							if (err) throw err;

							displayInventory();
					});
				
				}
					else {
						console.log("Insufficient quantity. Bamazon only has " + selectedItem[0].stock_quantity + " " + selectedItem[0].product_name + " currently in stock.");
							displayInventory();
					}

			});
		});
	});
}

displayInventory();