-- List bands with Glam rock among their styles, ranked by longevity up to 2024
-- style is a comma-separated list; Glam rock is not always the only value
SELECT band_name,
       IFNULL(split, 2024) - formed AS lifespan
FROM metal_bands
WHERE style LIKE '%Glam rock%'
ORDER BY lifespan DESC;
