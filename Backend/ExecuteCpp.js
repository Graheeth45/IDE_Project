const  {exec} = require('child_process');
const path = require('path');
const fs = require('fs');
const { stdout, stderr } = require('process');
const { error } = require('console');


const outputpath = path.join(__dirname,"outputs");


if(!fs.existsSync(outputpath))
{
    fs.mkdirSync(outputpath,{recursive:true});
}

const ExecuteCpp = async (filepath) => {

    const jobId = path.basename(filepath).split(".")[0];
    const outpath = path.join(outputpath , `${jobId}.out`);

    return new Promise(( resolve , reject ) => {
        exec(`g++ ${filepath} -o ${outpath} && cd ${outputpath} && ./${jobId}.out` , 
          (error , stdout , stderr) => {
              if(error)
              {
                 reject({error ,  stderr});
              }
              if(stderr)
              {
                  reject(stderr);
              }
              resolve(stdout);
          });
    });

};

module.exports = {
    ExecuteCpp
}