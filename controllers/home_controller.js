
const Post = require('../models/post')


module.exports.home = function(req,res)
{
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    //populate the user of each post
    Post.find({}).populate('user').exec(function(err,post){
        if(err){
            return console.log('Error in finding the post:', err);
        }
        res.render('home' ,{
            title: 'Codeial | Home',
            posts : post
        })
    });

    
};