-- Create trigger to reset valid_email when email changes
-- Keeps validation status only for unchanged email addresses
DELIMITER //
CREATE TRIGGER reset_valid_email
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    IF NEW.email <> OLD.email THEN
        SET NEW.valid_email = 0;
    END IF;
END//
DELIMITER ;
