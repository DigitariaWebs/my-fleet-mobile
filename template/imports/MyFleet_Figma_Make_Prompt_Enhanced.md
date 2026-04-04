# MyFleet — Figma Make Prompt (Enhanced)

## Project Overview

Design a complete premium mobile app called **MyFleet** — a luxury car rental marketplace platform connecting users with high-end rental agencies across France. The app is entirely in **French**. The design must evoke the digital experience of brands like Porsche, Aston Martin, or Mercedes-AMG — dark, refined, confident, and automotive-luxury. Absolutely **no emojis anywhere in the UI** — use refined line-style icons only. Use **Poppins** as the sole typeface across every screen and component.

The app enables users to browse rental agencies, explore luxury vehicle fleets, book with or without a private chauffeur, track deliveries in real-time, report damages, earn loyalty rewards, and leave reviews.

---

## Design System

### Color Palette

| Token | Hex | Specific Usage |
|---|---|---|
| **Background Primary** | `#050404` | App background, screen canvases, status bar area |
| **Surface / Cards** | `#2E1C2B` | Card backgrounds, bottom sheets, input field backgrounds, nav bar background |
| **Accent / Primary CTA** | `#4A1942` | All primary buttons, active tab indicators, toggle active state, progress indicators, selected chips, links |
| **Accent Gradient** | `#2E1C2B` → `#4A1942` | Hero sections, premium card fills, onboarding overlays, loyalty tier cards |
| **Text Primary** | `#EAEAEA` | Headlines, body text, button labels, input values |
| **Text Secondary** | `#EAEAEA` at 60% opacity | Captions, helper text, timestamps, placeholder text, secondary labels |
| **Text Muted** | `#EAEAEA` at 40% opacity | Disabled states, tertiary info |
| **Dividers / Borders** | `#EAEAEA` at 10% opacity | Card borders, input borders (default state), separators |
| **Input Border Focus** | `#4A1942` | Focused input field border |
| **Success** | `#2ECC71` | Verified badges, successful booking confirmation, "Vérifié" status |
| **Warning** | `#F39C12` | "En attente" status, pending verification |
| **Error / Destructive** | `#E74C3C` | Error messages, "Refusé" status, "Annuler" destructive actions, damage report accents |
| **Star Rating** | `#F1C40F` | Star icons in ratings |

**Critical rule:** Never use pure white `#FFFFFF` anywhere — all white elements use `#EAEAEA`. Never use pure black for text — all text is `#EAEAEA` or its opacity variants. The overall impression should be warm dark tones with purple-plum accents, not cold.

### Typography

All text uses **Poppins** exclusively:

| Level | Weight | Size (suggested) | Usage |
|---|---|---|---|
| Display | Bold (700) | 28–32px | Splash logo, hero headlines |
| H1 | Bold (700) | 24px | Screen titles |
| H2 | SemiBold (600) | 20px | Section headers ("Agences populaires", "Véhicules recommandés") |
| H3 | SemiBold (600) | 17px | Card titles, car model names |
| Body | Regular (400) | 15px | Descriptions, body text, input values |
| Caption | Medium (500) | 13px | Labels, helper text, timestamps, badge text |
| Small | Regular (400) | 11px | Legal text, fine print |

### Design Style Rules

- **Rounded corners:** 16px on cards, 12px on buttons and inputs, 24px (full round) on pills and chips
- **Spacing grid:** 8px base grid. Padding inside cards: 16px or 20px. Gaps between cards: 12px. Screen horizontal padding: 20px
- **Shadows:** Subtle dark shadows only (rgba(0,0,0,0.3)), never light/white shadows. Used sparingly on floating elements
- **Glassmorphism:** Subtle frosted-glass effect on overlapping elements (bottom sheets, floating cards on hero images) — background blur 20px with `#2E1C2B` at 70% opacity
- **Car imagery:** Use high-quality realistic car photo placeholders throughout — never icons or illustrations for vehicles. Show premium cars (Porsche 911, Mercedes AMG, BMW M4, Audi RS, Range Rover, etc.)
- **Iconography:** Line-style icons only, consistent 1.5px stroke weight, `#EAEAEA` color. Use Lucide or Phosphor thin icon style. 24px icon size standard, 20px for compact contexts
- **Minimum touch targets:** 44px on all interactive elements
- **Frame size:** 390x844px (iPhone 14 / cross-platform reference)
- **Respect safe areas:** Status bar, notch area, and bottom home indicator

---

## Screen-by-Screen Specification

Design each screen listed below as a **separate frame at 390x844px**.

---

### 1. SPLASH SCREEN

- Background: solid `#050404`
- MyFleet logo centered both horizontally and vertically (placeholder: elegant wordmark "MyFleet" in Poppins Bold, with the "M" subtly accented in `#4A1942`)
- Subtle ambient glow behind the logo: radial gradient from `#4A1942` at 30% opacity fading to transparent, radius ~200px
- No other elements — pure, minimal, premium first impression
- Subtle loading indicator at the very bottom: thin horizontal progress bar in `#4A1942`, 2px height

---

### 2. ONBOARDING SLIDER (3 pages)

Each slide is a full-bleed screen. Swipeable with dot pagination.

**Slide 1:**
- Background: high-quality photo of a luxury car on a scenic Riviera coastal road (full-bleed)
- Semi-transparent dark overlay: linear gradient from `#050404` at 80% (bottom) to transparent (top 40%)
- Headline (bottom third): "Louez en toute simplicité" — Poppins Bold 26px, `#EAEAEA`
- Subtitle below: "Parcourez les meilleures agences et réservez en quelques secondes" — Poppins Regular 15px, `#EAEAEA` at 70%

**Slide 2:**
- Background: photo of a premium car showroom or polished fleet
- Same overlay treatment
- Headline: "Des agences de confiance"
- Subtitle: "Toutes nos agences sont vérifiées et notées par la communauté"

