Session.setDefault("sort", {content: 1}); 

Template.multipoem.poetry = function () {
    return Poetry.find({}, {sort: Session.get("sort")});
  };

Template.poem.selected = function () {
	return Session.equals("selected_poem", this._id) ? "warning" : '';
}; 


Template.multipoem.events({
	'click #insert': function() {
		var n = $("input[name=word]").val();
        if (n != "") {
        	var words = Poetry.findOne(Session.get("selected_poem"));
        	var addwrd = words.content + n;

        	if (addwrd.length > 132 && addwrd.length < 140) {

                Poetry.update(Session.get("selected_poem"), {$set: {content: addwrd}});
                $("input[name=word]").val('');
                // do the twitter post method here and modify it so it checks for you
                Meteor.call('postTweet', addwrd, function(err, result){
                    if(!err){
                        if (result.statusCode === 200) {
                            console.log(result);
                            console.log(tweetId);               
                        }
                    }
                    console.log(err);
                });
                // Delete the DB entry for tweet just made
                Poetry.remove(Session.get("selected_poem"));
            }
            else if (addwrd.length >= 140) {
            	$("input[name=word]").val('Too long. Try Again');
            }
            else {
                Poetry.update(Session.get("selected_poem"), {$set: {content: addwrd}});
                $("input[name=word]").val('');
            }
        }
        // return false so the page will not reload
        return false;

	},
	'click #fresh_poem': function() {
	    var n = $("input[name=word]").val();
        if (n != "") {
            Poetry.insert({content: n});
            $("input[name=word]").val('');
        }
        // return false so the page will not reload
        return false;
	}

});

Template.poem.events({
	'click' : function () {
		Session.set("selected_poem", this._id);
	}

});

console.log("test from client");