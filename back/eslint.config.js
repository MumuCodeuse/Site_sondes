// Utilise la fonction defineConfig qui permet de structurer proprement la configuration ESLint,
// assurant une validation et une clarté accrue de la config.
import { defineConfig } from "eslint/config";

// Importe un module contenant un objet regroupant les variables globales standard pour divers environnements
// (ex. navigateur, Node.js, ES6). Cela permet à ESLint de reconnaître des identifiants souvent utilisés
// sans générer d'erreur de variable non définie.
import globals from "globals";

// Ajoute un plugin spécialisé dans la sécurité. Ce plugin étend ESLint en proposant des règles conçues
// pour détecter des vulnérabilités potentielles dans le code, comme des usages risqués engendrant des failles.
import pluginSecurity from "eslint-plugin-security";

//on exporte la configuration avec defineConfig :
export default defineConfig([
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: "latest",
            // Spécifie que la version ECMAScript à utiliser est la plus récente.
            // Cela permet à ESLint de comprendre et de supporter les dernières fonctionnalités du langage.
            globals: {
                ...globals.browser,
                ...globals.es6,
                ...globals.node,
                ...globals.jest,
            },
            // Fusionne les ensembles de variables globales pour le navigateur, ES6 et Node.
                // Ceci assure que l’analyse statique ne signale pas d'erreurs pour des variables comme 'window',
                // 'document' (navigateur), 'module', 'process' (Node) et d'autres spécifiques à ECMAScript.
        },
        plugins: {
            security: pluginSecurity,
            // Enregistre le plugin de sécurité sous le nom "security".
            // Cela permettra plus tard d'utiliser ses règles dans la section "rules".
        },

        rules: {
            indent: ["error", 4],
            semi: ["error", "always"],
            // Définit la règle d'indentation : toute sous-indentation autre que 4 espaces est considérée comme une erreur.
            // Cette règle renforce une lecture et une maintenance du code de qualité.

            'no-unused-vars': 'warn',
            'no-undef': 'warn',
        },
            ...pluginSecurity.configs.recommended.rules, 
            // Injecte l'ensemble des règles recommandées fournies par le plugin de sécurité.
            // Cela ajoute une couche supplémentaire d'analyse afin de détecter et prévenir les failles de sécurité
            // (par exemple, l'évaluation dangereuse de données ou des patterns de code pouvant être exploités).
    },
]);

