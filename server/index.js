require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;

async function startApp() {
    const app = express();
    app.use(cors());
    app.use(express.json());

    const SECRET_KEY = process.env.SECRET_KEY;

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });


    await client.connect();
    console.log(client);
    const db = client.db("MC02-DB");

    function verifyToken(req, res, next) {
        if (req.path === '/api/create/user' && req.method === 'POST') {
            return next();
        }
        console.log(req);
        const token = req.headers['access_token'];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        next();
    }

    app.post('/api/create/:modelName', verifyToken, async (req, res) => {
        const { modelName } = req.params;
        const document = req.body;

        try {
            const result = await db.collection(modelName).insertOne(document);
            res.json({ success: true, message: "success create", result: result });
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: "create error" });
        }
    });

    app.post('/api/update/:modelName/:id', verifyToken, async (req, res) => {
        const { modelName, id } = req.params;
        let updates = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID format');
        }

        try {
            delete updates._id;
            const result = await db.collection(modelName).updateOne(
                { _id: new ObjectId(id) },
                { $set: updates }
            );

            if (result.matchedCount === 0) {
                return res.status(404).send('Document not found');
            }

            res.json({ success: true, message: "success update", result: result });
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: "update error", error: error.message });
        }
    });

    app.post('/api/search/:modelName', verifyToken, async (req, res) => {
        const { modelName } = req.params;

        try {
            const searchResult = await db.collection(modelName).find(req.body).toArray();

            res.json({ success: true, message: "success search", result: searchResult });
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: "search error" });
        }
    });

    app.post('/api/searchDetails/:modelName', verifyToken, async (req, res) => {
        const { modelName } = req.params;
    
        try {
            const { date, room, seat, time } = req.body;
            const searchCriteria = {
                date: date,
                room: room,
                seat: seat,
                time: time,
            };
            console.log("Inside API: ", searchCriteria);
            const searchResult = await db.collection(modelName).find(searchCriteria).toArray();
    
            if (searchResult.length > 0) {
                res.json({ success: true, message: "Duplicate Found", result: searchResult });
            } else {
                res.json({ success: true, message: "No Duplicate Found", result: [] });
            }
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: "search error" });
        }
    });

    app.post('/api/delete/:modelName/:id', verifyToken, async (req, res) => {
        const { modelName, id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID format');
        }

        try {
            const result = await db.collection(modelName).deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 0) {
                return res.status(404).send('Document not found or already deleted');
            }

            res.json({ success: true, message: "Document deleted successfully", result: result });
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: "Delete Failed", error: error.message });
        }
    });

    app.post('/api/delete/user', verifyToken, async (req, res) => {   
        try{
            const { username } = req.user;
            const result = await db.collection('user').deleteOne({ username });
            if (result.deletedCount === 0){
                return res.status(404).send('User not found or already deleted');
            }
            await db.collection('reservation').deleteMany({ username: username });
        
            res.json({ success: true, message: "Account and related records deleted successfully." });
        } catch (error) {
            console.error('Failed to delete account and related records:', error);
            res.json({ success: false, message: "User deletion failed", error: error.message });
        }
    });

    
    
    app.get('/api/get/:modelName/:id', async (req, res) => {
        const { modelName, id } = req.params;

        try {
            const document = await db.collection(modelName).findOne({ _id: new ObjectId(id) });
            res.json({ success: true, message: "Document fetched successfully", result: document });
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: "get error" });
        }
    });

    app.post('/api/login', async (req, res) => {
        const { username, password } = req.body;
        const user = await db.collection('user').findOne({ username, password });
        console.log('login check', user);

        if (user) {
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });
            res.json({ success: true, message: "success token", result: { profile: user, token: token } });
            console.log("User Found");
        } else {
            res.json({ success: false, message: "access denied" });
        }
    });

    app.use(cors());

    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });

}

startApp();

