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

## 3. Calendrier de réservation ⚠️ à configurer

Variable : `BOOKING_URL` dans `src/lib/config.ts`.

Pour un lien connecté **directement à ton Google Calendar** (upflow.crea@gmail.com),
sans passer par un service tiers :
1. Va sur [calendar.google.com](https://calendar.google.com), connecté avec `upflow.crea@gmail.com`.
2. Clique **Créer** → **Calendrier de rendez-vous** (Appointment schedule).
3. Configure tes créneaux disponibles, puis **Enregistrer et publier**.
4. Copie le lien de réservation public affiché
   (`https://calendar.google.com/calendar/appointments/schedules/...`)
   et colle-le à la place de `BOOKING_URL` dans `src/lib/config.ts`.

Les rendez-vous pris via ce lien apparaissent automatiquement dans ton Google Calendar.
(Alternative : garder Calendly et connecter ton Google Calendar dans
Calendly > Availability > Connected Calendars, puis mettre ton lien Calendly ici à la place.)

## 4. (Optionnel) Vidéos du portfolio

Emplacement : `public/assets/portfolio/*.mp4`

Le tableau des projets est défini dans `src/lib/config.ts` (`PORTFOLIO_ITEMS`).
Remplace les `src` par tes propres fichiers vidéo/miniatures quand tu les as.

---

Une fois les fichiers déposés, il n'y a rien d'autre à faire : recharge la page.
