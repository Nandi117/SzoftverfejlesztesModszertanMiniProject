
## Blog webapplikáció követelmény specifikáció
### Jelenlegi helyzet


### Igényelt rendszer


### Jelenlegi üzleti folyamatok





### Igényelt üzleti folyamatok
**Regisztráció**:
- Kötelező adatok megadása &rarr; Megadott adatok validálása &rarr; Új felhasználó felvétele a rendszerbe.

**Bejelentkezés**:
- Email cím és jelszó páros segítségével bejelentkezés egy már létező felhasználói fiókba.
- Adminisztrátori szerepkörben való belépés biztosítása

**Blogbejegyzések kezelése**:
- Blogbejegyzések megjelenítése időrendben
- Új blogbejegyzés létrehozása &rarr; Bejegyzés adatainak kitöltése &rarr; Bejegyzés adatainak mentése
- Meglévő blogbejegyzések módosítása &rarr; Szerkesztési felület biztosítása &rarr; Modósított bejegyzés adatainak mentése
- Meglévő blogbejegyzések törlése &rarr; Törlés megerősítése &rarr; Bejegyzése törlése


**Blogbejegyzések keresése**:
- Cím alapján blogbejegyzések keresése. &rarr; Keresési lehetőség &rarr; Keresési paraméter megadása &rarr; Keresés &rarr; Találatok megjelenítése

**Hozzászólások kezelése**:

- Adott blogbejegyzéshez tartozó hozzászólások megjelenítése időrendben
- Új hozzászólás írása &rarr; Tartalom megadása &rarr; Hozzászólás mentése az adott blogbejegyzéshez
- Meglévő hozzászólás törlése &rarr; Törlés megerősítése &rarr; Hozzászólás törlése



### Rendszerre vonatkozó szabályok
**Felhasználói autentikáció**: A felhasználók kétféle szerepkörben léphetnek be: adminisztrátor és normál felhasználó. A bejelentkezés email-cím és jelszó használatával történik, amely titkosítva kerül tárolásra az adatbázisban. 

**Biztonság**: Az adatátvitel minden esetben HTTPS protokollon keresztül történik. A felhasználói jelszavak erőssége ellenőrzésre kerül, minimálisan 8 karakter hosszú, betűket és számokat is tartalmazó jelszavak szükségesek.

**Adatmentés**: A rendszer heti rendszerességgel automatikus adatmentést készít az adatbázisról. Az adminisztrátor felületen keresztül a mentések visszaállítása is biztosított.
   
**Karbantarthatóság**: A kód moduláris felépítése lehetővé teszi új funkciók hozzáadását a meglévő funkciók módosítása nélkül.

### Követelménylista

### Funkcionális követelmények
1. A felhasználók regisztrálhatnak és bejelentkezhetnek az alkalmazásba.
2. A felhasználók blogbejegyzéseket hozhatnak létre, szerkeszthetnek és törölhetnek.
3. A felhasználók megtekinthetik más felhasználók blogbejegyzéseit.
4. A blogbejegyzésekhez hozzászólásokat fűzhetnek a felhasználók.
5. Az adminisztrátorok moderálhatják a hozzászólásokat és a blogbejegyzéseket.

### Nem-funkcionális követelmények
1. A rendszer maximálisan 2 másodpercen belül válaszol az oldalkérésekre.
2. A felhasználói felület reszponzív, minden eszközön optimálisan jelenik meg (asztali gép, mobil, tablet).
3. A rendszer naponta legfeljebb 5000 felhasználót tud egyidejűleg kiszolgálni.
4. A rendszer heti rendszerességgel automatikus mentést készít az adatbázisról.
5. A webalkalmazás folyamatosan frissül és biztonsági patcheket kap legalább negyedévente.

### Fogalomszótár