**Slide 3:**
- Background: photo of a Porsche or similar being handed keys (lifestyle shot)
- Same overlay treatment
- Headline: "Votre flotte, votre choix"
- Subtitle: "Berlines, SUV, sportives, cabriolets — avec ou sans chauffeur"

**Common elements across all 3 slides:**
- Pagination dots at bottom center: active dot = `#4A1942` filled circle (8px), inactive = `#EAEAEA` at 30% (6px)
- Primary CTA at very bottom: "Commencer" button — full-width (minus 40px margins), 52px height, `#4A1942` fill, `#EAEAEA` text, 12px rounded
- Top-right: "Passer" text link in `#EAEAEA` at 60%, Poppins Medium 14px

---

### 3. INSCRIPTION / CONNEXION (Sign Up / Login)

**Tab toggle at top:** Two tabs — "Connexion" | "Inscription" — underline style, active tab has `#4A1942` underline (3px) and full `#EAEAEA` text, inactive tab has `#EAEAEA` at 50% text

**Inscription (Sign Up) tab:**
- Input: "Nom complet" — dark input field (`#2E1C2B` background, `#EAEAEA` at 10% border, `#EAEAEA` at 40% placeholder text, left-aligned user icon)
- Input: "Adresse e-mail" — same styling with mail icon
- Input: "Numéro de téléphone" — with country code prefix selector showing flag icon + "+33"
- Input: "Mot de passe" — with show/hide eye toggle icon on right
- 12px gap
- Primary button: "Créer mon compte" — full-width, `#4A1942` fill, `#EAEAEA` text, 52px height
- 20px gap
- Divider line: thin `#EAEAEA` at 10% line with centered text "ou continuer avec" in `#EAEAEA` at 50%, Poppins Regular 13px
- 16px gap
- Social login row: two buttons side-by-side:
  - Google button: `#2E1C2B` fill, Google "G" logo + "Google" text
  - Apple button: `#2E1C2B` fill, Apple logo + "Apple" text
  - Both: 48px height, 12px rounded, `#EAEAEA` at 10% border
- Bottom text: "Déjà un compte ?" in `#EAEAEA` at 60% + "Se connecter" as a link in `#EAEAEA` full opacity, underlined

**Connexion (Login) tab:**
- Input: "E-mail ou téléphone"
- Input: "Mot de passe" with eye toggle
- Right-aligned below password: "Mot de passe oublié ?" link in `#EAEAEA` at 60%, Poppins Medium 13px
- Primary button: "Se connecter"
- Same social login block
- Bottom text: "Pas encore de compte ?" + "S'inscrire" link

---

### 4. OTP VERIFICATION SCREEN

- Background: `#050404`
- Back arrow (top-left)
- Title: "Vérifiez votre numéro" — Poppins Bold 22px
- Subtitle: "Un code a été envoyé au +33 6 ** ** **42" — Poppins Regular 14px, `#EAEAEA` at 60%
- 32px gap
- 6-digit OTP input: 6 separate square boxes (48x52px each), `#2E1C2B` fill, `#EAEAEA` at 10% border, centered number in Poppins SemiBold 24px. Active/focused box has `#4A1942` border. Boxes spaced 10px apart, horizontally centered
- 24px gap
- "Renvoyer le code" text link — initially disabled (`#EAEAEA` at 30%) with countdown "(60s)", becomes tappable (`#EAEAEA` full) when timer reaches 0
- 32px gap
- Primary button: "Vérifier" — full-width, `#4A1942` fill

---

### 5. KYC VERIFICATION FLOW (4 steps)

**Step 1 — Introduction**
- Back arrow top-left
- Step indicator: "Étape 1/3" — Poppins Medium 13px, `#EAEAEA` at 60%
- Progress bar below: thin (4px) bar, 33% filled in `#4A1942`, rest in `#EAEAEA` at 10%
- 24px gap
- Title: "Vérification d'identité" — Poppins Bold 22px
- Subtitle: "Pour votre sécurité et celle de nos agences partenaires, nous devons vérifier votre identité" — Poppins Regular 15px, `#EAEAEA` at 70%
- 24px gap
- Illustration area: refined line illustration or icon of an ID card with a shield overlay, rendered in `#4A1942` and `#EAEAEA` tones (no emoji, no cartoon)
- 20px gap
- Benefit bullets (each on its own line with a small check-circle icon in `#4A1942`):
  - "Location sécurisée et garantie"
  - "Badge vérifié sur votre profil"
  - "Accès à l'ensemble des véhicules"
- 32px gap
- Primary button: "Commencer la vérification"
- Ghost text below: "Plus tard" in `#EAEAEA` at 50% — skips KYC but limits app features

**Step 2 — Document Upload**
- Back arrow + "Étape 2/3" + progress bar at 66%
- Title: "Pièce d'identité"
- Subtitle: "Prenez en photo le recto et le verso de votre carte d'identité nationale"
- 24px gap
- Two upload zones stacked vertically (16px gap between):
  - **"Recto"** label above first zone
  - Upload zone: dashed border card (`#EAEAEA` at 15% dashed border, `#2E1C2B` fill, 120px height, 16px rounded). Centered content: camera icon (24px, `#EAEAEA` at 40%) + "Prendre une photo ou importer" text below in Poppins Medium 13px, `#EAEAEA` at 50%
  - **"Verso"** label + identical zone
- After upload: zone shows photo thumbnail with a small "X" delete icon top-right and a green check overlay
- 12px gap
- Tip text: "Assurez-vous que la photo est nette, bien éclairée et que tous les textes sont lisibles" — Poppins Regular 12px, `#EAEAEA` at 50%, with info-circle icon
- 24px gap
- Section divider
- Title: "Permis de conduire"
- Same two upload zones for "Recto" and "Verso" of permis
- Primary button at bottom: "Continuer" — disabled state (`#4A1942` at 40%) until all 4 photos uploaded, then active

