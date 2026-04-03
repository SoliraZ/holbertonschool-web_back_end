-- Create composite index on first letter of name and score
-- Optimizes filters on name prefix and score together
CREATE INDEX idx_name_first_score
ON names (name(1), score);
