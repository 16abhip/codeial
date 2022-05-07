
const Post = require('../models/post');


module.exports.like = function(req, res)
{
    res.end('<h1>Hey!, Post Here, and Like (: </h1>');
}

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err, post)
    {
        if(err){console.log('Error in creating the post', err); return;};
        return res.redirect('back');
    });
};