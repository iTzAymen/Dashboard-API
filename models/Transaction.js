const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    "IDENTIFIANT DE TRANSACTION": String,
    "Num D'AGREMENT": String,
    "CODE PDV": String,
    "NOM DU CLIENT": String,
    "PRENOM DU CLIENT": String,
    "DATE DE NAISSANCE DU CLIENT": String,
    "Num DE TELEPHONE": String,
    "ADRESSE DU CLIENT": String,
    "2G/3G": String,
    "TYPE DE PIN": String,
    "TITRE": String,
    "NATIONNALITE": String,
    "Num DE PIN": String,
    "CODE POSTAL": String,
    "COMMUNE ZONE": String,
    "WILAYA": String,
    "Num DE SERIE DE LA SIM": String,
    "Num DE COMPTE": String,
    "DOCUMENT ACTIVATION": String,
    "NOM DU PDV": String,
    "Num SIM PARTENAIRE": String,
    "COMMUNE ZONE PDV": String,
    "WILAYA PDV": String,
    "REGION PDV": String,
    "ANIMATEUR PDV": String,
    "SUPERVISEUR PDV": String,
    "EVENT ID": String,
    "STATUT": String,
    "RAISON REJECT": String,
    "DESCRIPTION": String,
    "BP STAT": String,
    "Description BP": String,
    "CHANNEL": String,
    "QIFLAG": String,
    "DATE DE CREATION": String,
    "CREE PAR": String,
    "DATE DE DERNIERE MODIFICATION": String,
    "DERNIERE MODIFICATION PAR": String,
    "PRODUIT": String,
    "CONFIRMATION CODE DOCUMENTS": String,
    "Type Transaction": String })

module.exports = mongoose.model('Transaction', TransactionSchema)