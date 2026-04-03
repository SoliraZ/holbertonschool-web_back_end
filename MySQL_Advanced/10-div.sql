-- Create SafeDiv function to divide two integers safely
-- Returns zero when divisor is zero to avoid division errors
DELIMITER //
CREATE FUNCTION SafeDiv(a INT, b INT) RETURNS DOUBLE
DETERMINISTIC
NO SQL
BEGIN
    IF b = 0 THEN
        RETURN 0;
    ELSE
        RETURN a / b;
    END IF;
END//
DELIMITER ;
