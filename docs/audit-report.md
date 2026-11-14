# Audit: Rickson's final copy vs. the site

## STATUS AFTER IMPLEMENTATION (2026-11-14)

All items are implemented and committed locally. Alex pushes.

### Done, matches docs/copy-final.md

| Page | Items | Commit |
|---|---|---|
| Meta, OG, Twitter, JSON-LD | S11, T5, I9, K13, R10, F8, Y11, O2, RM10, D9, KT5 | d92d848 |
| Startsidan | S2, S6, S8, S9, S10 | 0264f62 |
| Startsidan | S3, S4 (hero line and button) | 69dce69 |
| Startsidan | S1, S5, S7 (h1 = first sentence; motto in the Differencismen block; `section.motto` removed) | 233b3f3 |
| Tjänster | T2, T3, T4 | 222dd16 |
| Individuell vägledning | I1, I2, I3, I6, I7, I8 | 9e072eb |
| Individuell vägledning | I4, I5 (datorbild moved; `.ind-phrase` removed) | 2bf8728 |
| Klubb | K1–K7, K9–K12 | 5f72dac |
| Klubb | K8 | d521e46 |
| Representant | R1–R4, R7–R9 | 1b85e9a |
| Representant | R5, R6 (closing keeps only the three links) | a407364 |
| Filosofin | F1–F4, F6, F7 | 61a66c7 |
| Filosofin | F5, plus the redirect now goes to `/differencismen` | 87d0ecb |
| Systemet | Y1–Y6, Y8–Y10 | 9ba4441 |
| Systemet | Y7 | c284497 |
| Om oss | O1 | 41aafad |
| Rickson | RM1–RM3, RM5–RM9 | f1471b0 |
| Difference Consulting | D1, D2, D5, D6, D7, D8 | d223da5 |
| Difference Consulting | D3, D4 | 868c6c3 |
| Kvitton | KV1–KV11 (9 cards, 6 visible and 3 behind "Visa fler", ”…” added, Individ) | c692f72 |
| Kontakt | KT1, KT3 (lowercase `rickson@` everywhere, including JSON-LD and integritetspolicy) | 3e4bf71 |

### Deliberate deviations from the document (decided by Alex)

- **T1:** the eyebrow stays "Tjänster", without a full stop (U3).
- **RM4:** "fram – filosofin" uses a spaced en dash, not the document's em dash (U8).
- **D4 and D5:** the labels stay "Varför vi finns" and "Vår vision", without full stops (U9). "Det vi bygger." did get its full stop.
- **KT2:** the WhatsApp button keeps ↗︎.
- **KT4:** the footer wordmark counts as the "Difference Consulting" line (U13).

### Final check (text only)

- **Banned terms.** Searched for "Klient", "beteende" (excluding kognitiv beteendeterapi), "From understanding", "individuell process", "agerande", "Grundlagarna", "Rickson@" and "—". Visible text, meta, JSON-LD and alt text on all 13 pages gave 0 hits.
- **Links.** Every link was checked against the table in section 14 and goes to the right place. Missing links before: 0.
- **Horizontal scroll.** None at 320, 390 or 1440 px on any of the 13 pages.
- **Copy lines.** Each line of the document was searched for on its page. Every line is present except the deliberate deviations above.

### Open suggestions, not implemented (waiting for Alex)

- **Klubb backgrounds.** The hero and the rows section are both light, and the rows have no heading since K2. Suggestion: rows beige, "Ett eget utrymme" light.
- **Systemet backgrounds.** "Följ det du gör." and "Riktningen väljs…" are both light. Suggestion: "Riktningen väljs…" beige.
- **Difference Consulting card.** At 320 px the text starts 16 % from the top of the image, above the dark gradient. Suggestion: the stronger gradient used on the start-page services photo.

### Leftovers, untouched by rule

- **Outdated comments:** "de fyra sista" in kvitton.html and in the CSS, and section comments on Individ and Klubb.
- **Dead CSS:** `.dz-law` was already unused before this work.

- **Date:** 2026-11-14
- **Code state:** commit `d8ad3bb`, clean working tree.
- **Source:** Rickson's final copy handoff, pasted in chat. There is no `docs/copy-final.md` file; this report quotes the pasted text.

**Method**
- Parsed the HTML of all 13 pages: main content, the menu in each header, the footer, `<head>` meta, OG, Twitter and JSON-LD.
- Read the CSS rules for `text-transform`, `display:none` and quote marks.
- Searched every `.html` file plus `js/main.js`, `vercel.json` and `sitemap.xml` for the terms the document says to remove.
- No screenshots were taken.

**Conventions used when reading the document**
- **Headings.** Short standalone lines ending in a full stop are read as headings, at the positions where the page already has headings. This is an assumption and is listed again in section 4.
- **Arrows.** Lines ending in "→" are read as links or buttons. Arrow glyphs are not compared as text, except where noted.
- **Visual capitals.** `.cta`, `.eyebrow` and `.statement-caps` use `text-transform: uppercase` (css/main.css:311, :1703). Source text such as "Se Kvitton" therefore renders as "SE KVITTON". Such cases are listed as source differences only.

---

## 1. ALREADY DONE

**Menu (all 13 pages)**
- The menu structure, labels, order and destinations match exactly: Tjänster (Individuell vägledning, Klubb, Representant / agentur), Differencismen (Filosofin, Systemet), Om oss (Rickson Mansiamina, Difference Consulting), Kvitton, Kontakt.
- Destinations: the logo goes to `index.html`, Tjänster to `tjanster.html`, Om oss to `om-oss.html`, Differencismen to `differencismen.html` (Filosofin).
- The markup is identical on every page except the `is-current` marker.
- The footer is identical on all pages.

**1. Startsidan (`index.html`)**
- Hero paragraph 2, "Du kan inte kontrollera allt som händer…", matches.
- Hero paragraph 1 has the same words; only the line break differs (see S1).
- Signature "Rickson Mansiamina · Riktningsvägledare" matches.
- **Tjänster block:**
  - label "Tjänster"
  - "Samma arbete. Olika sammanhang."
  - "Se tjänster →" goes to tjanster
