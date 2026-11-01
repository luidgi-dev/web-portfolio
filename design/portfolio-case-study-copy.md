# Portfolio case study: final copy (LUI-180)

Approved on 2026-11-01. EN and FR are written separately; this is the source for `content/projects.json` (`portfolio` entry) and the new `CaseStudy` keys in `messages/*.json`.

Facts used, checked on 2026-11-01: first commit 2026-07-04, 18 merged PRs, 69 tests in 12 files, CI runs lint, typecheck and tests, 10 copy patterns in the LUI-178 audit table (`docs/TIL.md`).

---

## 01 · Overview

**problem**
- EN: I wanted a portfolio I had designed and built myself, down to the error pages.
- FR : Je voulais un portfolio dessiné et codé par moi, jusqu'aux pages d'erreur.

**lead**
- EN: It started with a search for inspiration and four moodboards, before it became a website.
- FR : Tout a commencé par une recherche d'inspiration et quatre moodboards, avant de devenir un site web.

**paragraphs**
1. EN: I wanted one place that shows both sides of my work, the design and the code. It is written for recruiters and clients who have a few minutes: the projects, how I work, and a way to reach me.
   FR : Je voulais un seul endroit qui montre les deux côtés de mon travail, le design et le code. Il s'adresse aux recruteurs et aux clients qui ont quelques minutes : les projets, ma façon de travailler, et un moyen de me contacter.
2. EN: Every visual decision is made in a design folder first: moodboards, references, then HTML mockups to compare directions. A component only gets built once its direction is settled.
   FR : Chaque décision visuelle se prend d'abord dans un dossier design : moodboards, références, puis maquettes HTML pour comparer les pistes. Un composant n'est codé qu'une fois sa direction arrêtée.

**pillars.heading**: EN How it is built · FR Comment il est construit

**pillars.items**
1. EN Design first: Moodboards and HTML mockups come before any component, so directions are compared side by side.
   FR Le design d'abord : Moodboards et maquettes HTML passent avant les composants, pour comparer les pistes côte à côte.
2. EN Four ambiances: The same components run in four color themes. Each theme is a set of CSS variables on the page.
   FR Quatre ambiances : Les mêmes composants tournent dans quatre thèmes de couleurs. Chaque thème est un jeu de variables CSS sur la page.
3. EN Typed content: Case studies live in one JSON file in English and French. TypeScript checks its shape, and tests check both languages match.
   FR Un contenu typé : Les études de cas tiennent dans un fichier JSON, en anglais et en français. TypeScript vérifie sa structure, et les tests vérifient que les deux langues correspondent.

**facts**
- role: EN Solo: design, code, and copy in English and French · FR Seul : design, code, et textes en anglais et en français
- timeline: EN Since July 2026, updated as I go · FR Depuis juillet 2026, mis à jour au fil de l'eau
- platform: EN Website, English and French, four ambiances · FR Site web, anglais et français, quatre ambiances
- status: EN Live, open source · FR En ligne, code ouvert

**codeCta**: EN View the code · FR Voir le code

---

## 02 · Design

**references.heading**: EN The references · FR Les références

**references.body**
- EN: The direction comes from mid-century interiors: teak and walnut furniture, brass, glazed tiles, Bauhaus posters, and warm afternoon light.
- FR : La direction vient des intérieurs mid-century : meubles en teck et en noyer, laiton, carrelage émaillé, affiches Bauhaus et lumière chaude d'après-midi.

**ambiances.heading**: EN Four ambiances · FR Quatre ambiances

**ambiances.body**
- EN: Two light themes and two dark ones, each taken from a real interior. You can switch from the home page; the swatches below show all four at once.
- FR : Deux thèmes clairs et deux sombres, chacun tiré d'un vrai intérieur. On passe de l'un à l'autre depuis la page d'accueil ; les nuanciers ci-dessous les montrent tous les quatre.