**Step 3 — Selfie Verification**
- Back arrow + "Étape 3/3" + progress bar at 100%
- Title: "Vérification par selfie"
- Subtitle: "Nous comparons votre visage avec votre pièce d'identité"
- 24px gap
- Camera viewfinder area: large rounded rectangle (300x360px), `#2E1C2B` fill simulating camera feed. Oval face outline guide in `#4A1942` dashed line, centered. Below the oval: "Placez votre visage dans le cadre" — Poppins Medium 14px, `#EAEAEA` at 70%
- 32px gap
- Shutter button: centered circle (64px), `#4A1942` fill, white inner circle (52px), outer ring in `#EAEAEA` at 20%
- Tip below shutter: "Retirez vos lunettes et assurez un bon éclairage" — Poppins Regular 12px, `#EAEAEA` at 50%

**Step 4 — Pending Review**
- Title: "Vérification en cours" — Poppins Bold 22px, centered
- Refined illustration: document icon with a circular arrow or hourglass, rendered in `#4A1942` and `#EAEAEA`
- Subtitle: "Nous vérifions vos documents. Vous recevrez une notification dès que votre profil sera validé. Cela prend généralement moins de 24 heures." — Poppins Regular 15px, `#EAEAEA` at 70%, centered, max-width 300px
- 32px gap
- Status badge: pill shape, `#F39C12` at 15% background + `#F39C12` text: "En attente de vérification"
- 32px gap
- Primary button: "Retour à l'accueil"

---

### 6. HOME SCREEN (Accueil)

This is the core screen. Dark, premium, content-rich.

**Top section:**
- Status bar (system)
- 16px gap
- Row: Left — "Bonjour, Jean-Pierre" greeting (Poppins SemiBold 20px). Right — notification bell icon with optional red unread dot (8px)
- 16px gap
- Search bar: full-width rounded input (48px height, `#2E1C2B` fill, `#EAEAEA` at 10% border, 24px rounded). Left: magnifying glass icon. Placeholder: "Rechercher un véhicule, une agence..." in `#EAEAEA` at 40%. Right: sliders/filter icon
- 8px gap
- Quick date/location row: two pill chips side-by-side:
  - "Nice, France" with map-pin icon — tappable
  - "12 — 15 Juin" with calendar icon — tappable
  - Both: `#2E1C2B` fill, `#EAEAEA` at 10% border, `#EAEAEA` at 70% text, Poppins Medium 13px

**Section: "Agences populaires"**
- Section header row: Left — "Agences populaires" (Poppins SemiBold 18px). Right — "Voir tout" link in `#EAEAEA` at 60%, Poppins Medium 13px
- 12px gap
- Horizontal scrollable carousel of **agency cards** (card width: 220px, height: 160px):
  - Top 60%: agency cover photo (car showroom or fleet), rounded top corners
  - Bottom 40%: `#2E1C2B` fill
    - Agency logo (small, 32px circle) overlapping the photo/bottom boundary, left-aligned with 12px margin
    - To the right of logo: Agency name (Poppins SemiBold 14px) + city below (Poppins Regular 12px, `#EAEAEA` at 60%)
    - Right-aligned: star icon (`#F1C40F`) + rating number (e.g., "4.8") + review count in parentheses ("(124)") in `#EAEAEA` at 60%
  - Full card: 16px rounded, `#EAEAEA` at 8% border
  - Cards spaced 12px apart

**Section: "Véhicules recommandés"**
- Section header: "Véhicules recommandés" + "Voir tout" link
- 12px gap
- Horizontal scrollable carousel of **vehicle cards** (card width: 260px, height: 210px):
  - Top 65%: car photo (premium car, angled 3/4 view), rounded top corners
  - Bottom 35%: `#2E1C2B` fill with padding 12px
    - Car name: "Porsche 911 Carrera" — Poppins SemiBold 15px
    - Row below: Year "2024" + Transmission "Auto" + Fuel "Essence" — each as small text separated by dots, Poppins Regular 12px, `#EAEAEA` at 50%
    - Row below: Left — price "320 € / jour" in Poppins SemiBold 16px. Right — small agency badge (mini logo circle 20px + agency name in 11px)
  - Full card: 16px rounded, `#EAEAEA` at 8% border
  - Cards spaced 12px apart

**Section: "Catégories"**
- Section header: "Catégories"
- Horizontal scroll of category pills:
  - "Berline", "SUV", "Sportive", "Cabriolet", "Électrique", "Avec chauffeur"
  - Each pill: `#2E1C2B` fill, `#EAEAEA` at 10% border, Poppins Medium 13px, 36px height, 20px horizontal padding, 24px fully rounded
  - Selected pill: `#4A1942` fill, `#EAEAEA` text, no border

**Bottom Navigation Bar (5 tabs):**
- Bar background: `#2E1C2B` with top border `#EAEAEA` at 5%
- 5 tabs evenly spaced:
  1. Home icon + "Accueil" — **active state:** icon and text in `#EAEAEA`, small `#4A1942` dot indicator above icon (4px circle)
  2. Compass icon + "Explorer"
  3. Calendar icon + "Réservations"
  4. Gift/star icon + "Fidélité"
  5. User icon + "Profil"
- **Inactive tabs:** icon and text in `#EAEAEA` at 40%
- Tab label: Poppins Medium 10px
- Icon size: 24px
- Total bar height: 64px (plus safe area below)

---

### 7. SEARCH & FILTER SCREEN

**Search page (when search bar is tapped):**
- Background: `#050404`
- Large search input auto-focused at top (same style as home, but larger 52px height)
- 16px gap
- Section: "Recherches récentes" — list of 3–4 recent searches with clock icon + text + "X" remove icon. Poppins Regular 14px, `#EAEAEA` at 70%
- Section: "Catégories populaires" — grid of 6 category cards (2 columns, 3 rows): each card has a small car silhouette icon + category name, `#2E1C2B` fill, 12px rounded, 60px height