- **Differencismen block:**
  - "Ett system för självledarskap i prestation."
  - "Läs om Differencismen →" goes to differencismen
- **Om oss block:** "Läs om oss →" goes to om-oss.
- **Kvitton block:**
  - the quote
  - "Entreprenör"
  - "Se kvitton →" goes to kvitton
- **Closing:** "Inled en dialog." and "Kontakt →" going to kontakt.

**2. Tjänster (`tjanster.html`)**
- Heading "Samma arbete. Olika sammanhang." matches.
- The three labels (Individuell vägledning, Klubb, Representant / agentur) match, each with "Läs mer →" to the right subpage.

**3. Individuell vägledning (`tjanster-individ.html`)**
- H1 "Individuell vägledning." matches.
- The first sentence of the lead matches.
- Heading "Så börjar vi." matches.
- "Inled en dialog →" goes to kontakt.
- "Se kvitton" goes to kvitton.

**4. Klubb (`tjanster-klubb.html`)**
- H1 "Klubb." matches.
- Lead "Människan är grunden." matches.
- "Personlig vägledning i självledarskap med Rickson Mansiamina. För en eller flera personer i er klubb." matches.
- **The three h3 rows:**
  - all three headings match
  - the texts of rows 1–2 match
  - the first sentence of row 3 matches
- "Så börjar vi." and its paragraph 1 match.
- "Diskutera ett samarbete →" goes to kontakt.
- "Se kvitton" goes to kvitton.

**5. Representant / agentur (`tjanster-representant.html`)**
- H1 matches.
- Lead "Vägledning för människan du representerar." matches.
- "Personlig vägledning i självledarskap med Rickson Mansiamina." matches.
- "Diskutera ett samarbete →" goes to kontakt.
- "Se kvitton" goes to kvitton.

**6. Filosofin (`differencismen.html`)**
- The Filosofin/Systemet navigation exists (`nav.chapter-rail`, line 79) and is kept.
- Hero texts match:
  - "DIFFERENCISMEN."
  - "LED DIG SJÄLV. FÖRST."
  - "En filosofi och ett system för självledarskap."
  - "Av Rickson Mansiamina."
- Headings "Människan är grunden." and "Fem pelare." match.
- The pillar names and order match: Lagkapten, Sanning, Perspektiv, Riktning, Karaktär.
- The taglines "Led dig själv först.", "Se verkligheten som den är." and "Se mer än den första berättelsen." match.
- "Utforska Systemet →" goes to systemet.
- "Utforska vägledningen →" goes to tjanster.

**7. Systemet (`differencismen-systemet.html`)**
- The Filosofin/Systemet navigation exists.
- The signature "BRICKBYBORINGBRICK. / STEPBYBORINGSTEP." is exact, in `.rk-brick`, and the wall animation is in place.
- The first sentence of "Du undersöker vad som hände, hur du tolkade det och vad du gjorde därefter." matches.
- "Utforska vägledningen →" goes to tjanster.
- "Se kvitton" goes to kvitton.

**8. Om oss (`om-oss.html`)**
- H1 "Om oss." matches.
- Rickson card: "Rickson Mansiamina", "Människan. Historien. Riktningsvägledaren.", and "Läs mer →" to rickson.
- DC card: label "Difference Consulting", and "Läs mer →" to difference-consulting.

**9. Rickson Mansiamina (`rickson.html`)**
- H1 matches.
- Lead "Riktningsvägledare. / Grundare av Difference Consulting och Differencismen." matches.
- Heading "Jag lärde mig prestera långt innan jag lärde mig leda mig själv." matches.
- These paragraphs match:
  - Allsvenskan…
  - Fotbollen gav mig…
  - Jag sökte stöd… (KBT)
  - Jag ville skapa…
  - Jag spelar fortfarande fotboll…
- "Det började med papper…" matches except its last word.
- "2024 grundade jag…" matches except the dash.
- **Playbook:**
  - eyebrow "The Difference Playbook"
  - "En väg in i tänkandet."
  - "Fråga om Playbooken →" goes to kontakt
- "LED DIG SJÄLV. FÖRST." matches.
- "Utforska Differencismen →" goes to differencismen.
- "Se kvitton" goes to kvitton.
- The brick signature renders in capitals, but the source text is mixed case (see RM5).

**10. Difference Consulting (`difference-consulting.html`)**
- Label "Difference Consulting" and "Människan bär prestationen." match.
- These texts match:
  - the vision quote "Vi vill göra självledarskap till en självklar del av människors utveckling."
  - "Människans utveckling förtjänar samma uppmärksamhet som prestationen."
  - "Vi arbetar nära nog för att förstå och tydligt nog för att utmana. Människan äger sin riktning."
  - "Difference Consulting är bolaget bakom Differencismen, filosofin och systemet för självledarskap."
- "Utforska Differencismen →" goes to differencismen.
- **Playbook:**
  - the heading and both paragraphs match
  - "Difference Consulting grundades 2024 av Rickson Mansiamina." matches
  - "Möt Rickson Mansiamina →" goes to rickson
- "Så kan vi arbeta tillsammans →" goes to tjanster.

**11. Kvitton (`kvitton.html`)**
- H1 "Kvitton." and the lead match.
- Five cards match the document word for word:
  - "Entreprenör"
  - "Rektor"
  - "Jag känner mig mer som mig själv…" (Fotbollsspelare)
  - "Jag känner mig trygg…" (text only; the role differs)
  - "Jag har fått ett helt annat perspektiv…" (text only; split into 2 paragraphs and the role differs)
- The order of the nine document cards matches the current order once the Jurist card is removed.
- Button "Visa fler kvitton ↓" and its function match (js/main.js, `.kv-toggle`).
- The note "Namn utelämnas…" and "Berätta om din situation…" match.
- "Inled en dialog →" goes to kontakt.
- Meta, OG and Twitter descriptions match exactly.

**12. Kontakt (`kontakt.html`)**
- H1 "Inled en dialog." matches.
- "Skriv på WhatsApp" goes to wa.me/46762211357.
- "+46 76 221 13 57" uses `tel:+46762211357`.
- Caption "Rickson Mansiamina / Riktningsvägledare" matches.
- "Birger Jarlsgatan 57, Stockholm" matches.

