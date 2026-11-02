# Professional work: copy draft (LUI-152)

Approved on 2026-11-02, to be reread on the page. EN and FR are written separately; once approved, this becomes the source for the professional work modal (LUI-153).

Confidentiality rules: the employer stays unnamed ("a high-end saddle maker"); the ERP stays "the ERP"; no money figures (order value, savings, payment link amounts); no screenshots, only generic diagrams drawn from scratch. The card figures are kept: they are global volumes, not money.

Facts used, from Luidgi on 2026-11-02: permanent contract since July 2024, hired as a no-code maker; about 5 developers, each with preferred internal clients; ~30% of the time spent on monitoring; rebuild in use from Q1 2027. Card figures: 1,100+ orders in progress, ~1,500 messages a month, ~450 follow-ups closed a month in the tracking app, 4 brands on 2 sites (EU and US).

---

## 01 · Overview

**problem**
- EN: Shipment tracking, customer reminders, payment links: much of it ran on spreadsheets and manual sending.
- FR : Suivi des expéditions, relances clients, liens de paiement : beaucoup de choses passaient par des tableurs et des envois à la main.

**lead**
- EN: I was hired as a no-code maker to build internal apps in AppSheet. Today I mostly write code: Python jobs, and a Next.js app on the way.
- FR : J'ai été recruté comme maker no-code pour faire des apps internes sur AppSheet. Aujourd'hui j'écris surtout du code : des jobs Python, et une app Next.js en cours.

**paragraphs**
1. EN: We are about five developers, each working with a few teams. Mine are customer service and logistics, and production at times. I gather their needs, build the tools, train users on new versions, and keep everything running.
   FR : On est environ cinq développeurs, chacun avec quelques équipes. Les miennes : le service client, la logistique, et parfois la production. Je recueille leurs besoins, je construis les outils, je forme les utilisateurs aux nouvelles versions et je m'assure que tout tourne.

**facts**
- role: EN Developer in a team of about five · FR Développeur dans une équipe d'environ cinq
- timeline: EN Since July 2024 · FR Depuis juillet 2024
- teams: EN Customer service, logistics, production · FR Service client, logistique, production
- stack: EN Python, BigQuery, AppSheet, Google Cloud, Next.js, Supabase · FR Python, BigQuery, AppSheet, Google Cloud, Next.js, Supabase

---

## 02 · Projects

Same shape for each project: problem, what I built, result.

### Shipment tracking app

- **problem**
  - EN: Each saddle was tracked in a spreadsheet, where it was hard to see where an order stood or who had changed what.
  - FR : Chaque selle était suivie dans un tableur, où l'on voyait mal où en était une commande et qui avait modifié quoi.
- **built**
  - EN: An AppSheet app on a BigQuery base fed by the ERP. Customer service follows each saddle from the workshop to shipping, and collects the balance and the address along the way.
  - FR : Une app AppSheet sur une base BigQuery alimentée par l'ERP. Le service client suit chaque selle de l'atelier à l'expédition, et récupère au passage le solde et l'adresse.
- **result**
  - EN: 1,100+ orders in progress in one place, ~450 follow-ups closed a month.
  - FR : Plus de 1 100 commandes en cours au même endroit, environ 450 relances traitées par mois.

### Customer messages and payment links

- **problem**
  - EN: Emails went out half by hand from the ERP, text messages fully by hand.
  - FR : Les emails partaient à moitié à la main depuis l'ERP, les SMS entièrement à la main.
- **built**
  - EN: Python jobs on Cloud Run send the email or text at each step of the order, with a payment link (Stripe, Alma, Nuvei).
  - FR : Des jobs Python sur Cloud Run envoient le mail ou le SMS à chaque étape de la commande, avec un lien de paiement (Stripe, Alma, Nuvei).
- **result**
  - EN: ~1,500 messages a month, none sent by hand.
  - FR : Environ 1 500 messages par mois, aucun envoyé à la main.

### Rebuild in Next.js and Supabase

- **problem**
  - EN: AppSheet was quick to start with, but as usage grows it gets expensive and slow, and hard to tailor.
  - FR : AppSheet a permis de démarrer vite, mais avec l'usage il devient cher, lent, et difficile à adapter.
