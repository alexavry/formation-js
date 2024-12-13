// Importer le module express
const express = require('express');
// Importer le module mongoose
const mongoose = require('mongoose');

const cors = require('cors');

// ================================================
// Connexion à la base de données
// ================================================
// Quand je suis connecté à la bdd (evenementiel)
mongoose.connection.once('open', () => {
    console.log("Connexion à la base de données effectué");
});

// Quand la bdd aura des erreurs
mongoose.connection.on('error', () => {
    console.log("Erreur dans la BDD");
});

// Se connecter sur mongodb (async)
// Ca prend x temps à s'executer
//todo : adapter a la bone bdd
mongoose.connect("mongodb://127.0.0.1:27017/cocktail");

//todo creer le modele invité
const Invite = mongoose.model('Invite', { nom: String, prenom: String, pres: Boolean }, 'invites');
// ================================================
// Instancier un serveur et autoriser envokie json
// ================================================
// Instancier le server grace à express
const app = express();
app.use(cors());

// AUTORISER LE BACK A RECEVOIR DES DONNEES DANS LE BODY
app.use(express.json());

// ================================================
// Les routes (url/point d'entrée)
// ================================================

//route pour le get de tous les invités
app.get('/invites', async (request, response) => {
    const invites = await Invite.find();

    if (invites.length == 0){
        return response.json({ code : "701" });
    }
    return response.json(invites); 
});
//route pour le get de un invité precis
app.get('/invite/:id', async (request, response) => {
    const paramID = request.params.id;

    const foundInvite = await Invite.findOne({'_id' : paramID});

    if (!foundInvite){
        return response.json({ code : "705" });
    }

    return response.json(foundInvite);

});
app.patch('/modifier-invite/:id', async (request, response) => {
    const paramID = request.params.id;
    const { pres } = request.body;

    try {
        const updatedInvite = await Invite.findByIdAndUpdate(
            paramID,
            { pres },
            { new: true }
        );

        if (!updatedInvite) {
            return response.status(404).json({ code: "705", message: "Invité non trouvé" });
        }

        return response.json(updatedInvite);
    } catch (error) {
        return response.status(500).json({ code: "500", message: "Erreur serveur" });
    }
});
//route pour ajouter un invite
app.post('/add-invite', async (request, response) =>{
    const inviteJson = request.body;
    const invite = new Invite(inviteJson);
    await invite.save();
    return response.json(invite);

});

// Route pour supprimer un invité précis
app.delete('/delete-invite/:id', async (request, response) => {
    const paramID = request.params.id;

    try {
        const result = await Invite.deleteOne({ _id: paramID });
    } catch (error) {
        console.log("Erreur lors de la suppression de l'article");
        return response.status(500).json({ code: "500", message: "Erreur serveur" });
    }
});
// ================================================
// Lancer le serveur
// ================================================
app.listen(3000, () => {
    console.log("Le serveur a démarré");
});