**14. Links**
- Every link the site already has goes to the destination in the table. No wrong destinations were found; missing links are listed in section 2.

**Mobile, data and JS**
- No duplicated mobile markup was found. Each text exists once in the HTML.
  - The only menu is `.mobile-menu`, used at all widths.
  - `.path__detail` CSS exists, but no page uses that markup.
- There are no data or JSON content files. `vercel.json` holds only redirects, `package.json` holds no copy, and `sitemap.xml` holds only URLs.
- `js/main.js` contains no visible copy apart from the selector `'Visa fler kvitton'`.

---

## 2. MISSING / DIFFERS

Format: **ID**, then *current* → *document*. Line numbers refer to the current files.

### Meny
- The route exists in every file. No differences.

### 1. Startsidan
The route exists: `index.html`.

- **S1** Hero paragraph 1 is on one line. The document breaks the line after "prestation."
- **S2** REMOVE `p.hero__close` "Verkligheten är ditt träningsfält." (line 138). It is not in the document.
- **S3** MISSING: "Personlig vägledning i självledarskap för fotbollsspelare, ledare och företagare.", placed between hero paragraph 2 and the signature.
- **S4** MISSING: "Inled en dialog →" (→ Kontakt), placed after the signature.
- **S5** "LED DIG SJÄLV. FÖRST." is currently its own `section.motto` (lines 144–148) right after the hero. The document places it inside the Differencismen block, between the label "Differencismen" and "Ett system för självledarskap i prestation."
- **S6** Tjänster block lead: "Personlig vägledning i självledarskap. Samtal, eget digitalt Träningsfält och uppföljning över tid." → "Personliga samtal, ett eget digitalt Träningsfält och uppföljning över tid."
- **S7** Differencismen block label: the document has the text "Differencismen". The site shows the logo lockup (D mark and the `differencismen-ordmarke.png` image, `aria-label="Differencismen"`) and no text label. UNSURE whether this counts as matching.
- **S8** Om oss block label: "Rickson" → "Om oss".
- **S9** Om oss block title: "Människan bakom vägledningen." → "Människan och tanken bakom Difference Consulting."
- **S10** Om oss block line: "Rickson Mansiamina och Difference Consulting" → "Möt Rickson Mansiamina och läs om det vi bygger."
- **S11** Meta:
  - `description`, `og:description` and `twitter:description` all differ and all contain "beteende" → "Personlig vägledning i självledarskap med Rickson Mansiamina. För fotbollsspelare, ledare och företagare."
  - JSON-LD `Organization.description` (line 35) also contains "beteende" → the same text.

### 2. Tjänster
The route exists: `tjanster.html`.

- **T1** The document starts with "Tjänster." and then "Samma arbete. Olika sammanhang." The site has `p.eyebrow` "Tjänster" without a full stop, then `h1` "Samma arbete. Olika sammanhang." See U3.
- **T2** Individuell vägledning: "Personliga samtal och uppföljning utifrån det du vill utveckla eller befästa i din vardag." → "För dig som vill förstå dina mönster, använda dina styrkor och ta nästa steg."
- **T3** Klubb: "Individuell vägledning för en eller flera personer i er klubb." → "Individuell vägledning i självledarskap för en eller flera personer i er klubb."
- **T4** Representant: "När en representant eller agentur initierar arbetet runt sin klient." → "Vägledning för människan du representerar."
- **T5** Meta: all three contain "individuell process" or "En kärna, tre ingångar" → "Individuell vägledning i självledarskap. Utforska samarbeten för individer, klubbar och representanter genom Difference Consulting."

### 3. Individuell vägledning
The route exists: `tjanster-individ.html`.

- **I1** Lead: remove the second sentence, "För fotbollsspelare, ledare och människor utanför idrotten."
- **I2** Hero paragraph "Vi arbetar med hur du möter krav, fattar beslut och agerar i din vardag. Vi utgår från det du vill förbättra och det du vill befästa." → two paragraphs:
  - "Du vill framåt. Samtidigt kanske tankarna tar över, andras förväntningar väger tungt eller samma situation fortsätter att återkomma."
  - "Du kan också vara på en bra plats och vilja förstå vad som fungerar, så att du kan fortsätta med det."
- **I3** Section "Det börjar med dig." → "Du får utrymme att tänka högt."
  - Paragraph 1 → "Jag lyssnar, ställer frågor och utmanar dig där det behövs. Vi tar oss tid att förstå dig, dina styrkor och sammanhanget du står i."
  - Paragraph 2 → "Ur samtalen väljer vi vad som behöver få din uppmärksamhet och vad du ska pröva i vardagen."
- **I4** Section "Samtalet är en del. Verkligheten är träningsfältet." The heading is built from two `.ind-phrase` spans (line 113) and has 2 paragraphs.
  - Document heading: "Det vi pratar om följer med."
  - Document paragraphs (5):
    - "Du får ett eget digitalt Träningsfält med ditt aktuella fokus, sammanfattningar och personligt material."
    - "Det hjälper dig att förbereda dig inför situationer och reflektera efteråt. Det kan handla om ett samtal du behöver ta, hur du möter en förändrad roll eller vad du gör efter ett misstag."
    - "Nästa gång vi ses tar vi vid i det som hände. Vad använde du? Vad hjälpte? Vad behöver du fortsätta träna?"
    - "Tidigare lärdomar finns kvar. När något återkommer kan vi se det i ett större sammanhang och följa hur du möter det över tid."
    - "Vi håller också kontakt mellan samtalen enligt vårt överenskomna upplägg."
- **I5** Section "Ditt digitala Träningsfält." has 6 paragraphs and the image `datorbild.jpeg`. The document has no such heading.
  - Its slot becomes "Du ska kunna använda det själv." with 2 paragraphs:
    - "Vägledningen bygger på Differencismen och ska stärka din självkännedom och din förmåga att fatta egna beslut."
    - "Det du lär dig ska gå att använda även när jag inte är med."
  - The mapping is unclear; see U4.