**Filter bottom sheet (slides up when filter icon tapped):**
- Handle bar at top center: 40x4px, `#EAEAEA` at 20%, 2px rounded
- Title: "Filtres" — Poppins Bold 20px, centered
- 20px gap
- **Catégorie:** horizontal scroll chips (Berline, SUV, Sportive, Cabriolet, Électrique, Utilitaire) — `#2E1C2B` default, `#4A1942` selected
- **Gamme de prix:** double-handle range slider (min 50 € — max 2000 € / jour). Track in `#EAEAEA` at 10%, filled range in `#4A1942`. Handle circles: 20px, `#EAEAEA` fill. Value labels above handles
- **Transmission:** two toggle chips — "Automatique" | "Manuelle" | "Toutes"
- **Carburant:** chips — "Essence" | "Diesel" | "Électrique" | "Hybride"
- **Places:** chips — "2" | "4" | "5" | "7+"
- **Options:** toggle switches (list items with label left, toggle right):
  - "Avec chauffeur disponible"
  - "Livraison à domicile"
  - Toggle: `#4A1942` when on, `#EAEAEA` at 15% when off
- **Note minimum:** row of 5 star icons, tappable to set minimum (e.g., tap 4th star = 4 stars minimum). Unselected stars in `#EAEAEA` at 20%, selected in `#F1C40F`
- 24px gap
- Two buttons at bottom:
  - "Réinitialiser" — ghost button, `#EAEAEA` at 60% text, left-aligned
  - "Afficher X résultats" — primary button, `#4A1942` fill, right-aligned
  - Both side-by-side in a row

---

### 8. LISTE DES AGENCES (Agency List)

- Back arrow + screen title "Agences" — Poppins Bold 20px
- 12px gap
- Filter chip row (horizontal scroll): "Toutes", "Nice", "Cannes", "Monaco", "Marseille", "Paris" — same pill styling as categories. "Toutes" selected by default
- Sort button: right-aligned, "Trier" text + chevron-down icon
- 16px gap
- **Vertical scrollable list of agency cards** (full-width minus 40px margins):
  - Each card height: ~180px, `#2E1C2B` fill, 16px rounded, `#EAEAEA` at 8% border
  - Top portion: agency cover photo (full-width of card, 100px height, rounded top)
  - Agency logo: 44px circle, overlapping photo/content boundary on the left (12px from left edge)
  - Right of logo:
    - Agency name: Poppins SemiBold 16px
    - City + vehicle count: "Nice — 28 véhicules" in Poppins Regular 13px, `#EAEAEA` at 60%
  - Far right: star icon `#F1C40F` + "4.8" + "(142 avis)" in `#EAEAEA` at 50%
  - Cards spaced 12px apart vertically

---

### 9. PAGE AGENCE (Agency Detail)

**Hero section:**
- Full-width hero banner photo (agency showroom or fleet lineup), 240px height
- Gradient overlay from `#050404` at 80% (bottom) to transparent (top)
- Agency logo (56px circle) positioned bottom-left of hero, overlapping into content below (offset -28px)
- Back arrow top-left (over hero image), share icon top-right — both in `#EAEAEA` with subtle shadow for legibility

**Content section (below hero):**
- Agency name: Poppins Bold 22px (left-aligned, accounting for logo space)
- Location row: map-pin icon + "42 Promenade des Anglais, Nice" — Poppins Regular 14px, `#EAEAEA` at 60%
- Rating row: star icon `#F1C40F` + "4.8" (Poppins SemiBold 16px) + "(142 avis)" `#EAEAEA` at 50% + "Agence vérifiée" badge (small pill: `#2ECC71` at 15% fill, `#2ECC71` text, check icon)
- 12px gap
- Description: 3 lines of French placeholder text about the agency, Poppins Regular 14px, `#EAEAEA` at 70%. "Lire la suite" link below
- 16px gap
- Mini-map card: rounded rectangle (full-width, 120px height) showing map with pin. `#2E1C2B` overlay on map for dark feel. "Voir sur la carte" text overlay centered

**Tab bar:**
- Two tabs: "Véhicules" | "Avis"
- Active tab: `#EAEAEA` text + `#4A1942` underline (3px). Inactive: `#EAEAEA` at 40%

**Véhicules tab content:**
- Vehicle count: "28 véhicules disponibles" — Poppins Medium 14px, `#EAEAEA` at 60%
- **Vertical grid of vehicle cards (2 columns):**
  - Each card: `#2E1C2B` fill, 16px rounded
  - Car photo top (square aspect, rounded top)
  - Below: car name (Poppins SemiBold 14px, 1 line truncated)
  - Spec chips row: "Auto" | "Essence" | "5 places" — tiny pills, `#EAEAEA` at 10% fill, Poppins Regular 10px
  - Price: "320 € / jour" — Poppins SemiBold 15px
  - Card padding: 10px bottom
  - Column gap: 12px, row gap: 12px

**Avis tab content:**
- Overall rating large display: "4.8" in Poppins Bold 40px + "/5" in Poppins Regular 20px, `#EAEAEA` at 50%. 5 star icons next to it. Below: "Basé sur 142 avis"
- Rating breakdown: horizontal bar chart (5 rows for 5 to 1 star). Each row: star count label + thin bar (`#4A1942` fill proportional to percentage) + percentage text
- 20px gap
- Individual review cards (stacked vertically):
  - Reviewer avatar (32px circle) + name + star rating (small, 5 icons) + date
  - Review text: 2–3 lines, Poppins Regular 14px, `#EAEAEA` at 70%
  - Optional agency response: indented card (`#2E1C2B` lighter shade), "Réponse de l'agence" label in Poppins Medium 12px + response text
  - Cards separated by thin divider (`#EAEAEA` at 5%)

---

### 10. FICHE VÉHICULE (Vehicle Detail)

