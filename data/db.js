// Importation du module 'pg' qui permet d'interagir avec une base de données PostgreSQL.
// Étant donné que 'pg' est un module CommonJS, on doit l'importer différemment dans un projet ES Module.
import pkg from 'pg';  

// Importation du module dotenv, qui permet de charger les variables d'environnement définies dans un fichier .env.
// Ces variables permettent de ne pas exposer directement des informations sensibles (comme les identifiants de connexion).
import dotenv from 'dotenv';

// Extraction de 'Pool' depuis le module 'pg'. Comme 'pg' est en CommonJS, on récupère les éléments par déstructuration.
const { Pool } = pkg;  

// Exécution de la fonction config() qui charge les variables d'environnement dans process.env.
dotenv.config();

// Création d'une instance de Pool pour gérer les connexions à PostgreSQL.
// Ce pool permet de réutiliser des connexions au lieu d'en ouvrir une nouvelle à chaque requête, optimisant ainsi les performances.
let pool;
try {
  pool = new Pool({
    host: process.env.DB_HOST,      // Adresse du serveur PostgreSQL (ex: localhost en développement)
    port: process.env.DB_PORT,      // Port utilisé par PostgreSQL (par défaut, c'est 5432)
    user: process.env.DB_USER,      // Nom d'utilisateur défini dans le fichier .env
    password: process.env.DB_PASSWORD,  // Mot de passe de l'utilisateur PostgreSQL (défini dans .env)
    database: process.env.DB_NAME   // Nom de la base de données à laquelle se connecter
  });
  console.log("✅ Connexion réussie à PostgreSQL");

} catch (error) {
  console.error("❌ Erreur de connexion à PostgreSQL :", error.message);
}

export default pool;

// Exportation de l'objet 'pool' pour pouvoir le réutiliser dans d'autres fichiers du projet.
// Cela permet d'utiliser la connexion à PostgreSQL sans devoir redéfinir une nouvelle instance à chaque fois.
// Le pool gère automatiquement la création et la fermeture des connexions, ce qui est plus efficace.
// Le fichier db.js gère la connexion à la base de données PostgreSQL.
// Il utilise le module 'pg' pour créer un pool de connexions, ce qui optimise les performances.
// Les informations de connexion sont stockées dans un fichier .env pour des raisons de sécurité.
// Le fichier est ensuite exporté pour être utilisé dans d'autres parties de l'application.
// Il est important de ne pas partager le fichier .env publiquement, car il contient des informations sensibles.