- **I6** "Så börjar vi."
  - Paragraph 1 → "I ett första samtal berättar du om din situation och vad du söker. Tillsammans ser vi om vägledningen passar och kommer överens om upplägget."
  - Paragraph 2 → "Om en klubb eller representant är delaktig tydliggör vi tillsammans med dig deras roll och vad som får återkopplas."
- **I7** REMOVE `p.statement-caps.ind-sign` "LED DIG SJÄLV. FÖRST.". It is not in the document for this page.
- **I8** Label "Se Kvitton" → "Se kvitton". Source only; it renders in capitals.
- **I9** Meta: contains "individuell process" → "Personliga samtal, ett eget digitalt Träningsfält och uppföljning med Rickson Mansiamina. Det vi pratar om följer med ut i vardagen."

### 4. Klubb
The route exists: `tjanster-klubb.html`.

- **K1** "Jag vägleder människor i att möta krav, fatta egna beslut och ta ansvar för sitt agerande. Vi utgår från styrkorna, det som behöver utvecklas och det som ska befästas." → "Jag vägleder människor i att möta krav, fatta egna beslut och ta ansvar för sina handlingar. Arbetet utgår från individens styrkor, förutsättningar och det som behöver förbättras."
- **K2** REMOVE h2 "Förändra. Befästa. Bygga vidare." (section at line 100). The three h3 rows stay.
- **K3** Row "När det går bra.", second sentence: "Vi undersöker vad som fungerar, vad som ska befästas och vad nästa steg kräver." → "Vi tar vara på det som fungerar och förbereder för nästa steg."
- **K4** h2 "Ett tydligt samarbete runt individen." → "Ett eget utrymme för individen."
- **K5** "Vägledningen kompletterar klubbens arbete och ger individen ett eget utrymme för samtal. Upplägget anpassas till personens situation." → "Vägledningen kompletterar klubbens arbete. Personen får utrymme att tänka högt, pröva perspektiv och förstå sina egna val."
- **K6** MISSING: "Samarbetet omfattar personliga samtal, ett eget digitalt Träningsfält och uppföljning över tid."
- **K7** "Vi kommer överens om min roll, klubbens kontaktperson och hur samarbetet följs upp. Tillsammans med individen tydliggör vi vad som stannar i vägledningen och vad som får återkopplas, till vem och varför." → "Vi tydliggör min roll och hur samarbetet följs upp. Tillsammans med individen kommer vi överens om vad som får återkopplas till klubben."
- **K8** REMOVE the whole section "Arbetet följer med ut i vardagen." (line 143). It contains:
  - 2 paragraphs
  - h3 "Ett eget digitalt Träningsfält."
  - 5 more paragraphs
  - the image `datorbild.jpeg`
  - This matches the document's "De tidigare längre beskrivningarna på tjänstesidorna".
- **K9** "Så börjar vi." paragraph 2 → "Därefter träffar jag personen och tar del av den egna situationen och förväntningarna. Om vi väljer att arbeta vidare förankrar vi upplägget med klubben."
- **K10** REMOVE "LED DIG SJÄLV. FÖRST." (`.ind-sign`).
- **K11** MISSING link "Läs om individuell vägledning →" (→ `tjanster-individ.html`), between "Diskutera ett samarbete" and "Se kvitton".
- **K12** "Se Kvitton" → "Se kvitton" (source).
- **K13** Meta → "Individuell vägledning i självledarskap för en eller flera personer i er klubb. Personliga samtal, ett eget Träningsfält och uppföljning."

### 5. Representant / agentur
The route exists: `tjanster-representant.html`.

- **R1** "Jag vägleder människor i att möta krav, fatta egna beslut och ta ansvar för sitt agerande. Vägledningen kan komplettera stödet runt en eller flera personer som du eller din agentur representerar." → "Du kan introducera en individ som vill stärka sitt självledarskap. Jag tar det första samtalet och formar därefter arbetet tillsammans med individen."
- **R2** MISSING: "Arbetet handlar om att ta vara på möjligheter, möta motgångar och leda sig själv när rollen eller förutsättningarna förändras."
- **R3** MISSING: "Samarbetet omfattar personliga samtal, ett eget digitalt Träningsfält och uppföljning över tid."
- **R4** MISSING: "Individens förtroende är grunden. Vi kommer överens med individen om vad som kan återkopplas till dig."
- **R5** REMOVE four sections that the document does not have:
  - "Ett tydligt samarbete. Ett eget utrymme." (2 paragraphs)
  - "Förändra. Befästa. Bygga vidare." (2 paragraphs)
  - "Samtalet är en del. Verkligheten är träningsfältet." (2 paragraphs and the image `representant-dorroppning.jpg`)
  - "Ett eget digitalt Träningsfält." (4 paragraphs and `datorbild.jpeg`)
- **R6** REMOVE "Så börjar vi." (h2 and 3 paragraphs, in the dark `pageclose`). The document has no "Så börjar vi" on this page; see U5.
- **R7** REMOVE "LED DIG SJÄLV. FÖRST.".
- **R8** MISSING link "Läs om individuell vägledning →" (→ `tjanster-individ.html`).
- **R9** "Se Kvitton" → "Se kvitton" (source).
- **R10** Meta: contains "individuell process" → "Vägledning för människan du representerar. Stöd i att möta motgångar, ta vara på möjligheter och leda sig själv genom förändring."

### 6. Differencismen – Filosofin
The route exists: `differencismen.html`.

- **F1** REMOVE hero paragraph "Att leda dig själv är att upptäcka vad som sker inom dig och ta ansvar för hur du agerar. I vardagen, i relationerna och i prestationen."
- **F2** "Människan är grunden." goes from 4 paragraphs to 3:
  - REMOVE "Du är större än din prestation. Du bär ansvar för dina val."
  - "Du ska kunna använda dina kvaliteter, vara ärlig…" → "Du ska kunna vilja mer och ta ansvar för dina handlingar utan att göra ditt värde beroende av nästa resultat."
  - "Känslan är verklig utan att vara hela sanningen…" → "Känslan får finnas. Du kan lyssna till den, förstå vad den säger och fortfarande välja hur du vill möta situationen."
  - "Självledarskap behövs när det tar emot…" → "Differencismen handlar om att leda dig själv genom det som sker. I vardagen, i relationerna och i prestationen."
