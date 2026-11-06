# VINÉA – Trace your vineyard

Petit site statique (HTML + CSS + JavaScript, sans framework) pour VINÉA, projet étudiant HEC Lausanne.
Chaque produit porte un QR code ; en le scannant, on arrive sur la page du vignoble d'où vient le raisin.

> Les trois vignobles fournis (`lavaux-01`, `lavaux-02`, `lacote-01`) sont **fictifs** (`"demo": true`, badge « Demo » affiché sur la page).

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil de la marque |
| `vineyard.html` | Page « Trace your vineyard », lit `?id=…` dans l'URL |
| `shop.html` | Boutique (placeholder) |
| `data/vineyards.json` | Les données des vignobles |
| `style.css` | Le design (couleurs, polices, animations) |
| `img/lavaux.mp4` + `img/lavaux.jpg` | Vidéo drone en haut de page (générée avec Higgsfield) et son image d'attente |
| `generate-qr.js` | Script qui génère un QR code PNG par vignoble |
| `qr/` | Les QR codes générés |

## Lancer le site en local

Le site charge `data/vineyards.json` avec `fetch`, il faut donc un petit serveur (ouvrir le fichier en double-clic ne marche pas).

```bash
npx serve .
```

ou, sans Node :

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:3000` (ou `:8000`) et par exemple `http://localhost:3000/vineyard.html?id=lavaux-01`.

**Tester sur son téléphone :** téléphone et ordinateur sur le même Wi-Fi, puis ouvrir `http://<IP-de-l'ordinateur>:3000` sur le téléphone.

## Ajouter un vignoble

1. Ouvrir `data/vineyards.json` et copier un bloc existant. Lui donner un nouvel identifiant unique (ex. `lacote-02`) :

```json
"lacote-02": {
  "demo": false,
  "domain": "Nom du domaine",
  "region": "La Côte",
  "region_label": "La Côte · Lake Geneva",
  "village": "Mont-sur-Rolle",
  "grape": "Chasselas",
  "harvest": 2026,
  "lat": 46.4697,
  "lng": 6.3381,
  "distance_km": 18,
  "winemaker": {
    "name": "Prénom",
    "quote": "Une phrase du vigneron.",
    "photo": "img/vigneron-lacote-02.jpg"
  },
  "website": "https://site-du-domaine.ch",
  "photo": "img/lacote-02.jpg"
}
```

- `lat` / `lng` : clic droit sur le lieu dans Google Maps → les coordonnées s'affichent.
- `photo` (vignoble) et `winemaker.photo` : facultatifs. Laisser `""` pour garder la vidéo de Lavaux et l'initiale du vigneron. Les images vont dans `img/`.
- `website` : facultatif. Vide = le bouton « Visit the winery » ouvre la carte OpenStreetMap du lieu.
- Attention aux virgules : chaque bloc est séparé du suivant par une virgule. Vérifier sur <https://jsonlint.com> en cas de doute.

2. Régénérer les QR codes (voir plus bas). Un nouveau fichier `qr/lacote-02.png` apparaît.

## Générer les QR codes

Une seule fois :

```bash
npm install
```

Ensuite, à chaque nouveau vignoble ou changement d'adresse du site :

```bash
npm run qr
```

L'adresse encodée dans les QR codes est la variable `BASE_URL` en haut de `generate-qr.js`. **Mettez-y l'adresse réelle du site une fois en ligne**, sinon les QR codes pointent vers une mauvaise adresse. On peut aussi la passer sans modifier le fichier :

```bash
BASE_URL=https://votre-nom.github.io/vinea npm run qr
```

Toujours scanner un QR code imprimé avec un téléphone avant de lancer une série de produits.

## Mettre le site en ligne gratuitement

### Option 1 – Netlify (le plus simple)

1. Aller sur <https://app.netlify.com/drop>.
2. Glisser-déposer le dossier du site (sans `node_modules`).
3. Netlify donne une adresse du type `https://xxx.netlify.app` ; on peut la renommer dans *Site configuration → Change site name*.
4. Mettre cette adresse dans `BASE_URL` et relancer `npm run qr`.

### Option 2 – GitHub Pages

1. Créer un dépôt GitHub public (ex. `vinea`) et y pousser le dossier.
2. *Settings → Pages → Source : Deploy from a branch*, branche `main`, dossier `/ (root)`.
3. Après une minute, le site est sur `https://<votre-nom>.github.io/vinea/`.
4. Mettre cette adresse dans `BASE_URL` et relancer `npm run qr`.

## Design

- Couleurs : bordeaux `#6B2A2A`, vert foncé `#234A3A`, crème `#F4EFE6` (en haut de `style.css`).
- Polices Google : Bebas Neue (titres) et DM Sans (texte).
- Carte : Leaflet + OpenStreetMap, pas de clé d'API nécessaire.
