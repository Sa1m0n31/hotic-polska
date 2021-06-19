const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const crypto = require('crypto');
const got = require("got");
const uuid = require('uuid');
const ObjectId = require('mongodb').ObjectID;

const port = 5000;
let secret = 'supersecret';
let secretAdmin = 'supersecretAdmin';

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

/* MondoDB Connection */
const MongoClient = require('mongodb').MongoClient;
const uri = "DATABSE_CONNECION_URL_HERE";

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.post("/admin/verify", (req, res) => {
    const token = req.body.token;
    let user = jwt.decode(token, secretAdmin).username;
    if(user) {
        res.send({
            loggedIn: 1,
            username: user
        });
    }
    else {
        res.send({
            loggedIn: 0
        });
    }
});

app.post("/user/verify", (req, res) => {
    const token = req.body.token;
    let user = jwt.decode(token, secret);
    if(user.username) {
        res.send({
            loggedIn: 1,
            username: user.username
        });
    }
    else {
        res.send({
            loggedIn: 0
        });
    }
});

app.post("/payment/verify", async (req, res) => {
    let merchantId = req.body.merchantId;
    let posId = req.body.posId;
    let sessionId = req.body.sessionId;
    let amount = req.body.amount;
    let currency = req.body.currency;
    let orderId = req.body.orderId;

    /* Calculate SHA384 checksum */
    let crc = "6f527712f30a5acd";

    let hash, data, gen_hash;
    hash = crypto.createHash('sha384');
    data = hash.update(`{"sessionId":"${sessionId}","orderId":${orderId},"amount":${amount},"currency":"PLN","crc":"${crc}"}`, 'utf-8');
    gen_hash= data.digest('hex');

    await got.put("https://secure.przelewy24.pl/api/v1/transaction/verify", {
        json: {
            merchantId,
            posId,
            sessionId,
            amount,
            currency,
            orderId,
            sign: gen_hash
        },
        responseType: 'json',
        headers: {
            'Authorization': 'Basic MTM4NDM3OjlhNzlkMmFjMGMwMTQ2NGYwMDBjNjc2ZmNiZjcwNTcy'
        }
    })
        .then(res => {
            if(res.body.data.status === 'success') {
                let emailEntity = '';
                /* Change value in databse - payment complete */
                const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
                client.connect(async err => {
                    const collection = await client.db("MassageGun").collection("orders");

                    await collection.updateOne({
                        id_zamowienia: sessionId
                    }, {
                        $set: { oplacone: true }
                    });

                    await client.close();
                });
            }
        })

    res.send({
        status: "OK"
    });

});

/* Edycja ceny */
app.post("/edit-product", async (req, res) => {
    let nazwa = req.body.name;
    let cena = req.body.price;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = await client.db("MassageGun").collection("data");

        await collection.updateOne({
            _id: ObjectId('603526cdb59e8cd4da801321')
        }, {
            $set: {
                nazwa,
                cena
            }
        });

        await res.send({
            success: 1
        });

        await client.close();
    });
});

