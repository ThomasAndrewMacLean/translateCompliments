const fetch = require('node-fetch');
const fs = require('fs');
process.env.GOOGLE_APPLICATION_CREDENTIALS = './credentials.json';

const getEmergencyCompliment = async () => {
    const j = await fetch(
        'https://spreadsheets.google.com/feeds/list/1eEa2ra2yHBXVZ_ctH4J15tFSGEu-VTSunsrvaCAV598/od6/public/values?alt=json'
    );
    const data = await j.json();
    const compliments = data.feed.entry.map(x => x.gsx$compliments.$t);

    const { Translate } = require('@google-cloud/translate');
    projectId = 'nomadic-buffer-204610'; 

    const translate = new Translate({ projectId });

    compliments.forEach(async c => {
        const target = 'nl';
        const [translation] = await translate.translate(c, target);
        fs.appendFileSync('output2.txt', `"${translation}",\n`);
    });
};

async function quickstart(
    projectId = 'nomadic-buffer-204610' // Your GCP Project Id
) {
    // Imports the Google Cloud client library
    const { Translate } = require('@google-cloud/translate');

    // Instantiates a client
    const translate = new Translate({ projectId });

    const api = 'https://complimentr.com/api';

    const j = await fetch(api);
    const data = await j.json();
    // The text to translate
    const text = data.compliment;

    // The target language
    const target = 'nl';

    // Translates some text into Russian
    const [translation] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
    fs.appendFileSync('./output.txt', `"${translation}",\n`, 'utf8');
}
getEmergencyCompliment();
// x = 0;
// while (x < 100) {
//     quickstart();
//     x++;
// }
