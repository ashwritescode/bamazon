use bamazon_db;

CREATE TABLE IF NOT EXISTS `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(50) NOT NULL,
  `department_name` varchar(30) NOT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `stock_quantity` int(10) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
); 

INSERT INTO `products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES
	(1, 'Pink Flamingo', 'Outdoors', 10.00, 9),
	(2, 'Linen Loveseat', 'Home Decor', 600.00, 3),
	(3, '36" HD Flatscreen TV', 'Electronics', 580.00, 7),
	(4, 'Original Pac Man Video Game', 'Electronics', 25.00, 9),
	(5, 'Harry Josh Hair Dryer', 'Beauty', 290.00, 2),
	(6, 'Hand-Woven Hammock', 'Outdoors', 65.00, 7),
	(7, 'Longhorn Sweatshirt', 'Apparel', 35.00, 9),
	(9, 'Lord of the Rings Monopoly', 'Entertainment', 32.00, 4),
	(10, 'Russian Oak Dining Table', 'Home Decor', 999.00, 1);
    
    select * from products;