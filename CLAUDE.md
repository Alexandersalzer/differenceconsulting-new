# CLAUDE.md

## Arbetssätt — obligatoriskt för allt visuellt/strukturellt arbete

1. Innan du skriver någon kod för en ny sektion, layout eller designändring:
   beskriv kort vad du tänker bygga (struktur, spacing-approach, vilka
   klasser/tokens) och vänta på godkännande. Gäller ALLTID för:
   - Ny HTML-struktur/markup
   - Nya CSS-regler eller ändrade befintliga
   - Layoutbeslut (aspect-ratio, spacing-skala, textbredd)

2. Undantag som INTE kräver godkännande innan du kör:
   - Ren inventering/läsning av befintlig kod
   - Buggfixar på redan godkänt beteende (t.ex. "gapet är 0px, ska vara --stack-2")
   - Ändringar jag redan explicit specificerat i detalj (exakta värden, exakt klass)

3. Efter att du byggt något visuellt: redovisa mätvärden FÖRE du föreslår
   commit, aldrig efter. Jag ska kunna kontrollera innan det finns i min editor.

4. En sektion/komponent i taget. Bygg inte sektion 2 innan sektion 1 är
   godkänd, även om briefen beskriver alla nio.

5. Skriv aldrig ny CSS utan att först visa vilka befintliga tokens/klasser
   du tänker återanvända kontra vad som är nytt.

## Befintliga sektioner är låsta
Vid "byt bara text": byt texten INUTI befintliga taggar. Lägg inte till
nya <p>, byt inte klass på något, dela inte stycken, slå inte ihop stycken.
Om briefens copy inte får plats i befintlig struktur — stoppa och fråga.
Lös det aldrig själv genom att bygga om. Gammal struktur > din idé om
vad som vore snyggare.

## Läs klassens CSS innan du använder den
Innan du sätter en klass på något: grep fram dess regel och verifiera
text-align, font-size, max-width, margin. Antag aldrig vad en klass gör
utifrån namnet. (.statement-caps är centrerad; .statement är serif
--step-3 — båda hamnade fel för att jag inte läste dem först.)

Sätt aldrig en rubrikklass (.statement, .statement-caps, .h1-.h4) på en
rad som står mitt i ett brödtextflöde. Stora rubriker står ensamma i egna
sektioner, aldrig mellan <p>-taggar.

## Innehållslistan gäller ALLA textändringar
Inte bara nya sektioner. Även rena copy-byten i befintlig markup:
rad för rad, gammal text -> ny text, med klass, innan något körs.

## Gissa aldrig — fråga
Om briefen saknar något (en rubrik, en beskrivning, ett värde): stoppa
och fråga. Hitta aldrig på innehåll och rapportera det efteråt som
"säg till om du vill ha annat". Det är att smyga in eget innehåll.

## Verifiering får aldrig bekräfta din egen tolkning
Skriv aldrig ett test där ditt antagande är godkänt-villkoret. Mät det
faktiska värdet och jämför mot vad Alex bett om — inte mot vad du tror
han menade. ("Gapet ska vara närmare" != "gapet ska vara 0px".)

Verifiera rätt komponent. Läs markupen och bekräfta att du mäter det
element Alex faktiskt pratar om innan du rapporterar ett resultat.

Säg aldrig "klart" utan mätvärde som visar det.

## Ändra bara det som efterfrågas
Rör inget utanför uppgiften — inte klasser, filer eller värden Alex inte
nämnt. Ser du något annat som borde fixas: nämn det, fixa det inte.

## Beskriv innan du bygger — konkret format
Innan du skriver kod för en ny sektion/komponent, lägg fram planen som en
innehållslista, inte en sammanfattande mening. Format:

  [klass] — exakt text/innehåll
  [klass] — exakt text/innehåll
  ...

Aldrig "body med de tre inledande raderna, principerna, avslutat med
statement" — det är otydligt vilken rad som får vilken klass. Istället:

  .eyebrow — "Idag"
  .body    — "Arbetet fortsätter." / "Jag använder inte ett system..." / "..."
  .statement (x6) — "Se vad som är sant." / "Behåll perspektivet." / ...
  .statement — "Det finns alltid en nästa situation."

Vänta på godkännande av listan innan du bygger.

## Redan besvarade frågor
Innan du ställer en fråga, kolla om jag redan svarat på den tidigare i
sessionen. Om jag har: agera på det svaret, fråga inte igen. Om du är
osäker om ett tidigare svar fortfarande gäller, säg det explicit
("du sa X tidigare — gäller det fortfarande?") istället för att fråga
om från noll som om inget svar givits.

## Verifiering — aldrig bilder
Ta ALDRIG skärmdumpar. Verifiera med mätvärden i terminalen:
getBoundingClientRect, computed styles, DOM-struktur. Alex öppnar
sidan själv i browsern när han vill se den.

## Kortfattat — obligatoriskt, skärpt version
Max 3-4 rader text per steg. Inga långa förklaringar, ingen kod inline
i svaret om jag inte ber om det. Format:
- Vad du gjorde (1 rad)
- Mätvärden om relevant
- En kort fråga om nästa steg, om relevant
Om du behöver förklara mer, fråga "vill du ha detaljerna?" istället
för att skriva ut dem.
