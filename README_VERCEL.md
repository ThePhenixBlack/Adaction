Déploiement sur Vercel — notes rapides

But : héberger le front (statique) du projet qui se trouve dans le dossier `adaction-front`.

Étapes recommandées (option 1 — front seul)
1. Dans le dashboard Vercel, créez un nouveau projet lié à ce repo.
2. Lors de la configuration, indiquez le dossier racine du projet à déployer : `adaction-front`.
   - Framework: None (Static)
   - Build Command: laisser vide (pas de build si vos fichiers sont déjà statiques)
   - Output Directory: laisser vide (les fichiers sont servis directement)
   - Framework: None (Static)
   - Build Command: `npm run build` (génère `scripts/config.js` à partir de la variable d'environnement `API_BASE`)
   - Output Directory: laisser vide (les fichiers sont servis depuis le dossier)
3. Définissez l'URL de votre front (ex: https://mon-site.vercel.app) comme variable d'environnement `FRONTEND_URL` dans les paramètres du projet backend si nécessaire.

Option 2 — front sur Vercel + backend elsewhere

Notes techniques ajoutées au repo
Important — variables d'environnement

- Définis `API_BASE` dans les Variables d'environnement du projet Vercel avec l'URL publique de ton backend (ex: `https://api-mon-backend.example.com`). Le build exécutera `npm run build` (voir `adaction-front/package.json`) et générera `adaction-front/scripts/config.js` contenant `window.API_BASE`.

- Si tu ne définis pas `API_BASE`, la valeur par défaut utilisée au runtime sera `http://localhost:3000`.

Notes deploy production
- Si ton backend restera local pendant les tests, les API côté Vercel n’atteindront pas `localhost` — donc pour une vraie mise en production :
- `vercel.json` (racine) : tente de servir le dossier `adaction-front` comme statique et propose un fallback vers `adaction-front/index.html` pour les routes côté client (SPA).
- `adaction-back/server.js` : lecture de `FRONTEND_URL` pour configurer CORS (fallback local `http://127.0.0.1:5500`).

Si tu veux que je transforme le backend en serverless pour tout héberger sur Vercel, dis-le et je prépare les fichiers `/api/*` et un utilitaire de connexion PostgreSQL.