**ambiances[] captions**
- 01 Plâtre Blanc: EN Whitewashed walls, linen, sage green · FR Murs chaulés, lin, vert sauge
- 02 Sable Terracotta: EN Sand plaster and terracotta · FR Enduit sable et terre cuite
- 03 Chocolat Ambré: EN Walnut, brass and an amber lamp · FR Noyer, laiton et lampe ambrée
- 04 Oxblood Nuit: EN Oxblood tiles and aged brass · FR Carrelage sang-de-bœuf et laiton patiné

**pairs.heading**: EN From reference to component · FR De la référence au composant

**pairs.body**
- EN: Each photo sits next to the component it led to, running live in the ambiance you picked.
- FR : Chaque photo est posée à côté du composant qui en est sorti, affiché en direct dans l'ambiance choisie.

**pairs[] captions**
1. Sunlight. EN: The hero card keeps the light of a perforated concrete wall and leaves the wall out. FR : La carte d'accueil garde la lumière d'un mur de claustras, sans le mur.
2. Bauhaus. EN: The 404 page is drawn as a printed poster, with the shapes of the 1923 Bauhaus exhibition. FR : La page 404 est dessinée comme une affiche imprimée, avec les formes de l'exposition Bauhaus de 1923.
3. Tiles. EN: The contact links are laid out like a tiled wall. FR : Les liens de contact sont posés comme un mur carrelé.
4. Wood. EN: The teak surfaces on the site are CSS gradients that follow the grain of a real plank. FR : Les surfaces en teck du site sont des dégradés CSS qui suivent le fil d'une vraie planche.
5. Paint chips. EN: The numbers in the case studies sit on paint chips, like a sample card from a hardware store. FR : Les chiffres des études de cas sont posés sur des échantillons de peinture, comme un nuancier de quincaillerie.

**dropped.heading**: EN Directions I dropped · FR Les pistes abandonnées

**dropped.body**
- EN: I compared three directions for the project window in an HTML mockup: a Nelson sideboard, a Case Study House and a brass pill mirror. I dropped the mirror because its arched top looked like a mistake to anyone who didn't know it.
- FR : J'ai comparé trois pistes pour la fenêtre des projets dans une maquette HTML : un buffet Nelson, une Case Study House et un miroir pilule en laiton. J'ai abandonné le miroir, car son arche passait pour une erreur auprès de ceux qui ne le connaissaient pas.

**Photo credits**: EN "Photo: {name}, Pexels" · FR « Photo : {name}, Pexels ». Poster: EN "Joost Schmidt, 1923, public domain" · FR « Joost Schmidt, 1923, domaine public ».

---

## 03 · Engineering

**intro**
- EN: A Next.js 16 app with the App Router, Server Components by default, deployed on Vercel from GitHub.
- FR : Une app Next.js 16 avec l'App Router, des Server Components par défaut, déployée sur Vercel depuis GitHub.

**numbers** (value · label · note)
- 4 · EN ambiances · two light, two dark / FR ambiances · deux claires, deux sombres
- 2 · EN languages · English and French / FR langues · anglais et français
- 69 · EN tests · Vitest, run on every pull request / FR tests · Vitest, lancés à chaque pull request
- 18 · EN merged pull requests · since July 2026 / FR pull requests fusionnées · depuis juillet 2026

**stack**
- Framework / Framework: Next.js 16, React 19, TypeScript
- Styling / Style: Tailwind CSS 4, shadcn/ui, CSS variables
- Content / Contenu: next-intl, JSON
- Quality / Qualité: Vitest, ESLint, Prettier, Husky
- Delivery / Livraison: GitHub Actions, Vercel

**pipeline.heading**: EN From moodboard to production · FR Du moodboard à la production

**pipeline.steps**
1. EN Design folder: moodboards and references · FR Dossier design : moodboards et références
2. EN HTML mockup: directions side by side, real tokens · FR Maquette HTML : pistes côte à côte, vrais tokens
3. EN Component: built once the direction is settled · FR Composant : codé une fois la piste choisie
4. EN CI and deploy: lint, typecheck, tests, then Vercel · FR CI et déploiement : lint, typecheck, tests, puis Vercel

