# MyApp — POC de formulaire Angular

Ce dépôt contient un **POC (Proof of Concept)** autour des formulaires basés sur les signaux d’Angular. L’objectif est de valider une saisie de dates, des règles de validation et l’envoi des données vers une API locale. Il s’agit d’une démonstration technique, pas encore d’un formulaire prêt pour la production.

## Ce que démontre le POC

Le composant [`TestForm`](./src/app/components/test-form/test-form.ts) expose deux champs :

- **Hire Date** : date obligatoire, initialisée à la date du jour (minuit UTC).
- **End Date** : date facultative ; lorsqu’elle est renseignée, elle doit être postérieure à la date d’embauche.

Le formulaire utilise les API Signal Forms d’Angular (`signal`, `form`, `FormField`, `FormRoot`) et le modèle [`DateCompareForm`](./src/Forms/DateCompareForm.ts). Les erreurs apparaissent après interaction avec le champ concerné et le bouton d’envoi est désactivé tant que le formulaire est invalide.

À la soumission, les dates sont converties au format `YYYY-MM-DD` puis envoyées par une requête HTTP `POST` à `https://localhost:7215/Test`, avec un corps de la forme :

```json
{
  "hireDate": "2026-11-03",
  "endDate": null
}
```

La réponse et les erreurs réseau sont actuellement écrites dans la console du navigateur. Le point d’entrée de l’application affiche ce composant directement dans [`app.html`](./src/app/app.html).

## Démarrer le POC

Prérequis : Node.js et npm.

```bash
npm install
npm start
```

Ouvrir ensuite `http://localhost:4200/`. Pour tester l’envoi, l’API locale attendue doit être disponible sur `https://localhost:7215/Test`.

Le client HTTP est configuré au niveau de l’application avec `provideHttpClient()` dans [`app.config.ts`](./src/app/app.config.ts), ce qui permet au composant d’injecter `HttpClient`.

## Limites du POC

- L’URL de l’API est codée en dur ; aucune configuration par environnement n’est en place.
- Il n’y a pas d’état de chargement, de confirmation visible ni de message d’erreur dans l’interface.
- Le traitement HTTP et la gestion du cycle de soumission sont à consolider avant une utilisation réelle.
- Le format envoyé ne transporte que la date (`YYYY-MM-DD`) ; il ne s’agit pas d’une date et heure.

Ces limites sont intentionnelles dans le périmètre actuel : le POC sert d’abord à expérimenter le formulaire et ses validations.

## Vérification

```bash
npm run build
npm test
```

## Structure utile

- [`src/app/components/test-form/`](./src/app/components/test-form/) : composant, template et styles du formulaire.
- [`src/Forms/DateCompareForm.ts`](./src/Forms/DateCompareForm.ts) : type du modèle utilisé par le formulaire.
