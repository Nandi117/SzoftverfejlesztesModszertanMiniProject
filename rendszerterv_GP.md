


## Rendszerterv - Blog webapplikáció 1.0.0 továbbfejlesztése


### 1. A rendszer célja
A blog webapplikáció 1.0.0 verziójának továbbfejlesztése a követelmény specifikációban meghatározott igények alapján. Az új funkciók célja a felhasználói élmény javítása, a közösségi interakciók ösztönzése, valamint a személyre szabott tevékenységkezelés és visszajelzés támogatása.

---

### 2. Üzleti igények és funkcionális követelmények
#### 2.1. Új funkciók
1. **Fordítási funkció**:
   - Blogbejegyzések magyar és angol nyelvre történő fordítása.
   - Nyelvi detektálás a dinamikus fordításhoz.
   - Fordítási eredmény kiemelt megjelenítése.

2. **Követési funkcionalitás**:
   - Felhasználók egymás követése.
   - Követési lista megtekintése.
   - Követések leállításának lehetősége.

3. **"Dislike" és "Superlike" funkciók**:
   - Negatív és kiemelten pozitív visszajelzések az egyes bejegyzésekhez.
   - Ezen visszajelzések tárolása és statisztikai feldolgozása.

4. **Tevékenységnapló**:
   - Felhasználói tevékenységek mentése és megjelenítése.
   - Tevékenységek láthatóságának szabályozása.

5. **Felhasználói profil továbbfejlesztése**:
   - Profilkép feltöltése és kezelése.
   - Jelszó módosítása.
   - Tetszetős, modern UI/UIX megoldások.

6. **Verzióinformáció megjelenítése**:
   - Az alkalmazás aktuális verzióinak és fejlesztési naplóinak megtekinthetősége.

---

### 3. Rendszerarchitektúra
#### 3.1. Alkalmazási rétegek
1. **Kliensoldal**:
   - Reszponzív, felhasználóbarát felület modern technológiák felhasználásával (React, Vue.js vagy Angular).
   - Az új funkciók API integrációjának biztosítása.

2. **Szerveroldal**:
   - Node.js vagy Python alapú REST API az új funkciók támogatására.
   - Feladat-specifikus végpontok fejlesztése.

3. **Adatbázis réteg**:
   - PostgreSQL vagy MongoDB.
   - Új táblák a követés, visszajelzések és tevékenységnapló tárolására.

#### 3.2. Integrációk
- **Fordítás**: Google Translate API vagy hasonló nyelvi fordítási megoldások.
- **Verziókövetés**: Git és GitHub repository a verziók nyomon követésére.

---

### 4. Adatmodell
#### 4.1. Új adattáblák
1. **Fordítások**:
   - `translation_id`, `blog_id`, `original_text`, `translated_text`, `target_language`, `created_at`.

2. **Követések**:
   - `follower_id`, `followed_id`, `follow_date`.

3. **Visszajelzések**:
   - `feedback_id`, `blog_id`, `user_id`, `feedback_type` (dislike/superlike), `created_at`.

4. **Tevékenységnapló**:
   - `activity_id`, `user_id`, `action_type`, `action_details`, `timestamp`.

5. **Felhasználói profil**:
   - `profile_picture_url`, `username`, `email`, `password_hash`, `created_at`.

---

### 5. Folyamatok leírása
#### 5.1. Blogfordítás folyamata
1. A felhasználó a "Fordítás" gombra kattint.
2. Az API hívást küld a fordítási szolgáltatás felé.
3. A fordítási eredmény megjelenik az oldalon.

#### 5.2. Követési folyamat
1. Felhasználói profil megtekintése.
2. "Követés" gomb aktiválása.
3. A kapcsolat rögzítése az adatbázisban.

#### 5.3. Visszajelzés folyamata
1. A felhasználó a "Dislike" vagy "Superlike" gombra kattint.
2. A visszajelzés mentése az adatbázisba.

#### 5.4. Tevékenységnapló működése
1. Minden művelet rögzítése az adatbázisban.
2. A tevékenységek megjelenítése egy dedikált oldalon.
3. Láthatósági beállítások kezelése.

---

### 6. UI/UX terv
#### 6.1. Fordítási funkció
- Fordítási gomb az egyes bejegyzéseknél.
- Az eredeti és fordított szöveg párhuzamos megjelenítése.

#### 6.2. Profilkezelés
- Tetszetős profiloldal modern dizájnnal.
- Egyszerű és intuitív kép- és jelszómódosítási funkciók.

#### 6.3. Visszajelzés gombok
- Jól látható "Dislike" és "Superlike" gombok minden blogbejegyzés mellett.

---

### 7. Rendszerintegráció
- Az új funkciók implementálása a meglévő rendszermag módosítása nélkül.
- A visszafelé kompatibilitás biztosítása a jelenlegi funkcionalitással.