**decisions**
1. EN Themes are a class on the page: Each ambiance is a class on `<html>` that sets CSS variables, so components never know which theme is active.
   FR Les thèmes sont une classe sur la page : Chaque ambiance est une classe sur `<html>` qui définit des variables CSS : les composants ne savent jamais quel thème est actif.
2. EN Content checked by TypeScript: The case studies are JSON, typed so that a missing field or a wrong shape fails the build.
   FR Un contenu vérifié par TypeScript : Les études de cas sont en JSON, typé pour qu'un champ manquant ou une mauvaise structure fasse échouer le build.
3. EN Copy rules as a test: A test reads every string in both languages and fails on long dashes, placeholders and buzzwords.
   FR Les règles d'écriture en test : Un test lit chaque texte dans les deux langues et échoue sur les tirets longs, les textes provisoires et les mots creux.

---

## 04 · Build log

**stats**
- 10 · EN copy patterns removed · listed in the October 2026 audit / FR tics d'écriture retirés · relevés lors de l'audit d'octobre 2026
- 4 · EN moodboards · one per ambiance / FR moodboards · un par ambiance
- 3 · EN modal directions compared · one kept / FR pistes de modale comparées · une retenue

**story.heading**: EN The audit · FR L'audit

**story.paragraphs**
1. EN: In October 2026 I reviewed the site with fresh eyes, and it still looked generated in one click. It had no purple, no emoji and no long dashes, yet the rhythm of the copy and the decorations gave it away.
   FR : En octobre 2026, j'ai relu le site avec un œil neuf, et il avait toujours l'air généré en un clic. Pas de violet, pas d'emoji, pas de tirets longs, et pourtant le rythme des textes et les décors le trahissaient.
2. EN: I listed ten patterns, from a single stressed word in italics to slogan headings with a full stop, and rewrote each string. Decorations had to come from a real object in the references, so the generic circles were removed.
   FR : J'ai relevé dix tournures, du mot isolé en italique au titre-slogan avec un point final, puis réécrit chaque texte. Les décors devaient venir d'un vrai objet des références : les cercles génériques ont disparu.
3. EN: Each pattern went into the project rules with a before and after, and the ones a machine can catch went into a test.
   FR : Chaque tournure est entrée dans les règles du projet avec un avant et un après, et celles qu'une machine peut détecter sont entrées dans un test.

**story.before / story.after**
- before: EN The first moodboard, with its hero line · FR Le premier moodboard et sa phrase d'accroche
- after: EN The hero today · FR L'accueil aujourd'hui

**story.quote**
- EN: My rules covered words, and the problem was in the rhythm.
- FR : Mes règles portaient sur les mots, et le problème venait du rythme.

**results**
- EN: Live in English and French · Four ambiances · Custom error pages · The Strive case study · This case study
- FR : En ligne en anglais et en français · Quatre ambiances · Pages d'erreur sur mesure · L'étude de cas Strive · Cette étude de cas

**lessons**
1. EN A reference must read without its caption: If it needs the backstory, rework it or drop it.
   FR Une référence doit se lire sans sa légende : Si elle a besoin de son histoire, on la retravaille ou on la retire.
2. EN Compare in HTML first: Directions side by side with the real tokens, before touching components.
   FR Comparer en HTML d'abord : Les pistes côte à côte avec les vrais tokens, avant de toucher aux composants.
3. EN Name the patterns: A banned-word list misses rhythm and structure, so each pattern gets an example.
   FR Nommer les tournures : Une liste de mots interdits rate le rythme et la structure, alors chaque tournure a son exemple.
4. EN Decoration comes from a real material: Each ornament on the site points to a photo in the references.
   FR Le décor vient d'une vraie matière : Chaque ornement du site renvoie à une photo des références.
