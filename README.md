# Difference Consulting — hemsida (ny)

Ny hemsida för Difference Consulting. Byggd runt Rickson Mansiamina —
riktningsvägledare och grundare — och filosofin Differencismen.

Elegant, exklusiv och minimalistisk. Ren HTML, CSS och JavaScript utan ramverk.
Byggd mobile first, med varm benvit grund och djup grafit.

## Sidor

| Fil | Sida |
| --- | --- |
| `index.html` | Startsidan |
| `arbetet.html` | Arbetet (självledarskap i prestation) |
| `differencismen.html` | Differencismen (de fem pelarna) |
| `rickson.html` | Rickson (ersätter Om oss, inkl. The Difference Playbook) |
| `klubbar.html` | Klubbar och organisationer |
| `ansok.html` | Ansök om ett samtal (ansökningsformulär) |
| `integritetspolicy.html` | Integritetspolicy (utkast) |

## Struktur

```
css/main.css              Designsystem (tokens, typografi, komponenter)
js/main.js                Nav, mobilmeny, reveal-on-scroll, logganimation
js/application-form.js    Ansökningsformulär (validering, spamskydd, bekräftelse)
api/send-email.js         Skickar ansökan + bekräftelse via Resend
assets/                   Bilder
vercel.json               cleanUrls + omdirigeringar från gamla länkar
```

## Kör lokalt

```bash
npx serve .
# eller
python3 -m http.server 8000
```

Formuläret kräver Vercel-funktionen och `RESEND_API_KEY` för att faktiskt skicka mejl.

## Kvar att bekräfta innan publicering

- **Bilder på Rickson** — porträtt, arbetsmiljö, samtalsmiljö, fotbollsmiljö.
  Platshållarytor är markerade med `data-placeholder` i markup.
- **Professionell mejladress** på domänen (`rickson@` eller `kontakt@differenceconsulting.se`).
  Sätt `data-to` på formuläret i `ansok.html` och/eller `OWNER_EMAIL` i miljön.
- **Instagram- och LinkedIn-länkar** i footern.
- **Integritetspolicyns** cookie-/spårningsavsnitt.
