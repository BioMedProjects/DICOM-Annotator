const mongoose = require('mongoose');

const instance = mongoose.Schema ({
    id: String,
    done: Boolean,
    image: String,
});


export default mongoose.model('posts', instance;