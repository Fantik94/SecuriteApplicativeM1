const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcryptjs');


const app = express();
app.use(express.json());

const allowedOrigins = [
    'http://localhost:3001',
    'http://dadabapt.ddns.net'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
};

app.use(cors(corsOptions));


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',  
    database: 'sam1_blog',  
    port: 3306,  
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}); 

function executeQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

app.get('/test-db', async (req, res) => {
    try {
        await executeQuery('SELECT 1');
        res.send('Connexion à la base de données réussie !');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la connexion à la base de données : ' + err.message);
    }
});

app.get('/all-blogs', async (req, res) => {
    try {
        const results = await executeQuery('SELECT * FROM blog');
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des données : ' + err.message);
    }
});

app.post('/blogs', async (req, res) => {
    try {
        const { titre, description, image_url, pseudo } = req.body;
        const query = 'INSERT INTO blog (titre, description, image_url, pseudo) VALUES (?, ?, ?, ?)';
        const results = await executeQuery(query, [titre, description, image_url, pseudo]);
        res.status(201).send(`Entrée ajoutée avec l'ID: ${results.insertId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'ajout de l\'entrée : ' + err.message);
    }
});

app.get('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM blog WHERE id = ?';
        const results = await executeQuery(query, [id]);
        if (results.length === 0) {
            return res.status(404).send('Aucun blog trouvé avec cet ID.');
        }
        res.json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération du blog : ' + err.message);
    }
});

app.put('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titre, description, image_url, pseudo } = req.body;
        const query = 'UPDATE blog SET titre = ?, description = ?, image_url = ?, pseudo = ? WHERE id = ?';
        await executeQuery(query, [titre, description, image_url, pseudo, id]);
        res.send('Blog mis à jour avec succès');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la mise à jour du blog : ' + err.message);
    }
});

app.delete('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM blog WHERE id = ?';
        const results = await executeQuery(query, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).send('Aucune entrée trouvée avec cet ID.');
        }
        res.send(`Entrée avec l'ID ${id} a été supprimée.`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la suppression de l\'entrée : ' + err.message);
    }
});


// Endpoint pour s'inscrire
app.post('/register', async (req, res) => {
    try {
        const { email, password, role = 'USER' } = req.body;
        if (!email || !password) {
            return res.status(400).send('Email et mot de passe sont requis.');
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hashage du mot de passe

        const insertQuery = 'INSERT INTO Users (email, password, role) VALUES (?, ?, ?)';
        await executeQuery(insertQuery, [email, hashedPassword, role]);
        res.status(201).send('Utilisateur enregistré avec succès.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'inscription : ' + err.message);
    }
});

// Endpoint pour se connecter
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Email et mot de passe sont requis.');
        }

        const selectQuery = 'SELECT password, id, role FROM Users WHERE email = ?';
        const results = await executeQuery(selectQuery, [email]);

        if (results.length > 0) {
            const { password: hashedPassword, id, role } = results[0];

            if (await bcrypt.compare(password, hashedPassword)) {
                res.json({ message: 'Connexion réussie', userId: id, role });
            } else {
                res.status(401).send('Mot de passe incorrect.');
            }
        } else {
            res.status(404).send('Utilisateur non trouvé.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la connexion : ' + err.message);
    }
});


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Erreur du serveur');
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

process.on('uncaughtException', (error) => {
    console.error('Erreur non capturée', error);
});
