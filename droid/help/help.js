var intentMD = require("../metaData/intentMD.js");
var integratedApiMD = require("../metaData/integratedApiMD.js");
var github = require("./github.js");

const help = function (api, callback)
{
    let content = '';
    api = api.toLowerCase();

    if(api==='' || api===null || api===undefined)
    {
        let apiList = [];
        apiList.push("Following APIs are integrated. Type 'help -api' to list commands of that api.");   //set header for the content
        for(let api in integratedApiMD)
        {
            console.log(integratedApiMD[api.name]);
            apiList.push(integratedApiMD[api].name);
        }

        callback(null,{ofType:"listItems", withContent: apiList});
        return
    }
    else
    {
        let found = false;
        for(let intent in intentMD)
        {
            if(intentMD[intent].api === api)
                found = true;
        }
        if(!found)  //if api not found
        {
            callback(null, {ofType:"string", withContent: "Error: Not Found"});
            return   
        }
        else
        {
            switch(api) 
            {
                case "github":
                    content = github()
                break;
            }
        }
    }
    
    callback(null, {ofType:"help", withContent: content});
    return
}
module.exports = help;