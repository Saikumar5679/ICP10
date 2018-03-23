/**
 * Created by VenkatNag on 3/13/2018.
 */
var https = require('https'),
    oauthJsonFile = require('fs').createWriteStream('oauth.json');
var gettingAccess = {
    consumerKey: 'EIx5kqg8RWzwE4EMv6sfN3qwZ',
    consumerSecretKey: 'U85qeXYBtHmAl9Vs2GavIsthYkc2PMaU52r6eTsM6i93h1O8YL'
};

var request = https.request({
    method: 'POST',
    host: 'api.twitter.com',
    path: '/oauth2/token',
    headers: {
        'User-Agent': 'Coding Defined',
        Authorization: 'Basic ' + Buffer((encodeURIComponent(gettingAccess.consumerKey) + ':' + encodeURIComponent(gettingAccess.consumerSecretKey))).toString('base64'),
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Content-length': 29
    }
});

request.end('grant_type=client_credentials');

request.on('response', function(response) {
    if(response.statusCode !== 200) {
        return console.log('Error ' + response.statusCode);
    }
    response.pipe(oauthJsonFile);
});
