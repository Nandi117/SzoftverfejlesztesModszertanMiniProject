
## Blog webapplikáció követelmény specifikáció
### Jelenlegi helyzet


### Igényelt rendszer


### Jelenlegi üzleti folyamatok


### Igényelt üzleti folyamatok


### Rendszerre vonatkozó szabályok
**Felhasználói autentikáció**: A felhasználók kétféle szerepkörben léphetnek be: adminisztrátor és normál felhasználó. A bejelentkezés email-cím és jelszó használatával történik, amely titkosítva kerül tárolásra az adatbázisban. 

**Biztonság**: Az adatátvitel minden esetben HTTPS protokollon keresztül történik. A felhasználói jelszavak erőssége ellenőrzésre kerül, minimálisan 8 karakter hosszú, betűket és számokat is tartalmazó jelszavak szükségesek.

**Adatmentés**: A rendszer heti rendszerességgel automatikus adatmentést készít az adatbázisról. Az adminisztrátor felületen keresztül a mentések visszaállítása is biztosított.
   
**Karbantarthatóság**: A kód moduláris felépítése lehetővé teszi új funkciók hozzáadását a meglévő funkciók módosítása nélkül.

### Követelménylista



### Fogalomszótár