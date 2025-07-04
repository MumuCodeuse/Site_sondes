
BEGIN;

SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

SELECT table_name, column_name 
FROM information_schema.columns 
WHERE table_schema = 'public';

SELECT indexname, tablename 
FROM pg_indexes 
WHERE schemaname = 'public';

-- Vérification booléenne pour la table space_probe
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'space_probe'
); 

SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';
SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = 'public';
SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public';

ROLLBACK;
