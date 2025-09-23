# Willkommen in meiner Abgabe für Webtech! 😊

Meine Webapplikation basiert auf dem MEAN-Stack (MongoDB, Express, Angular, Node.js).  
Die App ermöglicht es, Medien (Filme, Bücher und Serien) die man sich später ansehen möchte, abzuspeichern.
Medien können dabei angelegt, angesehen, verändert und gelöscht werden.

![Foto Startseite](<Foto Überblick.png>)
![Foto Hinzufügen](<Foto Hinzufügen.png>)


# Anleitung zur Installation des Projekts.

Benötigt: Node.js, Git, Angular (npm install -g @angular/cli)

## 1. Repository clonen
git init
git clone https://gitlab.rz.htw-berlin.de/Eileen.Al-Rubaiee/webtech.git

## 2. Öffnen von zwei Terminals
cd server
npx ts-node src/server.ts

![Screenshot Terminal](<Foto Backend.png>)


cd client 
ng serve -o

![Screenshot Terminal](<Foto Frontend.png>)

## 3. Datenbankhinweise
Für die Datenbank verwende ich MongoDB. Ich habe ein Cluster mit dem Benutzer user und dem Passwort eileen123 angelegt. Die Verbindung wird über die .env-Datei im Server-Ordner hergestellt:
ATLAS_URI=mongodb+srv://user:eileen123@cluster0.sj3dkym.mongodb.net/meanStackExample?retryWrites=true&w=majority

![MongoDB Compass](<Foto MongoDB Compass.png>)
Um einen besseren Überblick über meine Daten zu haben, habe ich MongoDB Compass heruntergeladen, eine grafische Benutzeroberfläche (GUI), mit der sich die Daten visuell anzeigen und bearbeiten lassen.


## 4. Hinweise zur Nutzung von KI
Für meine Webapp habe ich ein animiertes GIF als Hintergrund verwendet. Ich war mir zunächst unsicher, ob das Einfügen sich von einem normalen Bild unterscheidet. Mithilfe von ChatGPT habe ich eine Anleitung erstellt bekommen, wie man das GIF korrekt herunterlädt und einbindet.








