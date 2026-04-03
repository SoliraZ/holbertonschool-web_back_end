-- Create trigger to decrease item quantity after each new order
-- Keeps items quantity updated automatically from orders inserts
DELIMITER //
CREATE TRIGGER decrease_item_quantity
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    UPDATE items
    SET quantity = quantity - NEW.number
    WHERE name = NEW.item_name;
END//
DELIMITER ;
