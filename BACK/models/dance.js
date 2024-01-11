// Mongoose:n skeema (schema) määrittää MongoDB dokumenttisi rakenteen. Alla oleva koodi luo skeeman (schema) movie dokumentille. Skeema määrittelle mitä ja minkä tyyppisiä tietoja dokumentti sisältää. Meidän movie doukumentti sisältää kolme kenttää: title, director ja year. https://mongoosejs.com/docs/guide.html

// Voit myös lisätä tietokenttien validoinnin skeeman määrittelyssä. Seuraavassa koodissa olemme määrittäneet kaikki kentät pakollisiksi (required: true). Olemme myös määrittäneet otsikko ja ohjaaja kenttien enimmäispituuden (maxlength).

// var MovieSchema = new Schema({
//   title: {type: String, required: true, maxlength: 150},
//   director: {type: String, required: true, maxlength: 200},
//   year: {type: String, required: true}
// });

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DanceSchema = new Schema({
    danceEvent: { type: String,  maxlength: 150 },
    danceGenre: { type: String, maxlength: 200 },
    dancePlace: { type: String, maxlength: 200 },
    startDate: { type: Date },
    startTime: { type: String, maxlength: 8 }, // Esim. "HH:mm:ss"
    endDate: { type: Date},
    endTime: { type: String, maxlength: 8 } // Esim. "HH:mm:ss"
});

module.exports = mongoose.model('Dance', DanceSchema);
