const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));

// express.static("./public")
app.use(express.static(path.join(__dirname,'./public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
    // res.sendFile(path.join(__dirname,'./style.css'));

});

app.post('/save-data', async (req, res) => {

    const data = req.body;
    console.log(data.age, data.name, data.email, data.phone, data.gender, data)
    console.log(req.body)
    //   res.send(data)


    const db = new sqlite3.Database('patient_details.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the patient_details database.');
    });

    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS patient_details (
      name TEXT,
      age INTEGER,
      gender TEXT,
      email TEXT,
      phone TEXT
    )`, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Table created successfully');
        });

        const stmt = db.prepare(`INSERT INTO patient_details (
      name,
      age,
      gender,
      email,
      phone
    ) VALUES (?, ?, ?, ?, ?)`);

        stmt.run([
            data.name,
            data.age,
            data.gender,
            data.email,
            data.phone,
        ], (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Data saved successfully');
        });

        stmt.finalize();
    });

    db.close();

    res.send('Data saved successfully');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