**Image carousel:**
- Full-width swipeable car photo gallery, 300px height
- Photo counter badge top-right: "1/8" in small pill (`#050404` at 70% fill, `#EAEAEA` text)
- Back arrow top-left, share icon and heart/favorite icon top-right — all `#EAEAEA` with drop shadow
- Dot pagination below photos: active dot `#4A1942`, inactive `#EAEAEA` at 20%

**Content (scrollable below images):**

**Price & name section:**
- Car name: "Porsche 911 Carrera S" — Poppins Bold 22px
- Year: "2024" — Poppins Regular 15px, `#EAEAEA` at 60%
- Price: "320 € / jour" — Poppins Bold 24px, `#4A1942` tinted text (or `#EAEAEA` with `#4A1942` background pill)
- Agency badge row: small agency logo (24px circle) + "Prestige Auto Nice" + verified check — tappable, navigates to agency page

**Specifications grid:**
- 2-column grid of spec items, each in a small card (`#2E1C2B` fill, 12px rounded, 8px padding):
  - Icon (24px, `#EAEAEA` at 60%) + label below + value below
  - Specs: Transmission ("Automatique"), Carburant ("Essence"), Puissance ("450 ch"), Places ("4 places"), Portes ("2 portes"), Coffre ("132 L")
- Grid gap: 10px

**Équipements section:**
- Section title: "Équipements"
- Tag list (wrapping horizontal): "Climatisation", "GPS intégré", "Bluetooth", "Sièges cuir", "Caméra de recul", "Régulateur de vitesse", "Apple CarPlay", "Toit ouvrant"
- Each tag: `#2E1C2B` fill, `#EAEAEA` at 10% border, Poppins Regular 12px, pill shape, 8px vertical / 14px horizontal padding

**Description:**
- Section title: "Description"
- 3–4 lines of French placeholder text. "Lire la suite" expandable link

**Option Chauffeur:**
- Card: `#2E1C2B` fill, accent gradient left border (4px, `#4A1942`)
- Left: steering wheel icon
- Center: "Avec chauffeur privé" title + "+120 € / jour" subtitle
- Right: toggle switch
- Subtitle below: "Chauffeur professionnel bilingue français-anglais"

**Conditions section:**
- Title: "Conditions de location"
- List items with small icons:
  - "Age minimum : 25 ans"
  - "Permis de conduire valide depuis 3 ans"
  - "Caution : 5 000 €"
  - "Kilométrage : 300 km/jour inclus"
- Each: icon (`#EAEAEA` at 50%) + text (Poppins Regular 14px, `#EAEAEA` at 70%)

**Sticky bottom bar:**
- Background: `#2E1C2B` with top border `#EAEAEA` at 5%
- Left: price recap "320 € / jour" in Poppins SemiBold 16px
- Right: "Réserver" primary CTA button — `#4A1942` fill, `#EAEAEA` text, 48px height, 160px width, 12px rounded
- Bottom safe area padding

---

### 11. SÉLECTION DATES & OPTIONS (Booking Step 1)

- Back arrow + title "Réservation" + step indicator "1/3"
- Progress bar: 33% in `#4A1942`
- 20px gap

**Date selection:**
- Title: "Dates de location"
- Dark-themed calendar component (full month view):
  - Month/year header: "Juin 2025" with left/right arrows
  - Day-of-week headers: L, M, M, J, V, S, D — Poppins Medium 12px, `#EAEAEA` at 40%
  - Date cells: Poppins Regular 14px, `#EAEAEA`
  - Past dates: `#EAEAEA` at 20% (disabled)
  - Selected start date: circle fill `#4A1942`, `#EAEAEA` text
  - Selected end date: circle fill `#4A1942`
  - Range between: `#4A1942` at 20% background highlight connecting the two
  - Today: subtle outline ring in `#EAEAEA` at 30%
- Below calendar: "12 Juin — 15 Juin (3 jours)" summary text, Poppins SemiBold 14px

**Time selection:**
- Row: "Heure de prise en charge" + time picker showing "10:00"
- Row: "Heure de retour" + time picker showing "18:00"
- Time pickers: `#2E1C2B` fill, `#EAEAEA` at 10% border, tap opens time wheel

**Pickup method:**
- Title: "Mode de récupération"
- Two option cards side-by-side:
  - "En agence" — agency building icon + address below. `#2E1C2B` fill, when selected: `#4A1942` border
  - "Livraison à domicile" — truck icon + "+ 50 €" price tag below. Same styling
- Selected card: `#4A1942` border (2px) + subtle `#4A1942` glow

**Chauffeur option:**
- Card row: "Ajouter un chauffeur privé" + toggle + "+ 120 € / jour"

**Order summary card:**
- `#2E1C2B` fill, 16px rounded
- Mini car photo (48px rounded square) + car name
- Line items:
  - "Location (3 jours)" — "960 €"
  - "Livraison à domicile" — "50 €"
  - "Chauffeur (3 jours)" — "360 €"
  - Divider line
  - **"Total" — "1 370 €"** — Poppins SemiBold 18px

- Primary button at bottom: "Continuer vers le paiement"

---

### 12. PAIEMENT (Booking Step 2)

- Back arrow + "Paiement" + step indicator "2/3"
- Progress bar: 66%

**Payment methods section:**
- Title: "Moyen de paiement"
- Saved card displayed as a mini card UI:
  - `#2E1C2B` fill with subtle gradient, 16px rounded, 80px height
  - Card brand logo (Visa) top-right
  - Masked number: "**** **** **** 4242" — Poppins Regular 14px
  - Expiry: "09/27"
  - Selected indicator: `#4A1942` border + radio button filled
- "Ajouter une carte" option: dashed border card, "+" icon + text, same dimensions

**Order summary (recap):**
- Same summary card as previous screen (car photo + all line items + total)

**Security trust indicators:**
- Row of small icons with labels: lock icon "Paiement sécurisé" + shield icon "Protection garantie" — Poppins Regular 11px, `#EAEAEA` at 40%

**Primary button:** "Confirmer et payer — 1 370 €" — full-width, `#4A1942`, 52px height

