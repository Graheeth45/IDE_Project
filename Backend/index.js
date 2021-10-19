const express  = require("express");

const {generateFile} = require('./generateFile');

const {ExecuteCpp} = require('./ExecuteCpp');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/' , ( req , res) => {
    return res.json({hello : "World!"});
});

app.post("/run" , async (req , res) => {

    const { language = "cpp" , program } = req.body;

    if(program === undefined)
    {
        return res.status(400).json({success : false , error : "The code is empty!!!!"});
    }

    const filepath = await generateFile(language,program);

    const outpath = await ExecuteCpp(filepath);

    return res.json({ filepath  , outpath });
});

app.listen(5000 , () => {
    console.log(`Welcome to the port 4000!!!`);
});
