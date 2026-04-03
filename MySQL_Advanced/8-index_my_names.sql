-- Create an index on the first letter of name
-- Improves queries filtering by starting character of name
CREATE INDEX idx_name_first
ON names (name(1));
