# Rendszerterv


## Adatbázis Terv



## Funkcionális Terv



## Tesztterv



## Fizikai Környezet



## Architekturális Terv

## Biztonsági Funkciók

### 1.1. Autentikáció és jogosultságkezelés
- A felhasználók jelszavait **bcrypt** algoritmussal titkosítjuk az adatbázisban. Az algoritmus biztonságos, mivel sót (salt) használ, amely megnehezíti a brute-force támadásokat. Az algoritmus több körös hash-elést alkalmaz.
- A felhasználóknak erős jelszót kell megadniuk (legalább 8 karakter hosszú, tartalmaz számokat és speciális karaktereket), ami minimalizálja a gyenge jelszavak miatti támadási lehetőségeket.
- Az adminisztrátorok számára elérhető a kétfaktoros hitelesítés (2FA), amely megerősíti az autentikációt egy másodlagos hitelesítési lépés (pl. mobilalkalmazás vagy SMS-kód) használatával.

### 1.2. HTTPS használata
- A rendszer minden adatátvitelét **HTTPS** protokollon keresztül bonyolítja, amely garantálja, hogy az adatok titkosítva kerülnek továbbításra. Ez megakadályozza, hogy a felhasználói adatokat harmadik felek hozzáférjék, védi a **man-in-the-middle** támadások ellen.
- Az SSL/TLS tanúsítvány telepítése és frissítése folyamatosan biztosítja a biztonságos adatkapcsolatot.

### 1.3. Hozzáférési szintek
- A rendszer különböző jogosultsági szinteket biztosít a felhasználók számára. Az adminisztrátori jogosultságokkal rendelkező felhasználók hozzáférhetnek speciális funkciókhoz, mint például a felhasználók kezeléséhez és a tartalmak moderálásához.
- A normál felhasználók csak a saját tartalmukhoz és adataikhoz férnek hozzá, ezáltal biztosítva, hogy ne módosíthassák mások tartalmait.

### 1.4. Adatmentés és visszaállítás
- A rendszer **heti** rendszerességgel biztonsági mentést készít az adatbázisról. Ezek a mentések titkosított formában kerülnek tárolásra, biztosítva a jogosulatlan hozzáférés elleni védelmet.
- A mentések automatikusan készülnek, és egy külön szerveren kerülnek tárolásra, amely fizikailag és logikailag is elkülönül a fő rendszertől. Ez biztosítja, hogy kritikus hiba vagy adatvesztés esetén a rendszer visszaállítható legyen.

### 1.5. Adathozzáférés korlátozása
- Az adatbázis hozzáférése szigorúan korlátozott. Csak az adminisztrátorok férhetnek hozzá közvetlenül az adatbázishoz, és minden hozzáférési kísérletet naplózunk.
- A hozzáférési szabályzat biztosítja, hogy minden felhasználói adatot csak az arra jogosult személyek módosíthatnak.

### 1.6. Behatolás-észlelés
- A rendszer rendelkezik beépített **behatolás-észlelő rendszerrel (IDS)**, amely folyamatosan figyeli a bejövő forgalmat és figyelmeztet a gyanús tevékenységekre.
- A naplózott eseményeket folyamatosan elemzi a rendszer, és minden esetleges támadási kísérlet esetén automatikus értesítést küld az adminisztrátoroknak.