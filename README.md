Willkommen in meiner Abgabe für Webtech! 😊

Meine Webapplikation basiert auf dem MEAN-Stack (MongoDB, Express, Angular, Node.js).  
Die App ermöglicht es, Medien (Filme, Bücher und Serien) die man sich später ansehen möchte, abzuspeichern.
Medien können dabei angelegt, angesehen, verändert und gelöscht werden.

![Foto](<Bildschirmfoto 2025-09-23 um 14.37.12.png>)
![Foto2](<Bildschirmfoto 2025-09-23 um 14.38.03.png>)


Anleitung um das Projekt lokal zu installieren:

Benötigt: Node.js, Git, Angular (npm install -g @angular/cli)

1. Repository clonen
git init
git clone https://gitlab.rz.htw-berlin.de/Eileen.Al-Rubaiee/webtech.git

2. Öffnen von zwei Terminals
cd server
npx ts-node src/server.ts
![Foto 2](<Screenshot 1.png>)

cd client 
ng serve -o
![alt text](<Bildschirmfoto 2025-09-23 um 13.29.54.png>)

3. Datenbankhinweise
Wie schon angemerkt benutze ich MongoDB als Datenbank. 
Ich habe ein Cluster angelegt mit dem User: user und dem Passwort: eileen123.
In der Datei .env im Ordner server wird  dies initialisiert. ( ATLAS_URI=mongodb+srv://user:eileen123@cluster0.sj3dkym.mongodb.net/meanStackExample?retryWrites=true&w=majority) 
Um einen besseren Überblick zu haben habe ich MongoDB Compass heruntergeladen, welches als grafische Benutzoberfläche (GUI), welches es mir ermöglicht, meine Daten visuell anzusehen und zu bearbeiten.


4. Hinweise zur Nutzung von KI
Ich habe in meiner Webapp ein GIF als Hintergrund benutzt, wusste aber nicht inwiefern die Implementation groß von der eines normalen Bildes anders ist. Durch ChatGPT habe ich eine Anleitung generieren lassen, wie sowohl das Herunterladen als auch das Einfügen funktioniert. 








