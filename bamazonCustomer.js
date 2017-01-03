

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon_db'
});

connection.connect(function (err) {
    if (err) throw err;
        console.error("connected as id" + connection.threadID);

    getData();
});

function getData() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        getUserPrompt(data);
    });
}

function getUserPrompt(data) {
    var options = [];
    for (d in data) {
        options[d] = data[d].item_id + " : " + data[d].product_name;
    }
		console.log(' ___________________________________');
		console.log('|===================================|');
		console.log('|======= WELCOME TO BAMAZON! =======|');
		console.log('|===================================|');
		console.log(' ___________________________________');

    inquirer.prompt([
        {
            type: "list",
            name: "products",
            message: "Please select the item you would like to buy.",
			choices: options,
        },
        {
            type: "input",
            name: "quantity",
            message: "Enter the desired quantity."
        }
    ]).then(function (userInput) {

        var product = userInput.products.split(" :");
        var products = product[0];

        connection.query("SELECT * FROM products WHERE ?",
            [{ item_id: products }],
            function (error, data) {
                if (error) throw error;
                checkStock(data, userInput.quantity);
            });
    });

    function checkStock(data, quantity) {
        if (data[0].stock_quantity < quantity) {
				console.log('|================================================|');
				console.log('| INSUFFICIENT QUANTITY! -- CHOOSE ANOTHER ITEM! |');
				console.log('|================================================|');
            getData();
        } else {
            updateDB(data, quantity);
            totalCost(data, quantity);
        }
    }

    function updateDB(data, quantity) {
        var quantity_left = data[0].stock_quantity - quantity;
        connection.query("UPDATE products SET ? WHERE ?",
            [
                { stock_quantity: quantity_left },
                { item_id: data[0].item_id }
            ],
            function (error, data) {
                if (error) throw error;
            });
    }

    function totalCost(data, quantity) {
		console.log('|===================================|');
		console.log('| Thank you for placing your order! |');
		console.log('|___________________________________| \n');
		console.log('|           ORDER DETAILS           | \n' );

        console.log("Product: " + data[0].product_name);
        console.log("Price: $" + data[0].price);
        console.log("Quantity: " + quantity + "\n");
        console.log("Total Cost: $" + data[0].price * quantity + "\n")
        connection.end();
    }

}
