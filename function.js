'use strict';
const Alexa = require('alexa-sdk');
const https = require('https');

const HELP_MESSAGE = 'I can help you discover your Genome Link data. You can start by asking for a supported trait, such as eye color or beard thickness.';
const STOP_MESSAGE = 'Bye!';

const handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'GetData': function (phenotype_url, phenotype_text) {
        // this.event.session.user.accessToken = 'GENOMELINKTEST001';
        let speech = "";
    
        if(!this.event.session.user.accessToken) {
            this.event.session.user.accessToken = 'GENOMELINKTEST001';
            speech += "To connect your account visit the Alexa app. From a demo account, ";
        }

        let requestoptions = {
            headers: {
              'Authorization': 'Bearer ' + this.event.session.user.accessToken
            },
            port: 443,
            hostname: 'genomelink.io',
            path: '/v1/reports/' + phenotype_url + '?population=european'
        };

        getData(requestoptions, r => {
            if(r.summary.text == "Intermediate") {
                r.summary.text = "are intermediate";
            }
            
            speech += "On " + phenotype_text + ", people with your phenotype " + r.summary.text;
            speech += ". Which other trait do you want to know about?"

            this.emit(':ask', speech);
        });
    },

    'GetEyeColor': function () {this.emit('GetData', 'eye-color', 'eye color');},
    'GetMorning': function () {this.emit('GetData', 'morning-person', 'morning behavior');},
    'GetBeard': function () {this.emit('GetData', 'beard-thickness', 'beard thickness');},
    'GetAgreeableness': function () {this.emit('GetData', 'agreeableness', 'agreeableness');},
    'GetAlcohol': function () {this.emit('GetData', 'alcohol-drinking-behavior', 'alcohol consumption');},
    'GetALA': function () {this.emit('GetData', 'alpha-linolenic-acid', 'A. L. A.');},
    'GetAnger': function () {this.emit('GetData', 'anger', 'anger');},
    'GetBetaCarotene': function () {this.emit('GetData', 'beta-carotene', 'beta carotene levels');},
    'GetBitter': function () {this.emit('GetData', 'bitter-taste', 'bitterness sensitivity');},
    'GetBlackHair': function () {this.emit('GetData', 'black-hair', 'black hair');},
    'GetGlucose': function () {this.emit('GetData', 'blood-glucose', 'blood glucose');},
    'GetBMI': function () {this.emit('GetData', 'bmi', 'B. M. I.');},

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', HELP_MESSAGE);
    },
    'AMAZON.CancelIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'Unhandled': function () {
        this.emit('AMAZON.HelpIntent');
    }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

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
