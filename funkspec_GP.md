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
