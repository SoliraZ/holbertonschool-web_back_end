-- Create view need_meeting listing students requiring a new meeting
-- Selects students with score below 80 and no recent last_meeting
CREATE VIEW need_meeting AS
SELECT name
FROM students
WHERE score < 80
  AND (
      last_meeting IS NULL
      OR last_meeting < DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
  );
