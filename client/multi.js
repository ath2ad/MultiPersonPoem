// Sets alphabetical order
Session.setDefault("sort", {content: 1}); 

// helpers: query poems from database and highlight html for selected poem
Template.multipoem.poetry = function () {
    return Poetry.find({}, {sort: Session.get("sort")});
  };

Template.poem.selected = function () {
	return Session.equals("selected_poem", this._id) ? "lead" : "lead_noselected";
}; 

// event handlers for adding words and new poems; twit method evoked here
Template.multipoem.events({
	'click #insert': function() {
		var n = $("input[name=word]").val();

        if (n != "" && n.length < 22 && n.match(" ") == null) {
        	var words = Poetry.findOne(Session.get("selected_poem"));
        	var addwrd = words.content + " " + n;

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
            	// TODO add a pause and then clear
            	Meteor.setTimeout(function() {
            		$("input[name=word]").val('');

            	}, 3000);
            }
            else {
                Poetry.update(Session.get("selected_poem"), {$set: {content: addwrd}});
                $("input[name=word]").val('');
            }
            return false;
        }
        $("input[name=word]").val('No spaces|22 letter limit');
        
        // add a pause and then clear
        Meteor.setTimeout(function() {
            $("input[name=word]").val('');
        }, 2200);

        // return false so page doesn't reload
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