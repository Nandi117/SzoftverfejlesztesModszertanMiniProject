# Adatbázis Terv
## 1. Áttekintés
A blog webalkalmazás lehetővé teszi a felhasználók számára blogbejegyzések létrehozását, olvasását, frissítését és törlését, valamint kommentek hozzáadását az egyes bejegyzésekhez.
## 2. Adatbázis típus
A projekthez relációs adatbázist (pl. MySQL, PostgreSQL) használunk, mivel ez jól alkalmazható strukturált adatok kezelésére, meghatározott kapcsolatokkal. Alternatívaként egy NoSQL adatbázis (pl. MongoDB) is fontolóra vehető, ha az alkalmazásnak skálázódnia kell
## 3. Entitások és Táblák

### 3.1 Users

A `Users` tábla az összes regisztrált felhasználót fogja tárolni, beleértve a profiljukhoz tartozó adatokat.

#### Mezők:
- `user_id` (Elsődleges kulcs)
- `username` (Egyedi)
- `email` (Egyedi)
- `password_hash`
- `bio`
- `profile_picture_url`
- `created_at` (Dátum)

#### Kapcsolatok:
- Egy felhasználó több blogbejegyzést hozhat létre.
- Egy felhasználó több bejegyzést is kedvelhet.
- Egy felhasználó több bejegyzéshez is hozzászólhat.
- Egy felhasználó követhet más felhasználókat (önhivatkozó kapcsolat).

### 3.2 BlogPosts

A `BlogPosts` tábla a felhasználók által létrehozott blogbejegyzések részleteit tárolja.

#### Mezők:
- `post_id` (Elsődleges kulcs)
- `user_id` (Külső kulcs hivatkozva a `Users` táblára)
- `title`
- `content`
- `image_url`
- `created_at` (Dátum)
- `updated_at` (Dátum)

#### Kapcsolatok:
- Egy bejegyzéshez több komment is tartozhat.
- Egy bejegyzést több felhasználó is kedvelhet.

### 3.3 Comments

A `Comments` tábla a blogbejegyzésekhez fűzött felhasználói kommenteket tárolja.

#### Mezők:
- `comment_id` (Elsődleges kulcs)
- `post_id` (Külső kulcs hivatkozva a `BlogPosts` táblára)
- `user_id` (Külső kulcs hivatkozva a `Users` táblára)
- `content`
- `created_at` (Dátum)

#### Kapcsolatok:
- Egy komment egy blogbejegyzéshez kapcsolódik.
- Egy komment egy felhasználóhoz kapcsolódik.




# Funkcionális Terv



# Tesztterv



# Fizikai Környezet




## 2. Architekturális Terv
A rendszer architektúráját ismertető fejezet. A rendszer felépítését ismerteti architektúrális szinten.
### 2.1 Áttekintés
A rendszer architektúráját tekintve három fő komponensről beszélhetünk:
* Felhasználói felület (User Interface)
* API (Application Programming Interface)
* Adatbázis

Az egyes komponensek további részegységekre lesznek bonthatók, melyeknek feladatait, jelentőségét lenteebb 
részletesebben áttekintjük.
#### 2.1.1 Architektúrális diagramm:
![alt text](assets/arch_overview.drawio.png)

### 2.2 Rétegek és felelősségek áttekintése
### 2.2.1 Prezentációs réteg (Felhasználó felület - User Interface)
- Interaktív kapcsolatot tart felhasználó és a rendszer között
- Kizárólag adatok felvitelének, módosításának és a lekérdezett adatok megjelenítésenek szolgáltat interaktív felhasználói felületet
- Reszponzivitás biztosítása annak érdekében, hogy többfajta eszközön is megfelelő interaktív felületet biztosítson a felhasznááló számára

### 2.2.2 API réteg
- Meghatározott formátumú beérkező kérések fogadása és kezelése, adatok továbbítása az üzleti logikáért felelős réteg felé
- Válaszok formázása a kérést küldő alkalmazása számára
- Hitelesítés és jogosultság kezelés: ellenőrzi hogy az adott jogosultsággal a műveletet végre lehet e hajtani vagy sem
- **Fő komponensek**:
  - Felhasználó kezelés végpontok
  - Blogok kezelése végpontok
  - Hozzászólások kezelése végpontok
- Az egyes komponensek definiálják a négy alapműveletet (CRUD), emellett tetszőlegesen kibővíthetőek
- Az adatovábbítással járó műveletekhez adattranszfer objektumok használata
- A kérésekben elküldött adatok formátuma JSON

### 2.2.3 Üzleti logikáért felelős réteg (Business Logic Layer - BLL )
- Üzleti szabályok megvalósítása és betartása
- **API** illetve **Adathozzáférési rétegből** származó adatok feldolgozása, ez magában hordozza az adatok érvényesítését, átalakítását
- Komplex üzleti folyamatok kezelése és megvalósítása
- Döntések meghozatala a beérkező adatok alapján
- Esetleges számítások elvégzése a beérkező adatok alapján
- Egyéb szolgáltatások nyújtása:
  - Értesítés kezelése és küldése
  - Integráció más rendszerekkel

- **Fő komponensek**: 
  - Felhasználó kezelés üzleti réteg
  - Blogbejegyzések kezelése üzleti réteg
  - Hozzászólások kezelése üzleti
  - **Kommunikáció**:
    - Minden réteg interfészen kereesztül kommunikál az egyéb réteggekkel