---

### 13. CONFIRMATION DE RÉSERVATION (Booking Step 3)

- Step indicator: "3/3", progress bar 100%
- 40px gap from top
- Success icon: large circle (80px), `#2ECC71` at 15% fill, `#2ECC71` check icon centered (32px)
- 20px gap
- Title: "Réservation confirmée" — Poppins Bold 24px, centered
- Subtitle: "Votre véhicule est réservé. Vous recevrez un e-mail de confirmation." — Poppins Regular 15px, `#EAEAEA` at 60%, centered
- 24px gap
- Reference number: "Réf. #MF-2025-0847" — Poppins SemiBold 16px, centered, `#4A1942` tinted or contained in a pill

**Booking summary card:**
- `#2E1C2B` fill, 16px rounded, full-width
- Car photo (small, 64px, rounded) + car name + agency name
- Divider
- Detail rows (icon + label + value):
  - Calendar icon — "12 – 15 Juin 2025"
  - Clock icon — "10:00 – 18:00"
  - Map-pin icon — "Livraison : 14 Rue de France, Nice"
  - User icon — "Avec chauffeur"
  - Receipt icon — "Total : 1 370 €"

- 24px gap
- Primary button: "Suivre ma réservation"
- Ghost button below: "Retour à l'accueil" — `#EAEAEA` at 60% text

---

### 14. SUIVI EN TEMPS RÉEL (Real-time Tracking)

**Map section (top 50% of screen):**
- Dark-themed map (Mapbox dark style or similar) covering top half
- Vehicle marker: small car icon or pulsing dot in `#4A1942` on map
- Destination/pickup marker: pin icon in `#EAEAEA`
- Route line: `#4A1942` dashed or solid line between points
- Top-left overlay: back arrow in floating circle (`#2E1C2B` fill)

**Bottom card (bottom 50%, slides up):**
- Handle bar at top center
- **Status timeline (vertical stepper):**
  - Each step: circle indicator (16px) + label + timestamp
  1. Filled `#2ECC71` circle + check — "Réservation confirmée" — "12 Juin, 09:00"
  2. Filled `#2ECC71` circle + check — "Véhicule en préparation" — "12 Juin, 09:30"
  3. Filled pulsing `#4A1942` circle (current step) — "En route vers vous" — "Arrivée estimée : 10:15"
  4. Empty circle `#EAEAEA` at 20% — "Livré"
  - Vertical line connecting circles: `#EAEAEA` at 10% for pending, `#2ECC71` for completed

- **ETA display:** large text "15 min" — Poppins Bold 28px, centered below stepper
- **Driver/contact card:** `#2E1C2B` fill, 12px rounded
  - Left: driver photo (40px circle) or agency logo
  - Center: "Ahmed — Chauffeur privé" or "Prestige Auto Nice"
  - Right: phone icon button (circle, `#4A1942` fill) + message icon button (circle, `#2E1C2B` fill with border)

---

### 15. SIGNALEMENT DE DOMMAGES (Damage Report)

- Back arrow + title "Signaler un dommage"
- Subtitle: "Documentez tout dommage constaté sur le véhicule avant ou après votre location" — Poppins Regular 14px, `#EAEAEA` at 60%
- 20px gap

**Car diagram:**
- Top-down / schematic view of a car outline (simple line drawing in `#EAEAEA` at 40%)
- 6 tappable zones highlighted: "Avant", "Arrière", "Côté gauche", "Côté droit", "Toit", "Intérieur"
- Tapping a zone selects it (zone fills with `#4A1942` at 20%, border becomes `#4A1942`)
- Selected zone label appears below diagram

**Photo grid:**
- Title: "Photos du dommage"
- 2x3 grid of photo upload slots (6 total):
  - Empty slot: `#2E1C2B` fill, dashed border `#EAEAEA` at 15%, camera icon centered, 100x100px, 12px rounded
  - Filled slot: photo thumbnail with small "X" delete icon top-right
  - First slot labelled "Ajouter une photo"
- Minimum 1 photo required

**Description:**
- Title: "Description"
- Multiline text input: `#2E1C2B` fill, `#EAEAEA` at 10% border, 120px height, placeholder: "Décrivez le dommage constaté (emplacement, type, taille estimée...)"

**Primary button at bottom:** "Envoyer le signalement" — `#E74C3C` fill (red, since this is a damage/alert action), `#EAEAEA` text

---

### 16. PROGRAMME DE FIDÉLITÉ (Loyalty Program)

**Hero section:**
- Gradient card background (`#2E1C2B` → `#4A1942`), full-width, 200px, 16px rounded bottom
- Centered: "Programme MyFleet" — Poppins Bold 22px
- Below: large point balance "2 480 points" — Poppins Bold 36px
- Circular progress ring (120px diameter) around or near the points:
  - Track: `#EAEAEA` at 10%
  - Progress: `#4A1942` (e.g., 65% filled toward next tier)
  - Center of ring: current tier icon or label
- Below ring: "Prochain palier : Or — 3 000 points" — Poppins Regular 13px, `#EAEAEA` at 60%

**Tier cards (horizontal scroll):**
- 4 tier cards: Bronze, Argent, Or, Platine
- Each card: 140px wide, gradient fill matching tier color theme (all staying within the dark plum palette but with varying intensity):
  - Bronze: slightly lighter `#2E1C2B`
  - Argent: `#2E1C2B` with silver-toned border
  - Or: `#4A1942` gradient (highlighted)
  - Platine: deep `#4A1942` with subtle shimmer effect
- Current tier has a "Niveau actuel" badge label
- Each card: tier name + icon + "X points requis"
- 12px card gap

**Benefits section for current tier:**
- Title: "Vos avantages — Argent"
- List of benefits with check-circle icons in `#4A1942`:
  - "5% de réduction sur toutes les locations"
  - "Livraison gratuite"
  - "Accès prioritaire aux nouveautés"
  - "Support dédié"