/* Płatność */
app.post("/payment", cors(), async (req, res) => {
    /* Add order to database */
    let sessionId = uuid.v4();
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = client.db("MassageGun").collection("orders");
        let adres, adresFirmy, adresDostawy;

        if(req.body.mieszkanie) {
            adres = req.body.ulica + " " + req.body.budynek + "/" + req.body.mieszkanie;
        }
        else {
            adres = req.body.ulica + " " + req.body.budynek;
        }
        if(req.body.mieszkanieF) {
            adresFirmy = req.body.ulicaF + " " + req.body.budynekF + "/" + req.body.mieszkanieF;
        }
        else {
            adresFirmy = req.body.ulicaF + " " + req.body.budynekF;
        }

        if((req.body.dostawa === 'paczkomaty (pobranie)')||(req.body.dostawa === 'paczkomaty (przedplata)')) {
            adresDostawy = {
                adres: req.body.paczkomatAdres,
                kod_pocztowy: req.body.paczkomatKod,
                miasto: req.body.paczkomatMiasto
            }
        }
        else {
            adresDostawy = {
                adres,
                kod_pocztowy: req.body.kod,
                miasto: req.body.miasto
            }
        }

        let data = new Date();
        let data_zlozenia_zamowienia = data.getFullYear() + "." + (data.getMonth()+1) + "." + data.getDate() + " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();

        /* Faktura */
        let czyFaktura = req.body.nip, dane_do_faktury = null;
        if(czyFaktura) {
            czyFaktura = true;
            dane_do_faktury = {
                nazwa_firmy: req.body.firma,
                nip: req.body.nip,
                adresFirmy,
                kod_firmy: req.body.kodF,
                miasto_firmy: req.body.miastoF
            }
        }
        else {
            czyFaktura = false;
        }

        await collection.insertOne({
            /* Dane osoby */
            id_zamowienia: sessionId,
            imie: req.body.firstname,
            nazwisko: req.body.lastname,
            email: req.body.email,
            telefon: req.body.telefon,
            /* Dane zamowienia */
            ilosc: req.body.sztuki,
            skorka: req.body.skorka,
            wartosc: req.body.amount,
            /* Adres osoby */
            adres: adres,
            kod_pocztowy: req.body.kod,
            miasto: req.body.miasto,
            /* Dostawa */
            dostawa: {
                rodzaj: req.body.dostawa,
                adresDostawy
            },
            faktura: {
                czyFaktura,
                dane_do_faktury
            },
            data_zlozenia_zamowienia,
            oplacone: false
        });

        await client.close();
    });

    /* Generate SHA-384 checksum */
    let crc = "6f527712f30a5acd";
    let marchantId = 138437;

    let hash, data, gen_hash;
    hash = crypto.createHash('sha384');
    data = hash.update(`{"sessionId":"${sessionId}","merchantId":${marchantId},"amount":${parseFloat(req.body.amount)*100},"currency":"PLN","crc":"${crc}"}`, 'utf-8');
    gen_hash= data.digest('hex');

    /* Dane */
    let postData = {
        sessionId: sessionId,
        posId: marchantId,
        merchantId: marchantId,
        amount: parseFloat(req.body.amount) * 100,
        currency: "PLN",
        description: "Płatność za zakup pistoletu do masażu nt03",
        email: req.body.email,
        country: "PL",
        language: "pl",
        urlReturn: "https://hotic-polska.pl/oplacono",
        urlStatus: "https://hotic-polska.pl/payment/verify",
        sign: gen_hash
    };

    // console.log(postData);
    let responseToClient;

    await got.post("https://secure.przelewy24.pl/api/v1/transaction/register", {
        json: postData,
        responseType: 'json',
        headers: {
            'Authorization': 'Basic MTM4NDM3OjlhNzlkMmFjMGMwMTQ2NGYwMDBjNjc2ZmNiZjcwNTcy'
        }
    })
        .then(res => {
            responseToClient = res.body.data.token;
        })
        .catch(err => {
            console.log(err);
        })

    /* Return checksum for client, then call dotbay from client */
    await res.send({
        responseToClient
    });
});

/* Find all orders */
app.get("/orders", async (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = await client.db("MassageGun").collection("orders");

        let allUsers = await collection.find({}).toArray();

        await res.send({
            orders: allUsers
        });

        await client.close();
    });
});

/* Find all users */
app.get("/users", async (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = await client.db("MassageGun").collection("users");

        let allUsers = await collection.find({}).toArray();

        await res.send({
            users: allUsers
        });

        await client.close();
    });
});

/* Get product data */
app.get("/product-data", async (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = await client.db("MassageGun").collection("data");

        let productData = await collection.find({}).toArray();

        await res.send({
            productData
        });

        await client.close();
    });
});

