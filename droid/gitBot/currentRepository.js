const currentRepository = function (repo,callback)
{
    if(!repo)
    {
        callback({type:"string", content: "Error: Repository Not Set"}, null);
        return
    }
    callback(null, {type:"string", content: "Current repository is " + repo});
    return
}
module.exports = currentRepository;