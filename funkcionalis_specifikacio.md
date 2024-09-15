
## Blog webapplikáció funkcionális specifikáció

## 1. Regisztráció és bejelentkezés
- **Leírás**: A felhasználók regisztrálhatnak egy új fiókot, és bejelentkezhetnek a meglévő fiókjukkal.
- **Folyamat**:
  1. A felhasználó megadja az email címét, felhasználónevét és jelszavát.
  2. A rendszer ellenőrzi az email cím egyediségét és a jelszó erősségét.
  3. Sikeres regisztráció után emailes visszaigazolás történik.
  4. Bejelentkezés esetén a rendszer ellenőrzi a felhasználó adatait.

## 2. Blogbejegyzés létrehozása
- **Leírás**: A felhasználók új blogbejegyzéseket hozhatnak létre.
- **Folyamat**:
  1. A felhasználó a „Új blogbejegyzés” gombra kattintva elérheti a létrehozási felületet.
  2. A cím, tartalom és kategória megadása után a blogbejegyzés közzétételre kerül.
  3. A bejegyzés szerkeszthető vagy törölhető.

## 3. Bejegyzések megtekintése
- **Leírás**: A felhasználók böngészhetnek mások által létrehozott blogbejegyzések között.
- **Folyamat**:
  1. A főoldalon megjelennek a legújabb és legnépszerűbb bejegyzések.
  2. A felhasználó egy bejegyzésre kattintva elérheti annak tartalmát.

## 4. Blogbejegyzés törlése
- **Leírás**: A felhasználó törölheti saját blogbejegyzéseit.
- **Folyamat**:
  1. Saját blogbejegyzések esetében megjelenik az egyes kártya elemeken a törlés gomb.
  2. Törlés gombra kattintva ugorjon fel egy megerősítés, hogy biztosan törölni szeretné-e a blogbejegyzést a felhasználó.
  3. Törlés megerősítése:
     4. **Mégse**: Bezárja a felugró ablakot, törlés művelet megszakítása.
     5. **Igen**: Törli az adott blogbejegyzést.

- **Jogosultságok**:
- 1. A felhasználók csak saját blogbejegyzéseiket törölhetik, mások bejegyzéseire csak megtekintése joguk van.
- 2. A rendszer minden törlési művelet előtt ellenőrzi, hogy az adott felhasználónak van e joga végrehajtani az operációt.


## 5. Blogbjegyzés szerkesztése
- **Leírás**: A felhasználó szerkesztheti saját blogbejegyzéseit.
- **Folyamat**:
  1. Saját blogbejegyzések esetében megjelenik az egyes kártya elemeken a szerkesztés gomb.
  2. A szerkesztés gombra kattintva az adott blogbejegyzés szerkeszthetővé válik.
  3. Szerkeszthető komponensek:
  
  | Kompenens | Szerkeszthető |
  |-----------|---------------|
  | Cím       | Igen          |
  | Tartalom  | Igen          |
  | Kategória | Igen          |

  4. A módosítások mentésére megjelenik a "Mentés" gomb.
  5. A mentés gombra kattintva az adott blogbejegyzés móodsításra kerül.

- **Jogosultságok**:
  1. A felhasználók csak saját blogbejegyzéseiket módosíthatják, mások bejegyzéseire csak megtekintése joguk van.
  2. A rendszer minden módosítási művelet előtt ellenőrzi, hogy az adott felhasználónak van e joga végrehajtani az operációt
        