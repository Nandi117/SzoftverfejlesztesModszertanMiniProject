
## Követelmény specifikáció - Blog webapplikáció 1.0.0 továbbfejlesztése

### Jelenlegi helyzet
- Jelenleg a webapplikáció 1.0.0-ás verziója került átadásra, amely sikeresen végbement
- A tervezés folyamatában Agi-Kanbant használva követjük a megoldandó feladatokat.
- Verziókövetésre továbbra is git-et használunk amit egy közös gitHub repository használatával oldunk meg.

***

### Igényelt rendszer továbbfejlesztése
- Blogbejegyzések fordítása: magyar nyelvre, esetlegesen nyelvi detektálás segítségével dinamikusan
a nyelvek nagyobb halmazát magyarra illetve angolra fordítása.
- Követési funkcionalitás: az egyes felhasználók követhetnek, más felhasználókat, amelyeknek a posztjait megnézhetik,
véleményezhetik, visszajelzéseket küldhetnek nekik.
Követési lista megtekintése, követések leállítása is felmerült igényként.
- "Dislike" és "Superlike" az egyes blogbejegyzések esetében: A felhasználóknak tudniuk kell negatív és nagyon pozitív visszajelzéseket is küldeni
az egyes blogbejegyzések esetében.
- Tevékenység napló: A bejelentkezett felhasználó számára biztosítani kell egy olyan felületet, ahol a vissza tudja követni a tevékenységeit.
Ez magában foglalja a tevekénység láthatóságának korlátozást is. 
- Verzió információ: Az összes verziókiadáshoz tartozó aktuális információk megjelenítése az oldalon
- Felhasználói profil továbbfejlesztése: Profilklo feltöltése, jelszó megváltoztatása, UI/UIX szempontból vonzó adatmegjelenítés


***

### Jelenlegi üzleti folyamatok
#### 1. Blogbejegyzések kezelése
* **Blogbjegyzések lekérdezése:** Saját és összes blogbejegyzések lekérdezése a felületen a sikeres bejelentkezés után
* **Blogbejegyzések létrehozása:** Új blogbejegyzés megírása a felületen -> Szerveren feldolgozás -> Mentés az adatbázisba
* **Blogbejegyzések módosítása:** Meglévő blogbejegyzés szerkesztése a felületen -> Szerveren feldolgozás -> Módosítás végrehajtása az adatbázisban (Csak saját bejegyzések)
* **Blogbejegyzések törlése:** Adott felhasználó csak a saját bejegyzéseit törölheti

#### 2. Kommentelés

* **Kommentek lekérdezése adott blogbejegyzéshez:** Bejegyzéseknél kommentszekció megnyitása -> Kommentek lekérdezése az adatbázisból az adott bejegyzéshez
* **Komment írása adott blogbejegyzéshez:** Bejegyzéseknél kommentszekció megnyitása -> Új komment írása -> Mentés az adatbázisba
* **Komment törlése adott blogbejegyzésnél:** Bejegyzéseknél kommentszekció megnyitása -> Komment törlése az adatbázisból (Csak saját komment)

* Saját bejegyzéseknél a létrehozó törölhet bármilyen kommentet

#### 3. Felhasználók kezelése
**Regisztráció:**
* Email cím, felhasználónév, jelszó megadása
* Új fejhasználó mentése a rendszerbe
* Sikeres regisztráció után automatikus bejelentkeztetés

**Bejelentkezés:**
* Email cím és jelszó megadása
* Szerver oldali hitelesítés
  * Sikeres hitelesítés: navigálása a saját bejegyzések oldalra
  * Sikertelen hiteletés: bejelentkezés megtagadása, hibaüzenet megjelenítése


***

### Igényelt üzleti folyamatok
* Blogbejegyzések fordítása: Fordító gomb megnyomása -> Fordítás a kívánt nyelvre -> Fordítás eredményének kiemelése és megmutatása
* Követés: Felhasználói profilok megtekintése -> Követés gomb -> Követési listában láthatóvá válik a felhasználó és látni lehet a bejegyzéseit
* Visszajelzések: "Dislike" és "Superlike" gombok -> Bejegyzésehez tárolni kell a nem tetszik és nagyon tetszik értékeket egy adott bejegyzéshez
* Tevékenység napló: Minden felhasználói tevékenységet menteni kell az adatbázisban -> Tevékenység naplónál megjeleníteni -> Elrejtés és lekérdezése funkcionalitás
* Felhasználó profil:
  * Profilkép feltöltése és módosítása -> Perzistens tárolás
  * Jelszó megváltoztása: Új jelszó megadása -> Jelszó módosítása az adatbázisban
  * Felhasználói adatok tetszetős megjelenítése -> UI/UIX



### Rendszerre vonatkozó szabályok



### Fogalomszótár