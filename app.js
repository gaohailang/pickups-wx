var mongoose = require('mongoose');

var MODE_ENUM = ['list', 'tinder'];

function timestampOn(schema, options) {
    schema.add({
        modifiedAt: Date
    });
    schema.add({
        createdAt: Date
    });

    schema.pre('save', function(next) {
        var now = Date.now()
        this.modifiedAt = now;
        if (!this.createdAt) {
            this.createdAt = now;
        }
        next();
    });
}

var ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        match: /.{2,15}/
    },
    desc: {
        type: String,
        match: /.{10,120}/
    },
    image: {
        type: String,
        match: /(?:http(?:s)?:\/\/)?(?:www\.)?(?:[\w-]*)\.\w{2,}/
    }
});

var ListSchema = new mongoose.Schema({
    title: {
        type: String,
        match: /.{5,15}/
    },
    yeahText: {
        type: String,
        default: '喜欢'
    },
    nopeText: {
        type: String,
        default: '不喜欢'
    },
    mode: {
        type: String,
        enum: MODE_ENUM
    },
    desc: {
        type: String,
        match: /.{10,200}/
    },
    items: [ItemSchema]
});

ItemSchema.plugin(timestampOn);
ListSchema.plugin(timestampOn);

var Item = db.model('person', ItemSchema);
var List = db.model('person', ListSchema);