**Points history:**
- Title: "Historique"
- List items:
  - "+320 points — Location Porsche 911 — 15 Juin"
  - "+80 points — Avis laissé — 16 Juin"
  - "-500 points — Réduction utilisée — 20 Juin"
  - Each row: icon (arrow-up-circle green for earned, arrow-down-circle red for spent) + description + date, Poppins Regular 13px
  - Dividers between rows

**CTA at bottom:** "Échanger mes points" — primary button, `#4A1942`

---

### 17. AVIS & NOTATION (Write a Review)

- Back arrow + title "Laisser un avis"
- 16px gap

**Rating context:**
- Car photo (small, 64px) + "Porsche 911 Carrera S" + "Prestige Auto Nice" + "12 – 15 Juin 2025"
- `#2E1C2B` card fill, 12px rounded

**Star rating:**
- Title: "Votre note"
- 5 large star icons (36px each, 8px gap), horizontally centered
- Unselected: `#EAEAEA` at 20% fill
- Selected: `#F1C40F` fill
- Label below stars reflecting selection: "Excellente" (5), "Très bien" (4), "Bien" (3), "Passable" (2), "Décevant" (1) — Poppins Medium 14px

**Text review:**
- Title: "Votre avis"
- Multiline text input: `#2E1C2B` fill, 140px height, placeholder: "Partagez votre expérience avec cette agence et ce véhicule..."
- Character count bottom-right: "0 / 500" in `#EAEAEA` at 40%

**Photo upload (optional):**
- Title: "Ajouter des photos (optionnel)"
- Horizontal scroll row of photo upload slots (4 max): same styling as damage report slots but horizontal

**Primary button at bottom:** "Publier l'avis"

---

### 18. MON PROFIL (My Profile)

**Profile header:**
- `#2E1C2B` background, 160px height, 16px rounded bottom
- Centered: profile photo (80px circle) with `#4A1942` border ring (3px). If verified: small `#2ECC71` check badge (20px circle) at bottom-right of avatar
- Name: "Jean-Pierre Dupont" — Poppins SemiBold 18px
- "Membre depuis Janvier 2024" — Poppins Regular 13px, `#EAEAEA` at 50%
- KYC status pill: "Vérifié" — `#2ECC71` at 15% fill, `#2ECC71` text, small check icon

**Settings sections (scrollable list):**

Each section is a card (`#2E1C2B` fill, 16px rounded) with list items inside. Items have: left icon (24px, `#EAEAEA` at 50%) + label (Poppins Regular 15px) + right chevron icon (`#EAEAEA` at 30%)

**Card 1: "Mon compte"**
- "Mes informations personnelles"
- "Adresse e-mail"
- "Numéro de téléphone"
- "Mot de passe"

**Card 2: "Paiement & Documents"**
- "Mes cartes bancaires"
- "Mes documents" (with status pill: "Vérifié" in green or "En attente" in orange)
- "Historique des transactions"

**Card 3: "Préférences"**
- "Notifications" (with toggle switch on the right instead of chevron)
- "Langue" (current: "Français" shown as secondary text)
- "Mode sombre" (toggle switch)

**Card 4: "Aide"**
- "Aide & Support"
- "Conditions générales"
- "Politique de confidentialité"

**Standalone items at bottom:**
- "Se déconnecter" — text button, `#E74C3C` at 80%, centered, Poppins Medium 15px
- "Supprimer mon compte" — text button, `#EAEAEA` at 30%, centered, Poppins Regular 13px
- 20px gap below

---

### 19. MES RÉSERVATIONS (My Bookings)

- Title: "Mes réservations" — Poppins Bold 22px
- 12px gap

**Tab bar:** 3 tabs — "En cours" | "À venir" | "Historique"
- Active tab: `#EAEAEA` text + `#4A1942` underline. Inactive: `#EAEAEA` at 40%

**Booking cards (vertically stacked):**
Each card: `#2E1C2B` fill, 16px rounded, full-width
- Left column (40%): car photo, rounded 12px, full height of card
- Right column (60%): padding 12px
  - Car name: Poppins SemiBold 15px
  - Agency name: Poppins Regular 12px, `#EAEAEA` at 60%
  - Date range: calendar icon + "12 – 15 Juin 2025" — Poppins Regular 13px
  - Status badge (pill):
    - "En cours" — `#4A1942` fill, `#EAEAEA` text
    - "Confirmée" — `#2ECC71` at 15% fill, `#2ECC71` text
    - "Terminée" — `#EAEAEA` at 10% fill, `#EAEAEA` at 50% text
    - "Annulée" — `#E74C3C` at 15% fill, `#E74C3C` text
  - Price: "1 370 €" — Poppins SemiBold 15px, bottom-right
- Cards spaced 12px apart
- Tapping a card navigates to booking detail (expanded view with full info + action buttons like "Signaler un dommage", "Contacter l'agence", "Annuler la réservation")

---

### 20. NOTIFICATIONS SCREEN

- Title: "Notifications" — Poppins Bold 22px
- 12px gap

**Notification items (vertically stacked):**
Each item: full-width, 72px height, `#2E1C2B` fill (unread) or `#050404` fill (read). Bottom border `#EAEAEA` at 5%
- Left: icon circle (36px), colored based on type:
  - Booking confirmed: calendar icon, `#2ECC71` at 15% fill
  - Payment received: receipt icon, `#4A1942` at 20% fill
  - Delivery update: truck icon, `#4A1942` at 20% fill
  - Loyalty: gift icon, `#F1C40F` at 15% fill
  - KYC: shield icon, `#F39C12` at 15% fill
  - Review reminder: star icon, `#EAEAEA` at 10% fill
- Center: notification text (Poppins Regular 14px, 2 lines max) + timestamp below (Poppins Regular 11px, `#EAEAEA` at 40%)
- Right: unread dot (8px, `#4A1942`) if unread

