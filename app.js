var _models = require('./model');
var List = _models.List;
var Item = _models.Item;

var express = require('express');
var x = require('lodash');

var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

/* used in admin editor */
app.get('/api/v1/lists', function(req, res) {
    return List.find(function(err, lists) {
        if (!err) {
            return res.send(lists);
        } else {
            return console.log(err);
        }
    });
});
app.post('/api/v1/lists', function(req, res) {
    var list = new List(req.body);
    list.save(function(err) {
        if (!err) {
            return console.log("created");
        } else {
            return console.log(err);
        }
    });
    return res.send(list);
});

app.put('/api/v1/lists/:id', function(req, res) {
    return List.findById(req.params.id, function(err, list) {
        x.extend(list, req.body);
        return list.save(function(err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            return res.send(list);
        });
    });
});

app.delete('/api/v1/lists/:id', function(req, res) {
    return List.findById(req.params.id, function(err, list) {
        return list.remove(function(err) {
            if (!err) {
                console.log("removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
});

app.use(express.static(__dirname + '/public'));
server.listen(5000, '0.0.0.0');