/* Register new user */
app.post("/register-user", async (req, res) => {
   let imie = req.body.imie;
   let nazwisko = req.body.nazwisko;
   let email = req.body.email;
   let password = req.body.password;
   let telefon = req.body.telefon;
   let ulica = req.body.ulica;
   let budynek = req.body.budynek;
   let mieszkanie = req.body.mieszkanie;
   let kod = req.body.kod;
   let miasto = req.body.miasto;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = await client.db("MassageGun").collection("users");

        /* Check if user in database exists */
        let user = await collection.findOne({
            username: email
        });

        if(user !== null) {
            /* Email not available */
            res.send({
                error: 1 // User already exists
            });
            await client.close();
        }
        else {
            /* Email available */
            await bcrypt.hash(password, 8, async (err, hash) => {
                await collection.insertOne({
                    username: email,
                    password: hash,
                    imie,
                    nazwisko,
                    telefon,
                    adres: {
                        ulica,
                        budynek,
                        mieszkanie,
                        kod,
                        miasto
                    },
                    data_zalozenia_konta: new Date().getDate() + "." + new Date().getMonth()+1 + "." + new Date().getFullYear()
                });
                await res.send({
                    error: 0 // User registered
                });
                await client.close();
            });
        }
    });
});

/* Usuń zamowienie */
app.post("/delete-order", async (req, res) => {
   let idToDelete = req.body.id;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = await client.db("MassageGun").collection("orders");

        await collection.deleteOne({
            _id: ObjectId(idToDelete)
        });

        res.send({
            deleted: 1
        });

        await client.close();
    });
});

/* Dodaj administratora */
app.post("/add-admin", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = await client.db("MassageGun").collection("admins");

        /* Check if user in database exists */
        let user = await collection.findOne({
            username
        });

        if(user !== null) {
            /* Email not available */
            res.send({
                added: 0 // User already exists
            });
            await client.close();
        }
        else {
            /* Email available */
            await bcrypt.hash(password, 8, async (err, hash) => {
                await collection.insertOne({
                    username,
                    password: hash
                });
                await res.send({
                    added: 1 // User registered
                });
                await client.close();
            });
        }
    });
});

/* Pobranie pojedynczego zamówienia */
app.post("/get-order", async (req, res) => {
   let id = req.body.id;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = await client.db("MassageGun").collection("orders");

        const myOrder = await collection.findOne({
            _id: ObjectId(id)
        });

        if(myOrder) {
            await res.send({
                order: myOrder
            });
            await client.close();
        }
        else {
            await res.send({
                order: 0
            });
            await client.close();
        }
    });
});

/* Zmiana hasła administratora */
app.post("/admin/change-password", async (req, res) => {
    let username = req.body.username;
    let newPassword = req.body.password;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = await client.db("MassageGun").collection("admins");

        await bcrypt.hash(newPassword, 8, async (err, hash) => {
            if(hash) {
                await collection.updateOne(
                    { username },
                    { $set: { 'password': hash
                        }
                    }
                );
                await res.send({
                    success: 1 // Password changed
                });
                await client.close();
            }
            else {
                await res.send({
                    success: 0
                });
                await client.close();
            }
        });
    });
});

/* Dodaj dane do faktury */
app.post("/faktura", async (req, res) => {
    let email = req.body.mail;
    let firma = req.body.firma;
    let nip = req.body.nip;
    let ulica = req.body.ulica;
    let budynek = req.body.budynek;
    let mieszkanie = req.body.mieszkanie;
    let kod = req.body.kod;
    let miasto = req.body.miasto;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = await client.db("MassageGun").collection("users");

        await collection.updateOne(
            { username: email },
            { $set: { 'faktura': {
                        'firma': firma,
                        'nip': nip,
                        'adres': {
                            'ulica': ulica,
                            'budynek': budynek,
                            'mieszkanie': mieszkanie,
                            'kod': kod,
                            'miasto': miasto
                        }
                    }
                } }
        );

        await res.send({
            success: 1
        });

        await client.close();
    });
});

