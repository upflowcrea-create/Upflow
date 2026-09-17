# Assets à fournir

Le site est déjà câblé pour utiliser tes fichiers réels. Tant qu'ils ne sont pas là,
des remplacements élégants (wordmark animé, panneau dégradé) s'affichent à leur place —
dès que tu déposes les fichiers aux emplacements ci-dessous, ils apparaissent automatiquement,
sans toucher au code.

## 1. Logo UPFLOW

Emplacement : `public/assets/logo/upflow-logo.png`

- PNG avec fond transparent de préférence
- Hauteur conseillée : au moins 400px (il est redimensionné en CSS)
- Format horizontal (wordmark) ou carré (icône) — les deux fonctionnent, le composant
  `src/components/Logo.tsx` s'adapte via `object-fit: contain`

## 2. Vidéo de présentation

Emplacement : `public/assets/video/upflow-intro.mp4`

- Format H.264 / mp4, idéalement 1080p ou plus
- Ratio 16:9 conseillé (le composant s'adapte aussi au 9:16 / vertical)
- Poids conseillé : compresse si possible sous 15-20 Mo pour de bonnes perfs web
- Un poster (image de la première frame) peut être ajouté en
  `public/assets/video/upflow-intro-poster.jpg` (optionnel, sinon générée automatiquement au chargement)

## 3. (Optionnel) Vidéos du portfolio

Emplacement : `public/assets/portfolio/*.mp4`

Le tableau des projets est défini dans `src/lib/config.ts` (`PORTFOLIO_ITEMS`).
Remplace les `src` par tes propres fichiers vidéo/miniatures quand tu les as.

---

Une fois les fichiers déposés, il n'y a rien d'autre à faire : recharge la page.
