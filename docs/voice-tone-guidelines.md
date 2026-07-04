# Voice & Tone Guidelines — web-portfolio

Reference document for all copy (UI strings, case study content, about/contact sections).
Applies to both locales (FR/EN). Write copy to match this direction before wiring it into components.

---

## 1. Voice & Tone

**In three words:** confident, direct, uncluttered.

The portfolio speaks like a capable engineer explaining their work to a peer or a recruiter — not like a SaaS landing page, and not like a diary. Confidence comes from clarity and specificity, not from adjectives or self-promotion.

### Person / point of view

| Context | Voice |
|---|---|
| UI strings (nav, buttons, labels, form fields) | Neutral, no "I" — task-focused (`View project`, `Send message`) |
| Long-form content (case study narrative, about section) | First person, "I" (`I built…`, `I chose…`) |

### Do

- Use active verbs and the present tense (`I design`, not `Design was done by me`).
- Be specific: name the actual tech, the actual constraint, the actual result. Specificity reads as confidence.
- Keep sentences short. One idea per sentence.
- Let the work speak — describe decisions and trade-offs plainly rather than adding adjectives around them.
- Address the reader directly with "you" in contact/intro moments (`Let's talk about your project`).

### Don't

- Don't use startup buzzwords: *disrupt, leverage, synergy, seamless, cutting-edge, game-changing*.
- Don't inflate with adjectives (*amazing, incredible, passionate about pixels*). Let specifics carry the weight.
- Don't over-explain in short UI copy — a button label is not the place for a mini pitch.
- Don't be falsely modest (*"just a small project"*) or falsely grand (*"revolutionary portfolio"*).
- Don't switch to a jokey/casual register — light personality is fine in the case study narrative, not in the UI.

---

## 2. Recurring Microcopy

### Navigation

| Key | EN | FR |
|---|---|---|
| `nav.home` | Home | Accueil |
| `nav.work` | Work | Projets |
| `nav.about` | About | À propos |
| `nav.contact` | Contact | Contact |

### CTAs (buttons / links)

| Key | EN | FR |
|---|---|---|
| `cta.viewCaseStudy` | See how it works | Voir comment ça fonctionne |
| `cta.viewProject` | View project | Voir le projet |
| `cta.contact` | Let's talk | Parlons-en |
| `cta.sendMessage` | Send message | Envoyer |
| `cta.viewSource` | View source | Voir le code |
| `cta.downloadCv` | Download CV | Télécharger le CV |
| `cta.backHome` | Back home | Retour à l'accueil |

### Section titles

| Key | EN | FR |
|---|---|---|
| `section.flagship` | Flagship project | Projet phare |
| `section.work` | Selected work | Projets sélectionnés |
| `section.about` | About | À propos |
| `section.stack` | Stack | Stack technique |
| `section.contact` | Get in touch | Me contacter |

### Empty / edge states

| Key | EN | FR |
|---|---|---|
| `state.loading` | Loading… | Chargement… |
| `state.formSuccess` | Message sent, I'll get back to you soon. | Message envoyé, je reviens vers vous rapidement. |
| `state.formError` | Something went wrong. Try again, or email me directly. | Une erreur s'est produite. Réessayez, ou écrivez-moi directement. |
| `state.notFound` | This page doesn't exist. | Cette page n'existe pas. |
| `state.emptyWork` | More projects coming soon. | D'autres projets arrivent bientôt. |

---

## 3. Quick self-check before adding new copy

- [ ] Would this sentence survive being read out loud to a recruiter without sounding like a pitch?
- [ ] Is there a shorter way to say this?
- [ ] Is "I" used only in long-form content, not in UI strings?
- [ ] Any banned buzzword slipped in? (see Don't list above)