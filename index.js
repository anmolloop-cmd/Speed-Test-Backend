const express= require("express");
const FastSpeedtest = require("fast-speedtest-api");

const port=5000;
const app=express();

let speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
    verbose: false, // default: false
    timeout: 5000, // default: 5000
    https: true, // default: true
    urlCount: 5, // default: 5
    bufferSize: 8, // default: 8
    unit: FastSpeedtest.UNITS.Mbps // default: Bps
});

//define routes...

//you may change sample here

let sample=1

app.get('/getspeed',async(req,res)=>{
    let promise=[]
    promise.push(performspeedtest());
    try{
    //using promise.all for performance enhancement
    const speed=await Promise.all(promise);
    res.status(200).json({"Speed":`${speed}`});
    }
    catch(err)
    {
    //speed testing failed
    res.status(500).json({"Speed":-1000});
    }
})

async function performspeedtest()
{
    return new Promise(async(resolve,reject)=>{
    try{
    const data=await speedtest.getSpeed();
    resolve(data);
    }
    catch(err){
    console.log(err);
    reject(err);
    }
    })
}


runServer();
//start server
function runServer()
{
try
{
app.listen(port,()=>{
console.log(`Speed Test running on ${port} Successfully`)
})
}
catch(err)
{
console.log(err);
}
}