- **F3** REMOVE "Fem pelare bär filosofin. De samverkar i hur du möter dig själv och din omgivning."
- **F4** Pillars. Each pillar is currently tagline + body; the split is assumed, see U6.
  - Lagkapten body: "Ta ansvar för det du kan påverka. Ta emot vägledning och äg dina beslut." → "Ta ansvar för det du kan påverka och äg dina beslut."
  - Sanning body: "Se vad som har hänt och din egen del i det. Var ärlig med både det som fungerar och det som behöver utvecklas." → "Var ärlig med det som fungerar och det som behöver förbättras."
  - Perspektiv body: "Pröva ditt sätt att se. Ge utrymme för andra synvinklar och för att din egen bild kan förändras." → "Pröva din tolkning och ge plats åt andra synvinklar."
  - Riktning tagline: "Välj vad du vill bygga." → "Välj vad du vill stå för."
  - Riktning body: "Tydliggör vad du vill stå för…" → "Låt det vägleda nästa rätta steg."
  - Karaktär tagline: "Lev det du har valt." → "Låt det du står för synas i det du gör."
  - Karaktär body: "Låt det du står för synas i dina återkommande handlingar…" → "Ta ansvar när du tappar riktningen och återvänd."
- **F5** REMOVE the whole section "Grundlagarna." (`#grundlagarna`, line 172). It holds 2 paragraphs and three laws with explanations, which matches "Grundlagarnas separata förklaringar".
- **F6** Closing:
  - h2 "Systemet gör filosofin användbar." → "Det du förstår behöver gå att använda."
  - Its 2 paragraphs become 1: "Systemet förbinder filosofin med situationerna du möter och handlingarna du kan träna."
- **F7** REMOVE link "Se Kvitton →". It is not in the document for this page.
- **F8** Meta → "Differencismen är en filosofi och ett system för självledarskap. Utforska människosynen och de fem pelarna. Led dig själv. Först."

### 7. Differencismen – Systemet
The route exists: `differencismen-systemet.html`.

- **Y1** H1 "Systemet" → "Systemet." (adds the full stop).
- **Y2** Lead "Bygg det du vill kunna lita på." → "Förståelsen behöver bli handling."
- **Y3** "Differencismens system förbinder de fem pelarna med ditt eget liv…" → "Differencismens system gör självledarskap träningsbart i vardagen och i prestation. De fem pelarna är grunden."
- **Y4** MISSING: "Träningen tar form i situationer du redan möter: när du får större ansvar, vill ta vara på en möjlighet eller behöver möta en motgång."
- **Y5** Section 2:
  - Heading "Se vad som återkommer." → "Se det som återkommer."
  - Paragraph 1 → "Vad hjälper dig att vara härvarande? När börjar det yttre bruset styra? Vad gör du redan som är värt att fortsätta med?"
  - Paragraph 2: its second sentence → "Dina förutsättningar och sammanhanget du står i är en del av förståelsen."
  - REMOVE paragraph 3, "När du ser samband…"
- **Y6** Section 3:
  - Heading "Vad behöver du från dig själv?" → "Välj nästa rätta steg."
  - Its 3 paragraphs are replaced by:
    - "Det du förstår ska hjälpa dig att agera."
    - "Det kan innebära att ta ett initiativ, genomföra ett samtal du har skjutit upp, sätta en gräns eller prioritera återhämtning."
    - "Nästa steg utgår från den verklighet som finns och det du kan påverka."
- **Y7** MISSING SECTION "Följ det du gör.", with:
  - "Ett kvitto kan vara att samtalet blev av. Att du tog initiativet. Eller att du hittade tillbaka till uppgiften efter ett misstag."
  - "Kvittona hjälper dig att se vad du har gjort, vad som fungerar och vad som behöver fortsatt träning."
- **Y8** Section 4:
  - Heading "Se vad som håller över tid." → "Riktningen väljs. Standarden byggs."
  - Its 4 paragraphs are replaced by:
    - "En enskild handling visar vad du gjorde i en situation. När det du tränar blir mer pålitligt genom flera situationer och förändrade villkor börjar en standard ta form."
    - "Du tränar också på att upptäcka när du tappar riktningen och återvända till det du kan påverka."
- **Y9** REMOVE "Arbetet ska stärka din förmåga att förstå dig själv och fatta egna beslut. ♟️🧩" (inside `pageclose`, after the wall).
- **Y10** "Se Kvitton" → "Se kvitton" (source).
- **Y11** Meta: contains "From understanding. To behaviour. To standard." → "Förstå dina mönster, välj nästa rätta steg och följ det du gör. Differencismens system gör självledarskap träningsbart över tid."

### 8. Om oss
The route exists: `om-oss.html`.

- **O1** DC card: "Bolaget. Identiteten. Sättet vi bygger." → "Varför vi finns. Det vi bygger."
- **O2** Meta → "Möt Rickson Mansiamina och Difference Consulting. Läs om bakgrunden, vägledningen och det vi bygger genom Differencismen."

### 9. Rickson Mansiamina
The route exists: `rickson.html`.

