# Assets & configuration

## 1. Logo UPFLOW ✅ déjà en place

Emplacement : `public/assets/logo/upflow-logo.png` — ton logo blanc est déjà dedans.
Pour le remplacer plus tard, dépose simplement un nouveau PNG (fond transparent
de préférence) au même endroit, rien d'autre à toucher.

## 2. Vidéo de présentation ✅ déjà en place

Emplacements : `public/assets/video/upflow-intro.mp4` (H.264, compatible partout),
`upflow-intro.webm` (VP9, plus léger) et `upflow-intro-poster.jpg`.
Elle se lance automatiquement (en muet) dès qu'on arrive sur sa section.
Pour la remplacer, dépose un nouveau fichier et retranscode-le en H.264 :
```
ffmpeg -i ta-video.mov -vf "scale=1920:-2" -c:v libx264 -crf 22 -c:a aac -movflags +faststart public/assets/video/upflow-intro.mp4
```

## 3. Formulaire de réservation ⚠️ à configurer

Variable : `WEB3FORMS_ACCESS_KEY` dans `src/lib/config.ts`.

Le bouton "Book a call" / "Parler du projet" ouvre un vrai formulaire intégré au
site (date, heure, nom, email, téléphone, message) — pas d'iframe externe qui
peut être bloquée. À l'envoi, un email avec toutes les infos part directement
à ta boîte mail, via [Web3Forms](https://web3forms.com) (gratuit, sans backend) :

1. Va sur [web3forms.com](https://web3forms.com).
2. Entre `upflow.crea@gmail.com` — pas besoin de créer de compte.
3. Tu reçois une **Access Key** par email : copie-la.
4. Colle-la à la place de `WEB3FORMS_ACCESS_KEY` dans `src/lib/config.ts`.

C'est tout : chaque demande de rendez-vous atterrit directement dans ta boîte mail.

## 4. Portfolio

Le tableau des projets est défini dans `src/lib/config.ts` (`PORTFOLIO_ITEMS`).
Un item peut avoir `video` / `videoWebm` / `poster`, une galerie `photos: string[]`,
une `description`, un `badge` (petit tag genre "On fait ça aussi") et `featured: true`
pour occuper une tuile plus large dans la grille (comme le projet Adidas × Bucket déjà en place,
dans `public/assets/portfolio/event-adidas-bucket/`). Ajoute un item sur le même modèle
pour tes prochains projets.

---

Une fois les fichiers déposés, il n'y a rien d'autre à faire : recharge la page.
