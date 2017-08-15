# SaltbaeProjekt


## Schritte zum lokalen Start der Applikation

1. Das Projekt klonen:

```sh
git clone https://github.com/annemodd/SaltbaeProjekt.git
```

2. In das Verzeichnis wechseln und dann alle Module installieren:

```
cd SaltbaeProjekt

npm install

# Starten der Applikation:

DB_PORT=<PORT-DER-DATENBANK> node server.js
```

3. Die Applikation anschließend im Browser über http://localhost:8080 aufrufen.

**Wichtig:** Via Docker (z. B. über [Kitematic](https://kitematic.com/)) eine Instanz der Datenbank `MongoDB` hochfahren.