- **RM1** "Jag arbetar med fotbollsspelare, ledare och människor utanför idrotten. Vägen dit började med ett arbete med mig själv." → "Jag vägleder människor i hur de möter krav, förändring och sin egen ambition. Vägen dit började med mig själv."
- **RM2** `.rk-moment`: "Jag fick inget stort svar<br>jag fick ett arbete." → "Jag fick inget stort svar.<br>Jag fick ett arbete."
- **RM3** "…vad jag behövde utveckla." → "…vad jag behövde förbättra."
- **RM4** "växte Differencismen fram - filosofin…" uses a hyphen. The document uses an em dash ("—"). See U8.
- **RM5** Signature source "BrickByBoringBrick.<br/> StepByBoringStep.<br>♟️🧩" → "BRICKBYBORINGBRICK. / STEPBYBORINGSTEP. / ♟️🧩". It already renders in capitals; the document says "Skriv signaturerna exakt".
- **RM6** Playbook paragraph "The Difference Playbook samlar delar av språket, perspektiven och principerna bakom arbetet. Den är inte hela Differencismen. Den är en väg in." → "Reflektioner och praktiska uppgifter om självledarskap. För dig som vill läsa, skriva och pröva perspektiven i din egen vardag."
- **RM7** `.rk-moment`: "Fotbollen är min spets<br>människan är grunden." → "Fotbollen är min spets.<br>Människan är grunden."
- **RM8** REMOVE "Som riktningsvägledare arbetar jag med hur människor möter krav, förändring och prestation."
- **RM9** "Se Kvitton" → "Se kvitton" (source).
- **RM10** Meta: `description`, `og:description`, `twitter:description` and JSON-LD `Person.description` all differ → "Riktningsvägledare och grundare av Difference Consulting och Differencismen. Läs om vägen från fotbollen till arbetet med människor."

### 10. Difference Consulting
The route exists: `difference-consulting.html`.

- **D1** "Vi vägleder människor i självledarskap genom personliga samtal och uppföljning över tid. Arbetet handlar om att förstå sig själv och göra medvetna val i vardagen." → "Difference Consulting gör självledarskap konkret genom personliga samtal, träning i vardagen och uppföljning över tid."
- **D2** "Vi arbetar med fotbollsspelare, ledare och människor utanför idrotten." → "…ledare och företagare."
- **D3** ORDER: the site has Vår vision (line 97), then Varför vi finns (line 109). The document has Varför vi finns, then Vår vision.
- **D4** Varför vi finns:
  - The label has no full stop; the document has "Varför vi finns." See U9.
  - MISSING paragraph "Att vilja mer behöver kunna gå tillsammans med att förstå sig själv, ta vara på sina styrkor och hålla isär sitt värde från sitt senaste resultat.", placed between the title and "Vi arbetar nära nog…".
  - The text sits on an image card (`home-feature--portrait dc-card`).
- **D5** Vår vision:
  - The label has no full stop.
  - "Det inre arbetet ska följa människan genom hela livet, också när ambitionerna växer, möjligheterna blir större och ansvaret ökar." → "Det inre arbetet ska följa människan när det tar emot, när möjligheterna växer och när ansvaret förändras."
  - REMOVE "Genom Differencismen vill vi göra självledarskap tillgängligt och användbart för fler människor, inom och utanför idrotten."
- **D6** Det vi bygger:
  - The h2 "Det vi bygger" has no full stop.
  - Paragraph 2, "Vi utvecklar vägledning och material som människor kan använda både tillsammans med oss och på egen hand…" → "Genom vägledningen och det personliga materialet gör vi det möjligt att fortsätta träna mellan samtalen. Det vi lär oss i arbetet med människor fördjupar och förbättrar innehållet."
  - REMOVE paragraph 3, "Vi bygger för att Differencismen ska kunna nå fler…"
  - UNSURE: the document asks to remove "Stycket om framtida digitala verktyg och utbildning". No text on the site contains "digitala verktyg", and "utbildning" appears only on rickson.html. Paragraphs 2 and 3 are the nearest match, and both are replaced anyway.
- **D7** MISSING link "Fråga om Playbooken →" (→ Kontakt) in the Playbook section, after "Läs. Skriv. Pröva…".
- **D8** REMOVE "LED DIG SJÄLV. FÖRST." (`p.statement-caps` in the closing).
- **D9** Meta → "Difference Consulting gör självledarskap konkret genom personliga samtal, träning i vardagen och uppföljning över tid."

### 11. Kvitton
The route exists: `kvitton.html`.

- **KV1** REMOVE the Jurist card (lines 110–117, "Innan vi började jobba ihop…").
- **KV2** Card 2 (Fotbollsspelare) goes from 3 paragraphs to 2:
  - "Jag har blivit modigare i mitt spel och kan ta bättre beslut. Om något irriterar mig fokuserar jag på det som ligger inom min kontroll."
  - "Vi kan ha en ärlig och öppen dialog. Du lyssnar och förstår det jag går igenom utan att döma."
- **KV3** Card "Man känner…": paragraphs 1 and 2 merge into "Man känner att man pratar med en person på samma nivå som en själv. Det är viktigt för att känna sig bekväm med att dela med sig." (current paragraph 2 is "Det gör det lättare att känna sig bekväm…")
- **KV4** Card "Jag har börjat se saker…", paragraph 2: "Det känns enkelt att prata med dig. Att prata om lösningar med någon som förstår och står utanför min klubb har hjälpt mig på många sätt." → "Det känns enkelt att prata med dig. Du är bra på att lyssna, och det har varit värdefullt att prata om lösningar med någon som förstår och står utanför min klubb."
- **KV5** Card "Jag känner mig trygg…": role "Klient" → "Individ" (line 138).
- **KV6** Card "lugnare":
  - Current: "Jag har fått bättre självkännedom, vilket gör att jag tar för mig och vågar mer." / "Jag har blivit en lugnare människa som kan kontrollera mina känslor mycket bättre."
  - Document: "Jag har blivit en lugnare människa som kan kontrollera mina känslor bättre. Jag har fått ett bättre självförtroende som gör att jag tar för mig och vågar mer."
  - Paragraph 3 matches.
- **KV7** Card "Jag har fått ett helt annat perspektiv…":
  - Paragraphs 1 and 2 merge into one.
  - Role "Klient" → "Individ" (line 154).
- **KV8** Closing h2 "Vad vill du utveckla?" → "Vad vill du förbättra eller bygga vidare på?"
- **KV9** REMOVE "LED DIG SJÄLV. FÖRST." (`.ind-sign` in the closing).
- **KV10** The document wraps every card in ”…”. The cards have no quote marks in the markup or the CSS. See U10.
- **KV11** After KV1, the current classes show 5 cards and hide 4. Today 6 are shown and 4 hidden, because Jurist is card 4 of the visible six. See U11.

### 12. Kontakt
The route exists: `kontakt.html`.