**Example notifications:**
- "Votre réservation #MF-2025-0847 est confirmée"
- "Votre véhicule est en route — arrivée estimée à 10:15"
- "Vous avez gagné 320 points de fidélité"
- "Votre identité a été vérifiée avec succès"
- "N'oubliez pas de laisser un avis pour votre dernière location"

---

### 21. EMPTY STATES

Design refined empty states for:

**No search results:**
- Subtle car silhouette illustration (line art, `#EAEAEA` at 20%)
- "Aucun résultat" — Poppins SemiBold 18px
- "Essayez avec d'autres critères ou explorez nos agences populaires" — Poppins Regular 14px, `#EAEAEA` at 50%
- "Explorer les agences" ghost button

**No bookings:**
- Minimalist calendar illustration
- "Aucune réservation" — Poppins SemiBold 18px
- "Explorez notre catalogue pour trouver le véhicule idéal" — Poppins Regular 14px, `#EAEAEA` at 50%
- "Parcourir les véhicules" primary button

**No notifications:**
- Bell illustration, `#EAEAEA` at 20%
- "Aucune notification"
- "Vos notifications apparaîtront ici"

**KYC required for booking:**
- Bottom sheet with shield icon
- "Vérification requise"
- "Pour effectuer une réservation, veuillez d'abord vérifier votre identité"
- "Vérifier mon identité" primary button + "Plus tard" ghost button

---

## Component Library (Design System Page)

Create a separate Figma page with all reusable components:

- **Buttons:** Primary (filled `#4A1942`), Secondary (outlined `#EAEAEA` at 15% border), Ghost (`#EAEAEA` at 60% text only), Destructive (`#E74C3C` fill), Disabled (`#4A1942` at 30% fill + `#EAEAEA` at 30% text) — all 52px height, 12px rounded, Poppins SemiBold 15px
- **Input fields:** Default (`#2E1C2B` fill, `#EAEAEA` at 10% border), Focused (`#4A1942` border), Error (`#E74C3C` border + error message below in `#E74C3C`), Disabled (`#2E1C2B` at 50% fill) — all 48px height, 12px rounded, left icon optional
- **Cards:** Agency card (horizontal and vertical variants), Vehicle card (carousel and grid variants), Booking card, Review card — all `#2E1C2B` fill, 16px rounded, `#EAEAEA` at 8% border
- **Chips / Pills:** Category pill (default `#2E1C2B`, selected `#4A1942`), Status pill (5 color variants: confirmed/green, pending/orange, active/purple, completed/gray, cancelled/red), Spec chip (small, `#EAEAEA` at 10% fill)
- **Navigation bar:** All 5 tabs in active and inactive states
- **Tab bars:** 2-tab and 3-tab variants with underline active indicator
- **Star rating:** 1–5 states, selectable and display-only variants
- **Toggle switches:** On (`#4A1942` track) and Off (`#EAEAEA` at 15% track) states
- **Stepper / Timeline:** Vertical stepper with completed, active, and pending step variants
- **Bottom sheet:** Template with handle, title, scrollable content area
- **OTP input:** 6-box variant in default, focused, filled, and error states
- **Upload zones:** Empty (dashed border), filled (thumbnail + delete), and error states
- **Avatar:** 32px, 44px, 56px, 80px sizes with optional verified badge overlay
- **Toast / Snackbar:** Success, Error, Info variants — `#2E1C2B` fill, left color accent bar, text + dismiss icon
- **Calendar date cells:** Available, selected-start, selected-end, range, disabled, today states
- **Map card:** Dark-themed map placeholder component

---

## User Flows (Figma Page)

Connect screens with labeled arrows showing the following journeys:

**Flow 1: Onboarding**
Splash → Onboarding Slides → Inscription/Connexion → OTP → KYC Introduction → Document Upload → Selfie → Pending → Home

**Flow 2: Browse & Book**
Home → Search/Filter → Agency List → Agency Detail → Vehicle Detail → Date & Options → Payment → Confirmation

**Flow 3: Active Rental**
Confirmation → My Bookings ("En cours") → Real-time Tracking → Damage Report (if needed)

**Flow 4: Post-Rental**
My Bookings ("Historique") → Write Review → Loyalty Program (points earned)

**Flow 5: Profile Management**
Profile → Edit Info / Documents / Cards / Settings

---

## Figma File Structure

Organize the file into these pages:

1. **Cover** — Project title "MyFleet", color palette swatches, typography specimens, design principles summary
2. **Design System** — Full component library (see section above)
3. **All Screens** — Every screen listed above (21 screens total), named and ordered logically
4. **User Flows** — Screens connected with labeled arrows per the flows above
5. **States & Variants** — Loading states, error states, empty states, toast notifications grouped on a single page

---

## Additional Design Notes

- All text is in **French** — use realistic French placeholder content
- Use French city names from the Côte d'Azur and beyond: Nice, Cannes, Monaco, Antibes, Menton, Saint-Tropez, Marseille, Paris
- Car models should reference real luxury brands: Porsche 911, Mercedes-AMG GT, BMW M4, Audi RS6, Range Rover Velar, Tesla Model S, Bentley Continental, Lamborghini Huracán
- Agency names: "Prestige Auto Nice", "Riviera Luxury Cars", "Monaco Premium Fleet", "Côte d'Azur Motors"
- Profile placeholder names: Jean-Pierre Dupont, Sophie Martin, Ahmed Benali
- The user has their own **logo ready** — leave a clearly marked placeholder for logo insertion on splash screen and navigation bar
- Design for **cross-platform** (iOS-first 390x844 reference with notes on adaptation)
- Respect system safe areas (status bar, notch, home indicator)
- All interactive elements must have minimum 44px touch targets
- Annotate implied micro-interactions: card press scale-down (0.97), button press opacity change, bottom sheet slide-up animation, horizontal carousel snap behavior, pulsing dot on tracking map
- **No emojis** — ever — in any screen, label, badge, or placeholder content
