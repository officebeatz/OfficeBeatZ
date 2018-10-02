require('isomorphic-fetch');
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: 'd5D9_cIEfCAAAAAAAAAAC0LciLBkuXDZ6Pa73WlmuxPO9G8Q6O6lM3w_f9YMj7L4' });

function getFile(name) {
    return new Promise(function (resolve, reject){
        dbx.sharingListSharedLinks({path: '/'+name}).then(function(response){
            var link = response.links[0].url.substring(0, response.links[0].url.length-1) + "1";
            resolve(link);
        }).catch(function(error){
            console.log(error);
            reject(error);
        });
    })
    
};

exports.getRandomFile = function(){
    return new Promise(function(resolve, reject){
        dbx.filesListFolder({path: ''}).then(function(response) {
            let name = '';
            while (!name.endsWith('.mp3')){
                index = parseInt(Math.random()*response.entries.length);
                name = response.entries[index].name;
            }
            getFile(name).then(function(result){
                resolve(result);
            });
        }).catch(function(error) {
            console.error(error);
            reject(error);
        });
    })
    

}