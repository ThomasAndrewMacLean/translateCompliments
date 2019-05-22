const fetch = require('node-fetch');
const fs = require('fs')
process.env.GOOGLE_APPLICATION_CREDENTIALS = './credentials.json';

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
    fs.appendFileSync("./output.txt", translation, "utf8")
}

quickstart();