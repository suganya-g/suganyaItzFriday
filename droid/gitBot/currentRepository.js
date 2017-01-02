const currentRepository = function (repo,callback)
{
    if(!repo)
    {
        callback({ofType:"string", withContent: "Error: Repository Not Set"});
        return
    }
    callback(null, {ofType:"string", withContent: "Current repository is " + repo});
    return
}
module.exports = currentRepository;