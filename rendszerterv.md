# Adatbázis Terv



# Funkcionális Terv



# Tesztterv



# Fizikai Környezet



# Architekturális Terv

## 1. Biztonsági Funkciók

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

## 2. Rendszer bővíthetősége

### 2.1. Moduláris felépítés
- A rendszer tervezése során elsődleges szempont a moduláris felépítés biztosítása. Minden funkcionális egység külön modulban kap helyet, ezáltal új funkciók egyszerűen hozzáadhatók a meglévő struktúrához anélkül, hogy a rendszer többi része sérülne.
- A modulok közötti kommunikáció jól definiált API-kon keresztül történik, így a jövőbeni bővítések esetén csak az új modulokra vonatkozó interfészeket kell megváltoztatni, a meglévők érintetlenek maradhatnak.

### 2.2. Skálázhatóság
- A rendszer horizontálisan és vertikálisan is skálázható. A rendszer képes új szerverek hozzáadására terheléselosztóval, így a forgalom növekedésével további erőforrásokat tudunk biztosítani a megfelelő működéshez.
- Az adatbázisok replikációja és sharding technikák lehetővé teszik a nagy mennyiségű adat kezelését, valamint az olvasási és írási műveletek szétválasztását, ami növeli a teljesítményt és csökkenti a késleltetést.

### 2.3. Plugin rendszer
- A rendszerhez plugin-alapú bővítési lehetőséget biztosítunk, amely lehetővé teszi külső fejlesztők számára is a funkciók egyszerű hozzáadását. A pluginok előre definiált szabványokat követnek, ezáltal könnyen integrálhatók és frissíthetők.

### 2.4. Microservices architektúra
- A rendszer egy microservices architektúrán alapul, amely lehetővé teszi, hogy az egyes szolgáltatások különálló komponensként működjenek. Így a fejlesztők könnyedén hozzáadhatnak új szolgáltatásokat anélkül, hogy a meglévő szolgáltatások működését befolyásolnák.
- Az egyes szolgáltatások külön-külön skálázhatók és frissíthetők, ami biztosítja a rendszer rugalmasságát és könnyű bővíthetőségét.

## 3. Fejlesztői eszközök

### 3.1. Verziókezelés - Git
- A projekt verziókövetését a Git rendszerrel végezzük. A forráskód tárolása és kezelése egy GitHub repository-ban történik, amely támogatja a kollaboratív fejlesztést és a visszagörgetési lehetőségeket.
- Branching modell: a fejlesztők külön brancheken dolgoznak, majd a véglegesítést pull requestekkel oldják meg. A `main` ág stabil, release-re kész kódot tartalmaz.

### 3.2. Fejlesztési környezet - IDE és kódszerkesztők
- Javasolt IDE: **Visual Studio Code**, amely gazdag bővítmény támogatással rendelkezik, mint például a Git integráció, valamint a nyelvi szerkesztő bővítmények (HTML, CSS, JavaScript).
- Egyéb javasolt fejlesztői eszközök: **IntelliJ IDEA**, **WebStorm** a JavaScript és webes fejlesztésekhez, valamint **PyCharm** a Python fejlesztéshez.

### 3.3. Konténerizálás - Docker
- A fejlesztési környezet egységesítéséhez és a deploy folyamatok egyszerűsítéséhez a Docker konténerizálási megoldást alkalmazzuk. Minden fejlesztői környezet azonos Docker image-t használ, így biztosítva a konzisztens futtatási környezetet.
- A Docker Compose segítségével több szolgáltatás (pl. web szerver, adatbázis) egyszerre futtatható, szinkronban a helyi fejlesztői környezettel.

### 3.4. CI/CD pipeline - GitHub Actions
- A folyamatos integráció és folyamatos szállítás (CI/CD) folyamatokat a **GitHub Actions** platform biztosítja. Minden commit és pull request automatikusan építési és tesztelési folyamatokon megy keresztül, amely biztosítja, hogy a kód mindig stabil állapotban maradjon.
- Az automatikus tesztelés és kódminőség-ellenőrzés (pl. linting, statikus kódelemzés) be van állítva a build pipeline-ba.

### 3.5. Tesztelési keretrendszer
- Az egységtesztek futtatásához a **Jest** keretrendszert használjuk (JavaScript), míg backend oldalon **Pytest** (Python) kerül alkalmazásra.
- Minden új funkcióhoz kötelező a megfelelő teszt lefedettség, amely biztosítja a kód helyes működését és a regressziók elkerülését.

### 3.6. Hibajegy- és feladatkezelő eszköz - Jira
- A feladatok követését és priorizálását a **Jira** rendszer végzi. Itt minden feladat jól nyomon követhető, a felhasználói sztorik, hibajegyek és fejlesztési backlogok rendszerezésre kerülnek.
- A sprinttervezéshez és a hatékonyság követéséhez Scrum-alapú táblák állnak rendelkezésre.

### 3.7. Kódminőség-ellenőrzés - ESLint és Prettier
- A JavaScript és TypeScript kódok formázását és ellenőrzését az **ESLint** és **Prettier** eszközökkel végezzük. Ez biztosítja az egységes kódstílust és a lehetséges hibák gyors felismerését a fejlesztés korai szakaszában.
- Ezek a fejlesztői eszközök automatikusan futnak minden commit során, így biztosítva a kód tisztaságát.

### 3.8. Verziókezelési szabályok
- Minden commit üzenet és branch név követi az egységes nevezéktant. A commit üzeneteknek egyértelműnek és informatívnak kell lenniük, míg a branchek neveinek utalniuk kell a kapcsolódó feladatra (pl. `feat/login-page`).
- Minden kódrészlet átmegy code review-n, amit egy másik fejlesztő validál.