### 2.2.4 Adathozzáférési réteg (Data Access Layer - DAL)
Az alkalmazás és az adatbázis közötti kommunikációért felelős réteg
- Kapcsolatot tart az **Adatbázis** illetve az **Üzleti logikáért** felelős réteg között
- Adatok lekérdezése az adatbázisból
  - Az alkalmazás kérésére lekérdezi az adatok az adatbázisból a kapott paraméterek függvényében
- Adatok módosítása az adatbázisban
  - Az alkalmazás kérésére módosítja az adatokat a kapott új adatok alapján 
- Adatok mentése az adatbázisba
  - Az alkalmazás kérésére menti a kapott adatokat az adatbázisba 
- Adatok törlése az adatbázisból
  - Az alkalmazás kérésére törli az adatokat az adátbázisból - **Logikai törlés**
- Adatok érvényesítése
  - Ellenőrzi, hogy az adatok megfelelnek-e az adatbázisban érvényes korlátozásoknak
- Adatbázis-függetlenség biztosítása


### 2.2.5 Adatbázis réteg
- Adatok tárolása
  - Az alkalmazás összes adatát struktúráltan tárolja
- Adatvédelem
  - Adatok biztonságának biztosítása, illektéktelen hozzáférések megakadályozása
  - Adatok elvesztésének megakadályozása
- Adat integritás
  - Adatok konzisztenciájának és pontosságának fenntartása
- Adatlekérdezés
  - Lehetővé teszi az adatok gyors és hatékony lekérdezését


### 2.2.6 Szerver oldali rétegek felépítése és rétegek közötti kapcsolatok:
![alt text](assets/server_layers.drawio.png)


### 2.3 Technológiai áttekintés
Alkalmazandó technológiák és jelentőségüknek áttikentése

- #### 1. Felhasználói felület technológiák
    - **React**:
        - Össszetett felhasználói felületek létrehozására alkalmas nyílt Javascript könyvtár
        - Dinamikus felületek létrehozása
        - Modularitást és újrafelhasználhatóságot biztosít
    - **Redux**:
        - Állapotkezelés: Központi tároló hely biztosítása az alkalmazása teljes állapotának tárolására
        - Komponensek közötti kommunikáció: Adatok egyszerű átadása és elérhetőség biztosítása más komponsek számára
        - Tesztelhetőség: Elősegíti az alkalmazás egyes részeinek tesztelését
    - **Tailwind**:
        - Utility-first CSS keretrendszer
        - Beépített és testreszabható komponensek
        - Gyors fejlesztés
        - Rugalmasság

- #### 2. Szerver oldali technológiák
    - **Express.js**: 
      - Minimalista és rugalmas Node.js keretrendszer
      - Nagy teljesítmény
      - Rugalmasság

- #### 3. Adatbázis technológiák
  - **MongoDB**:
    - Nyilt forráskódú, NoSQL adatbázis, amelyet a rugalmassága és a dokumentum-orientált adatszerkezet miatt széles körben alkalmaznak
    - Hagyományos relációs adatbázisoktól eltérően nem táblákban hanem dokumentumokban tárolja az adatokat, amelyek JSON szerű objektumok
    - Egyszerű integrálhatóság Javascript alapú technológiákhoz
    - Nagy teljesítmény
    - Skálázhatóság: Könnyen skálázható


### 2.4 Függőségek
A rendszer függőséiget és azok elmaradása esetén lehetséges következmények bemutatása.

| Függőség             | Cél                                         | Megjegyzés                                                                 | Elmaradás esetén következmények |
|----------------------|---------------------------------------------|----------------------------------------------------------------------------|---------------------------------|
| **react**            | Felhasználói felület létrehozása            | Megbízható, gyors Javascript könyvtár UI-k építéséhez.                     | Az alkalmazásnak nem lesz interaktív felhasználói felülete.|
| **redux**            | Állapotkezelés                              | A React alkalmazások állapotának kezelésére szolgál.                       |  Az alkalmazás állapota nem lesz centralizáltan kezelve, ami bonyolulttá teheti a fejlesztést.|
| **react-router-dom** | Útvonalak kezelése                          | A React alkalmazásokban az oldalak közötti navigációt teszi lehetővé.      | Az alkalmazás különböző oldalakra nem lesz navigálható.|
| **tailwind**         | Vonzó felhasználói felület, reszponnzív oldalak kialakítása | X | A felhasználó felület nem lesz reszponzív és vonnzó, viszont natúr CSS technológia segítségével ez pótolható nagyobb energia befektetéssel|
| **axios**            | HTTP kérések küldése                        | A szerver felé HTTP küldésére szolgál.                                     | Az alkalmazás nem tud kommunikálni a szerverrel.|
| **node.js**          | Javascript runtime evironment               | A JavaScript kódot a szerveren futtatja.                                   | Az alkalmazás szervere nem fog működni. |
| **express**          | Web framework                               | A Node.js-hez tartozó web framework, amely segít a HTTP kérések kezelésében. | A backend nem tudja kezelni a HTTP kéréseket.|
| **mongoose**         | MongoDB ODM                                 | A MongoDB adatbázishoz való kapcsolódást és a dokumentumok kezelését teszi lehetővé. | Az alkalmazás nem tud adatokat tárolni a MongoDB-ben.|
| **cors**             | Cross-Origin Resource Sharing engedélyezése | A különböző domain-ek közötti kommunikációt teszi lehetővé.                | A frontend nem tud kommunikálni a szerverrel, ha különböző domain-eken futnak.|
| **jsonwebtoken**     | JSON Web Tokens kezelése                    |  Az autentikációhoz és az autorizációhoz használható.| Az alkalmazás nem tudja hitelesíteni a felhasználókat.|

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
