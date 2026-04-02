-- Rank band origins by total number of fans
-- Computes non-unique fans per country of origin
SELECT origin, SUM(fans) AS nb_fans
FROM metal_bands
GROUP BY origin
ORDER BY nb_fans DESC;
