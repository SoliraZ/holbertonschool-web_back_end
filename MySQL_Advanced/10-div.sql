-- Create SafeDiv function to divide two integers safely
-- Returns zero when divisor is zero to avoid division errors
-- Define function SafeDiv with safe division behavior
DELIMITER //
CREATE FUNCTION SafeDiv(a INT, b INT) RETURNS DOUBLE
DETERMINISTIC
NO SQL
BEGIN
    RETURN IF(b = 0, 0, a / b);
END//
DELIMITER ;
