
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

---

### Rendszerre vonatkozó szabályok

- Minden új funkció a jelenlegi rendszerbe integrálva kerül kifejlesztésre, kompatibilitást biztosítva a már meglévő funkciókkal.
- A nyelvi fordítás csak a bejelentkezett felhasználók számára érhető el.
- A követési funkció csak kölcsönös követés esetén küld értesítést.
- A tevékenységnapló adatait csak az adatvédelmi beállításoknak megfelelően lehet megjeleníteni más felhasználók számára.

---

### Fogalomszótár

- **Fordítás**: A blogbejegyzés tartalmának más nyelvre történő automatikus vagy manuális átalakítása, különböző nyelveken történő megjelenítése.
- **Követés**: Egy másik felhasználó tartalmainak (blogbejegyzések) rendszeres megtekintésének lehetősége, amely lehetővé teszi, hogy a felhasználók értesítéseket kapjanak az általuk követett személyek új bejegyzéseiről.
- **Superlike**: Egy kiemelten pozitív visszajelzés, amely egy blogbejegyzés iránti rendkívüli tetszést fejezi ki. A "Superlike" gomb megnyomásával a felhasználó a bejegyzést a legjobb tartalmak közé sorolja.
- **Dislike**: Egy negatív visszajelzés, amely lehetőséget ad a felhasználóknak arra, hogy kifejezzék nemtetszésüket egy adott bejegyzés iránt.
- **Tevékenységnapló**: A felhasználó által végzett összes művelet (például blogírás, kommentelés, kedvelés, követés) nyilvántartása, amely a felhasználó számára egy napló formájában elérhető, és amelyet a felhasználó láthatósági beállításokkal védhet.
- **Verzióinformáció**: A rendszer különböző verzióiban történt változások és új funkciók összefoglalása, amely megmutatja, hogy milyen fejlesztések történtek az egyes verziókban.
- **Felhasználói profil**: A felhasználó személyes adatainak összegyűjtése és tárolása, beleértve a profilképet, a felhasználói nevet, az e-mail címet és egyéb adatokat, amelyek a felhasználó számára elérhetők és módosíthatók.
- **Követési lista**: A felhasználó által követett más felhasználók listája, amely lehetővé teszi a felhasználó számára, hogy könnyen megtekinthesse a követett személyek legújabb bejegyzéseit.
- **UI/UX (User Interface / User Experience)**: A felhasználói felület és a felhasználói élmény kialakítása, amely az applikáció vizuális megjelenésére, navigációjára és a felhasználók által tapasztalt élményre vonatkozik.
- **Regisztráció**: A felhasználók új fiók létrehozása a rendszerben, amely során a felhasználó megadja személyes adatait, például az e-mail címét és jelszavát.
- **Bejelentkezés**: A felhasználók számára elérhető folyamat, amellyel hozzáférhetnek a saját fiókjukhoz az e-mail címük és a jelszavuk megadásával.
- **Profilkép**: A felhasználó által feltöltött személyes kép, amely a felhasználói profil részeként jelenik meg és vizuálisan reprezentálja őt a rendszerben.
- **Hozzászólás (Komment)**: A felhasználók által írt válaszok vagy visszajelzések, amelyek egy blogbejegyzéshez kapcsolódnak. A kommentek lehetővé teszik a párbeszédet és interakciót a felhasználók között.
- **Moderálás**: A rendszerben történő tartalom-ellenőrzés, amely biztosítja, hogy a felhasználói által feltöltött bejegyzések és kommentek megfeleljenek a közösségi irányelveknek.
- **Automatikus nyelvi detektálás**: A rendszer képessége arra, hogy felismerje a blogbejegyzések nyelvét és szükség esetén automatikusan fordítja azt a felhasználó preferenciái szerint.
- **Kategória**: A blogbejegyzések szervezésére szolgáló címkék vagy csoportosítási lehetőségek, amelyek segítenek a felhasználóknak könnyebben navigálni a különböző tartalmak között.