- **built**
  - EN: I am moving shipment tracking into a larger internal app, in Next.js and Supabase, shared with production and logistics.
  - FR : Je migre le suivi des expéditions dans une app interne plus large, en Next.js et Supabase, partagée avec la production et la logistique.
- **result**
  - EN: It goes live in the first quarter of 2027. The app will be faster and cheaper to run, and its data will be shared with production.
  - FR : Elle sera en service au premier trimestre 2027, plus rapide et moins chère à faire tourner, avec des données communes à la production.

**diagrams** (drawn in LUI-153, generic, no internal names)
1. Shipment tracking: ERP → BigQuery → tracking app → the team updates status, balance, address.
2. Customer messages: order step → Python job on Cloud Run → email or text message → payment link.

---

## 03 · Method

**planning.heading**: EN How we plan · FR Comment on planifie

**planning.body**
- EN: Every quarter, the dev team ranks each department's requests and plans the next three months. Requests that come in between are shared out to balance the load. We track it all in Linear and work in sprints.
- FR : Chaque trimestre, l'équipe dev classe les demandes de chaque service et planifie les trois mois suivants. Celles qui arrivent entre-temps sont réparties pour équilibrer la charge. On suit tout dans Linear et on travaille en sprints.

**delivery.heading**: EN How I ship · FR Comment je livre

**delivery.body**
- EN: I write tests, run them in CI, and deploy each job on Cloud Run as a Docker image. About a third of my time is monitoring: an order that did not get its email, a job that stopped. Claude Code agents check that my jobs ran and alert me when a sensitive one fails. Most bugs are fixed the same day.
- FR : J'écris des tests, je les fais tourner en CI, et je déploie chaque job sur Cloud Run en image Docker. Environ un tiers de mon temps, c'est du monitoring : une commande qui n'a pas reçu son mail, un job qui s'est arrêté. Des agents Claude Code vérifient que mes jobs ont tourné et m'alertent quand un job sensible plante. La plupart des bugs sont corrigés dans la journée.

**incident** (TODO, see open question 1)

**choices.heading**: EN Why these tools · FR Pourquoi ces outils

**choices.items**
1. EN AppSheet: Low-code and part of Google Workspace, quick to get a first app out. Its limits led to the rebuild.
   FR AppSheet : Low-code et intégré à Google Workspace, rapide pour sortir une première app. Ses limites ont mené à la refonte.
2. EN BigQuery: Made for large volumes and reporting, in the same Google stack as AppSheet.
   FR BigQuery : Fait pour les gros volumes et le reporting, dans le même écosystème Google qu'AppSheet.
3. EN Supabase: Faster for the reads and writes of a live app, and it pairs well with Next.js.
   FR Supabase : Plus rapide pour les lectures et écritures d'une app au quotidien, et il s'associe bien à Next.js.

---

## 04 · Takeaways

**learned.heading**: EN What I learned · FR Ce que j'ai appris

**learned.body**
- EN: I come from a general engineering school (ESTIA), with some Python and Java. Here I learned the job end to end: the need, the spec, the code, tests, CI, deployment, maintenance.
- FR : Je viens d'une école d'ingénieur généraliste (ESTIA), avec des bases en Python et Java. Ici, j'ai appris le métier de bout en bout : le besoin, la spec, le code, les tests, la CI, le déploiement, la maintenance.

**today.heading**: EN What I would do today · FR Ce que je ferais aujourd'hui

**today.body**
- EN: I would start with code. With AI tools like Claude Code, custom code is quick to write and goes further on specific needs, which is why we are rebuilding.
- FR : Je partirais directement sur du code. Avec des outils d'IA comme Claude Code, le sur-mesure est rapide à écrire et va plus loin sur les besoins spécifiques, et c'est pour ça qu'on refait l'app.

---

## Open questions

1. Incident for the Method tab: an ERP sync failure (Luidgi writes it later). Shape: detection, cause in one line, immediate fix, guard added afterwards; impact kept qualitative.

Settled: card title kept as is; rebuild in use from Q1 2027; jobs run on Cloud Run Jobs (Docker images), card copy updated; the ~450 follow-ups come from the tracking app; the ERP stays unnamed.