- **KT1** MISSING paragraph after the h1: "Berätta kort var du befinner dig och vad du vill ha vägledning i. Skriver du för en klubb eller agentur, beskriv vem samarbetet gäller." See U12.
- **KT2** The WhatsApp button arrow is "↗︎"; the document has "→". UNSURE whether the glyph matters.
- **KT3** E-mail "Rickson@differenceconsulting.se" → "rickson@differenceconsulting.se". The same address with a capital R also appears in:
  - the `mailto:` link
  - JSON-LD in index.html (lines 36, 48) and rickson.html (line 35)
  - integritetspolicy.html (line 91)
- **KT4** The final line "Difference Consulting" exists only as the footer wordmark, which is on every page. UNSURE whether the document means the footer or a separate line.
- **KT5** Meta:
  - `description` "Inled en dialog med Rickson Mansiamina på Difference Consulting. Skriv direkt via WhatsApp eller e-post…" differs.
  - `og:description` and `twitter:description` are "Inled en dialog.".
  - All three → "Inled en dialog med Rickson Mansiamina om individuell vägledning eller ett samarbete för klubb och agentur."

### 13. Page descriptions (summary)

| Page | meta | og | twitter | JSON-LD |
|---|---|---|---|---|
| Startsidan | differs | differs | differs | Organization: differs |
| Tjänster | differs | differs | differs | none |
| Individuell vägledning | differs | differs | differs | none |
| Klubb | differs | differs | differs | none |
| Representant / agentur | differs | differs | differs | none |
| Filosofin | differs | differs | differs | none |
| Systemet | differs | differs | differs | none |
| Om oss | differs | differs | differs | none |
| Rickson Mansiamina | differs | differs | differs | Person: differs |
| Difference Consulting | differs | differs | differs | none |
| Kvitton | **OK** | **OK** | **OK** | none |
| Kontakt | differs | differs | differs | none |

- `<title>`, `og:title` and `twitter:title` are not covered by the document and are left untouched.
- The index title "Riktningsvägledning i prestation" is not mentioned in the document.

### 14. Links (summary)
- **Wrong destination:** none.
- **Missing:**
  - S4 "Inled en dialog" in the start-page hero
  - K11 and R8 "Läs om individuell vägledning"
  - D7 "Fråga om Playbooken" on Difference Consulting
- **On the site but not in the document:** F7 "Se Kvitton" on Filosofin.
- **Label case "Se Kvitton" → "Se kvitton":** 6 files (individ, klubb, representant, differencismen, systemet, rickson). They render in capitals.

### Removed-terms check (whole site)
- **"beteende":**
  - only in index.html meta and JSON-LD (S11)
  - plus "kognitiv beteendeterapi" on rickson.html, which the document says to keep
- **"From understanding…":** only in Systemet meta (Y11).
- **"Klient":** 2 role captions on kvitton (KV5, KV7), and "sin klient" on tjanster.html (T4).
- **"individuell process":** only in meta on tjanster, individ and representant.
- **"härvaro"/"härvarande":** not on the site today. The new Systemet copy adds "härvarande" (Y5).
- **"Handling" as method term:** the site currently uses "agerande" (Klubb K1, Representant R1, Filosofin F1). All of these are replaced by the document's text.

---

## 3. CLASSIFICATION

**Rule used**
- **SMALL:** text swaps, and adding or removing paragraphs or links inside an existing section, using classes that already exist.
- **BIG:** removing, adding or reordering whole sections, changing the hero composition, or changing the "visa fler" logic.

### SMALL (85)

