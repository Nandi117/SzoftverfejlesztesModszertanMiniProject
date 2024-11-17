## Funkcionális specifikáció - Blog webapplikáció 1.0.0 továbbfejlesztése

## 1. Új funkciók listája
A blog webapplikáció 2.0.0 verziója az alábbi új funkciókat tartalmazza:

1. Blogbejegyzések fordítása.
2. Felhasználók közötti követési funkcionalitás.
3. Visszajelzési lehetőség a blogbejegyzésekhez ("Dislike" és "Superlike").
4. Tevékenységnapló megtekintése és kezelése.
5. Felhasználói profilok továbbfejlesztése:
   - Profilkép feltöltése és módosítása.
   - Jelszó megváltoztatása.
6. Verzióinformációk megjelenítése.

---

## 2. Új funkciók részletes specifikációja

### 2.1. Blogbejegyzések fordítása
- **Leírás**: A felhasználók fordíthatják a blogbejegyzéseket magyar és angol nyelvre, nyelvi detektálás segítségével.
- **Folyamat**:
  1. A felhasználó egy blogbejegyzésnél rákattint a "Fordítás" gombra.
  2. A rendszer detektálja a blogbejegyzés eredeti nyelvét.
  3. A kiválasztott célnyelvre történik a fordítás, amelyet egy API-val hajt végre a rendszer.
  4. A fordítás eredménye megjelenik a blogbejegyzés alatt.
- **Korlátozások**:
  - Csak a támogatott nyelvek között történhet a fordítás.
  - A fordítás minősége az API által biztosított eredmény függvénye.

---

### 2.2. Követési funkcionalitás
- **Leírás**: A felhasználók más felhasználókat követhetnek, és láthatják az általuk létrehozott tartalmakat.
- **Folyamat**:
  1. A felhasználó megnyit egy másik felhasználói profilt, ahol megjelenik a "Követés" gomb.
  2. A gomb megnyomásával a rendszer rögzíti a kapcsolatot az adatbázisban.
  3. A felhasználók megtekinthetik a követési listájukat, és egy "Leállítás" gombbal megszüntethetik a kapcsolatot.
- **Jogosultságok**:
  - A felhasználók csak saját követési listájukat kezelhetik.
  
  ---

### 2.3. Visszajelzési funkciók (Dislike és Superlike)
- **Leírás**: A blogbejegyzésekhez a felhasználók pozitív ("Superlike") vagy negatív ("Dislike") visszajelzést adhatnak.
- **Folyamat**:
  1. A blogbejegyzéseknél két új gomb jelenik meg: "Dislike" és "Superlike".
  2. A felhasználó kattintásával a visszajelzés rögzítésre kerül az adatbázisban.
  3. A rendszer összesíti a visszajelzéseket, és megjeleníti az egyes bejegyzéseknél.
- **Korlátozások**:
  - Egy felhasználó egy blogbejegyzéshez csak egy típusú visszajelzést adhat.

---

### 2.4. Tevékenységnapló
- **Leírás**: A felhasználók tevékenységeinek követése és megjelenítése.
- **Folyamat**:
  1. Minden felhasználói művelet rögzítésre kerül az adatbázisban.
  2. A "Tevékenységnapló" menüpontra kattintva a felhasználó megtekintheti saját tevékenységeit időrendi sorrendben.
  3. A felhasználók szabályozhatják, hogy mely tevékenységek legyenek láthatóak.
- **Adattípusok**:
  - Blogbejegyzések létrehozása, szerkesztése, törlése.
  - Követési kapcsolatok létrehozása és megszüntetése.
  - Visszajelzések adása.
  
  ---

### 2.5. Felhasználói profil továbbfejlesztése
- **Leírás**: A felhasználók profiloldala új funkciókkal bővül, és esztétikusabb megjelenést kap.
- **Funkciók**:
  - Profilkép feltöltése és cseréje.
  - Jelszó módosítása.
  - Felhasználói adatok modern és letisztult megjelenítése.
- **Folyamat**:
  1. A profiloldalon megjelenik egy "Profilkép módosítása" gomb.
  2. A felhasználó egy fájlt tölthet fel, amelyet a rendszer elment és megjelenít.
  3. Jelszó módosítása során a régi jelszó megadása szükséges az új jelszó érvényesítéséhez.

---

### 2.6. Verzióinformációk megjelenítése
- **Leírás**: A felhasználók megtekinthetik a rendszer verzióit és a hozzájuk tartozó fejlesztési naplókat.
- **Folyamat**:
  1. A főoldalon egy "Verzióinformációk" szekció található.
  2. A szekció tartalmazza a verziószámot, a kiadás dátumát, és a főbb változásokat.
- **Korlátozások**:
  - Csak a publikus verziók információi jelennek meg.

---