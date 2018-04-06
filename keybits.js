const https = require('https');


// https://genomelink.io/developers/docs/tutorial-oauth-example/
const accessToken = 'GENOMELINKTEST001';
// https://genomelink.io/developers/reference/reports/
const phenotype_url = 'eye-color';
console.log("Using access token '" + accessToken + "' and trait: '" + phenotype_url + "'");

console.log("Contacting genomelink servers...");
getData({
        headers: {'Authorization': 'Bearer ' + accessToken},
        port: 443,
        hostname: 'genomelink.io',
        path: '/v1/reports/' + phenotype_url + '?population=european'
    },
    r => console.log(r.summary.text));


// Gets JSON data from a HTTPS source.
function getData(opt, callback) {
    https.get(opt, (res) => {
        let data = '';
        res.on('data', (chunk) => {data += chunk;});
        res.on('end', () => {callback(JSON.parse(data));});
    }).on('error', (err) => {
        console.error('Error getting data: ', err);
        callback(null);
    });
}