| Page | Count | IDs |
|---|---|---|
| Startsidan | 6 | S1, S2, S6, S8, S9, S10 (S3 and S4 are in B1) |
| Tjänster | 3 | T2, T3, T4 (T1 waits on U3) |
| Individuell vägledning | 6 | I1, I2, I3, I6, I7, I8 |
| Klubb | 11 | K1, K2, K3, K4, K5, K6, K7, K9, K10, K11, K12 |
| Representant / agentur | 7 | R1, R2, R3, R4, R7, R8, R9 |
| Filosofin | 6 | F1, F2, F3, F4 (7 pillar texts counted as 1), F6, F7 |
| Systemet | 9 | Y1, Y2, Y3, Y4, Y5, Y6, Y8, Y9, Y10 |
| Om oss | 1 | O1 |
| Rickson Mansiamina | 8 | RM1, RM2, RM3, RM5, RM6, RM7, RM8, RM9 (RM4 waits on U8) |
| Difference Consulting | 6 | D1, D2, D5, D6, D7, D8 (D4's label full stop waits on U9) |
| Kvitton | 9 | KV1, KV2, KV3, KV4, KV5, KV6, KV7, KV8, KV9 |
| Kontakt | 2 | KT1, KT3 (KT2 and KT4 are UNSURE) |
| Meta | 11 pages | S11, T5, I9, K13, R10, F8, Y11, O2, RM10, D9, KT5 (including both JSON-LD blocks) |

Counting each ID once gives 85 SMALL items: 74 text and link items plus 11 meta pages.

### BIG (8)

| # | Item | IDs | Estimate |
|---|---|---|---|
| B1 | Start-page hero: new line and a "Inled en dialog →" button below the signature. The big logo animation must stay. | S3, S4 | 0.5–1 h |
| B2 | Start page: move "LED DIG SJÄLV. FÖRST." from `section.motto` into the Differencismen feature block. Waits on U1. | S5, S7 | 0.5–1 h |
| B3 | Individuell vägledning: rebuild sections 3–4. New headings, the `.ind-phrase` heading goes, paragraphs are redistributed (2+6 becomes 5+2), and the image placement is unclear. | I4, I5 | 1–1.5 h |
| B4 | Klubb: remove the section "Arbetet följer med ut i vardagen." with its h3 and image, and the light/beige background order changes. | K8 | 0.5 h |
| B5 | Representant: remove 4 sections and "Så börjar vi". The page becomes hero, 4 paragraphs and links. Decide what happens to the images and the dark closing. | R5, R6 | 1 h |
| B6 | Filosofin: remove the Grundlagarna section and fix the redirect `/differencismen-grundlagarna` → `/differencismen#grundlagarna` (vercel.json lines 6–7), which would point to a removed anchor. | F5 | 0.5 h |
| B7 | Systemet: add a new section "Följ det du gör." using the existing Split pattern. Background order: light, beige, light, then the new section. | Y7 | 0.5–1 h |
| B8 | Difference Consulting: swap the order of Vår vision and Varför vi finns, and add a paragraph to the image card (D4). Check that the text fits the image on mobile. | D3, D4 | 1 h |

- **Kvitton visible count:** if the client wants 6 cards visible after Jurist is removed (U11), moving one `kv-card--extra` class is SMALL. The interaction itself does not change.
- **BIG total:** about 5.5–7.5 h. SMALL items: about 3–4 h including verification.

---

## 4. UNCLEAR IN THE DOCUMENT

- **U1. Start page, LED DIG SJÄLV. FÖRST.**
  - Rickson's earlier briefs (start-page package and motto brief) put the motto as its own element after the signature. It was built and committed as its own section in 67671a2.
  - The final document places it inside the Differencismen block instead.
  - Should the separate motto section be removed? Should the Instrument Sans styling come along to the new position?
- **U2. Start-page hero line breaks.** The document breaks the line after "prestation." in paragraph 1, but also says "Anpassa radbrytningar". Is that break required?
- **U3. Tjänster heading.** The document writes "Tjänster." with a full stop and then "Samma arbete. Olika sammanhang.".
  - Should "Tjänster." become the h1, with "Samma arbete…" as the lead?
  - Or should the label stay and only gain a full stop?
- **U4. Individuell vägledning section mapping.** The document has four headings:
  - "Du får utrymme att tänka högt."
  - "Det vi pratar om följer med."
  - "Du ska kunna använda det själv."
  - "Så börjar vi."

  Questions:
  - Are these the same four slots as today, with the same background colours?
  - Should the image `datorbild.jpeg` stay, and in which section?
  - Should the hero image stay?

  Short lines were read as headings, which is an assumption.
- **U5. Representant without "Så börjar vi".** The page loses the dark closing section's heading and text.
  - Should the links "Diskutera ett samarbete / Läs om individuell vägledning / Se kvitton" stay in a dark closing, or sit directly under the text?
  - Should any of the three page images remain? The doorway portrait `representant-dorroppning.jpg` was added at Alex's request in 9bf1b8d.
- **U6. Pillar texts.** Each pillar in the document is one line of two sentences. Should the first sentence stay the tagline (bold `p`) and the rest the body? Karaktär's first sentence "Låt det du står för synas i det du gör." would then replace the tagline "Lev det du har valt.".
- **U7. Signatures on pages where the document does not list them.** "LED DIG SJÄLV. FÖRST." is on Individ, Klubb, Representant, Difference Consulting and Kvitton, but the document does not include it for those pages.
  - "Lägg inte till fler slogans" suggests removal.
  - Confirm that they should be removed rather than just not added.
- **U8. Em dash on the Rickson page.** The document writes "fram — filosofin". Alex earlier asked for em dashes to be removed ("ta bort ai strecket", 99ade84). Which rule applies?
- **U9. Full stops on labels.** The document has "Varför vi finns.", "Vår vision." and "Det vi bygger." with full stops. The site styles these as eyebrow labels in capitals without full stops. Should full stops be added?
- **U10. Quote marks on Kvitton cards.** Should ”…” be added around each card, or are they only notation in the document? The start-page quote does show ”…”.
- **U11. How many Kvitton cards before "Visa fler"?** There are 9 cards. Today 6 are shown and 4 hidden. With the current classes, removing Jurist leaves 5 shown and 4 hidden. The document does not give a number.
- **U12. Kontakt intro paragraph.** Rickson's earlier Kontakt brief removed the lead paragraph. The final document brings back a new one. The document says it replaces earlier proposals, so adding it seems intended; confirm.
- **U13. Kontakt "Difference Consulting".** Is this the existing footer, or should it be a separate line on the page?
- **U14. E-mail casing.** Should "rickson@…" be lowercase everywhere, including `mailto:`, JSON-LD and the privacy policy? The privacy policy is not covered by the document.
- **U15. Kvitton emphasis.** The first paragraph of each card is styled larger (`.kv-lead`). The document shows no emphasis, and the merged paragraphs (KV2, KV3, KV6, KV7) change what the first paragraph contains. Should the whole first paragraph stay emphasised?

---

## 5. SUMMARY

- **SMALL:** 85 items (74 text and link items plus 11 meta pages).
- **BIG:** 8 items, about 5.5–7.5 h.
- **UNCLEAR:** 15 questions for the client. U1, U4, U5 and U11 block BIG items.

**Proposed order**
1. Meta, OG, Twitter and JSON-LD for all 12 pages. No visual risk.
2. SMALL text swaps per page, in the document's order. Hold the items that depend on U-answers.
3. Kvitton: KV1–KV9, after U10, U11 and U15 are answered.
4. Get answers to U1–U15 from Rickson.
5. BIG items one at a time, with approval between each (CLAUDE.md): B6, B4, B7, B8, B3, B5, B1, B2.
6. Final check: every page at 1440, 390 and 320 px, all links, no horizontal scroll, and a search for the removed terms.

**Risks**
- **Start-page hero (B1, B2):** the big logo animation (`hero-logo`, main.js) must not be touched. Removing `section.motto` also removes the newly loaded Instrument Sans.
- **Wall animation:** the BRICKBYBORINGBRICK drift (`.rk-brick`) on Systemet is locked. Y9 edits the same `pageclose` and must leave the wall untouched.
- **Redirect:** removing `#grundlagarna` (B6) leaves `/differencismen-grundlagarna` pointing at an anchor that no longer exists.
- **Background rhythm:** removing or adding sections (B4, B5, B7, B8) breaks the alternating light, beige and dark backgrounds.
- **Difference Consulting image card:** a longer text on the image (D4) may overflow on mobile.
- **Kvitton script:** the "visa fler" script expects at least one `.kv-card--extra`. Moving classes must leave one in place.
- **Locked memory rules:** Individuell vägledning is locked "utan uttrycklig order". This document is that order, but the scope should be confirmed with Alex (U4).