/* Update user */
app.post("/update-user", async (req, res) => {
    let imie = req.body.imie;
    let nazwisko = req.body.nazwisko;
    let email = req.body.mail;
    let telefon = req.body.telefon;
    let ulica = req.body.ulica;
    let budynek = req.body.budynek;
    let mieszkanie = req.body.mieszkanie;
    let kod = req.body.kod;
    let miasto = req.body.miasto;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = await client.db("MassageGun").collection("users");

        await collection.updateOne(
            { username: email },
            { $set: { 'imie': imie,
                'nazwisko': nazwisko,
                    'username': email,
                    'telefon': telefon,
                    'adres': {
                        'ulica': ulica,
                        'budynek': budynek,
                        'mieszkanie': mieszkanie,
                        'kod': kod,
                        'miasto': miasto
                    }
                } }
        );

        await res.send({
            success: 1
        });

        await client.close();
    });
});

/* Get user data */
app.post("/get-user", async (req, res) => {
    let token = req.body.token;
    let faktura = "";
    let user = jwt.decode(token, secret).username;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = await client.db("MassageGun").collection("users");

        /* Check if user in database exists */
        let currentUser = await collection.findOne({
            username: user
        });

        if(currentUser) {
            /* User in database exists */

            /* User has company */
            if(currentUser.faktura) {
                faktura = {
                    firma: currentUser.faktura.firma,
                    nip: currentUser.faktura.nip,
                    ulica: currentUser.faktura.adres.ulica,
                    budynek: currentUser.faktura.adres.budynek,
                    mieszkanie: currentUser.faktura.adres.mieszkanie,
                    kod: currentUser.faktura.adres.kod,
                    miasto: currentUser.faktura.adres.miasto
                }
            }

            await res.send({
                imie: currentUser.imie,
                nazwisko: currentUser.nazwisko,
                telefon: currentUser.telefon,
                email: user,
                ulica: currentUser.adres.ulica,
                budynek: currentUser.adres.budynek,
                mieszkanie: currentUser.adres.mieszkanie,
                kod: currentUser.adres.kod,
                miasto: currentUser.adres.miasto,
                faktura
            });
        }
        else {
            await res.send({
                loggedIn: 2
            });

            await client.close();
        }
    });


});

/* Login user */
app.post("/login-user", async (req, res) => {
   let username = req.body.username;
   let password = req.body.password;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = await client.db("MassageGun").collection("users");

        /* Check if user in database exists */
        let user = await collection.findOne({
            username
        });

        if(user) {
            /* User in database exists */
            console.log(user);
            console.log(user.password);
            bcrypt.compare(password, user.password, async (err, result) => {
                if(result) {
                    /* Credentials ok */
                    let token = jwt.encode({username}, secret);
                    res.send({
                        loggedIn: 1,
                        token
                    });
                    await client.close();
                }
                else {
                    /* Wrong password */
                    res.send({
                        loggedIn: 0
                    });
                    await client.close();
                }
            })
        }
        else {
            res.send({
                loggedIn: 2
            });

            await client.close();
        }
    });

});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

/* Admin login form */
app.post("/admin/auth", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let user;

    /* Connect to database */
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(async err => {
        const collection = client.db("MassageGun").collection("admins");

        user = await collection.findOne({username: username});
        if(user !== null) {
            bcrypt.hash(password, 8, (err, hash) => {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(result) {
                        let token = jwt.encode({username}, secretAdmin);
                        res.send({
                            loggedIn: 1,
                            token
                        });
                    }
                    else {
                        res.send({
                            loggedIn: 0
                        });
                    }
                });
            });
        }
        else {
            res.send({
                loggedIn: 0
            });
        }

        await client.close();
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
