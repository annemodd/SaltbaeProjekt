# SaltbaeProjekt


## Schritte zum lokalen Start der Applikation

1. Das Projekt klonen:

```sh
git clone https://github.com/annemodd/SaltbaeProjekt.git
```

2. In das Verzeichnis wechseln und dann alle Module installieren:

```
cd SaltbaeProjekt

git checkout develop

npm install

# Starten der Applikation:

DB_PORT=<PORT-DER-DATENBANK> node server.js
```

3. Die Applikation  starten anschließend im Browser über http://localhost:8080 aufrufen.

**Wichtig:** Via Docker (z. B. über [Kitematic](https://kitematic.com/)) eine Instanz der Datenbank `MongoDB` hochfahren.



## Die Applikation online aufrufen

Besuche unsere Webseite #me über den folgenden Link https://saltbaeprojekt.now.sh . Auf der deployten Seite funktioniert der Upload von Bildern nicht wegen Zugriffsrechten nicht.

Auf fbdeveloper kann man nur eine Url  hinterlegen. Momentan ist die  https://saltbaeprojekt.now.sh
 angegeben. Möchtest du im develop den localhost benutzen, wende dich bitte an @Olga.
Die Dokumentation und die Präsentation befinden sich nur im develop Branch.


