var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');

var cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;   

var router = express.Router();


router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

var id = 3;
var pets = [{name:'Kitty', id:0, animal: 'cat' ,race: 'unknown', ageInMonths: 6, ownerId: '050111111029', weightInPounds: 10  }, {name:'Roco', id:1, animal: 'dog' ,race: 'bulldog', ageInMonths: 5, ownerId: '050111111029', weightInPounds: 10  }, {name:'Chiara', id:2, race: 'boxer', animal: 'dog', ageInMonths: 8, ownerId: '0801090901010', weightInPounds: 20 }];
var owners = [{name: 'Juan Carlos Herrera', id:'050111111029'}, {name: 'Carlos Varela', id:'0801090901010'}]
var types = ['cat', 'dog', 'bird', 'other'];

router.route('/pets')
    .get(function(req, res){
        if(req.query.type){
            let data = pets.filter(function (p){return  p.animal === req.query.type});
            res.json(data)
            return;
        }
        let data = pets;
        res.json(data)
    });

router.route('/pets/types')
    .get(function(req, res){
        res.json(types);
    });

    
router.route('/pets/:id')
    .get(function(req, res){
        let id =  Number(req.params.id);
        let pet = pets.filter(function(p){return p.id === id})
        res.json({name: pet[0].name, animal:  pet[0].animal, race:  pet[0].race, ageInMonths:  pet[0].ageInMonths, weightInPounds:  pet[0].weightInPounds, ownerId:  pet[0].ownerId, id:  pet[0].id});
    });

router.route('/owners')
    .get(function(req, res){
        let data = owners;
        res.json(data)
    });

router.route('/owners/:id')
    .get(function(req, res){
        let id =  req.params.id;
        let data = pets.filter(function(p){return p.ownerId === id})
        res.json(data)
    });


   
router.route('/pets')
    .post(function(req, res){
        let name = req.body.name;
        let animal = req.body.animal;
        let race = req.body.race;
        let ageInMonths = req.body.ageInMonths;
        let weightInPounds = req.body.weightInPounds;
        if(!req.body.ownerId){
            res.json({error : "no ownwer"});
        }
        let ownerName = req.body.ownerName;
        let ownerId = req.body.ownerId;
        let existingOwner = owners.filter(function(o) {return o.id == ownerId});
        console.log(existingOwner);
        if(existingOwner != []){
            owners.push({name: ownerName, id: ownerId});
        }
        let pet = {name: name, animal:animal, race:race, ageInMonths: ageInMonths, weightInPounds: weightInPounds, ownerId: ownerId, id: id++};
        pets.push(pet);
        res.json(pet);
    });
    
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);