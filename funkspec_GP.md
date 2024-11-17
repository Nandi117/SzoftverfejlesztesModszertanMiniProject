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