Meteor.startup(function () {
    if (Poetry.find().count() === 0) {
      var contents = ["Love",
                   "War on",
                   "Waves crash over me",
                   "Fear",
                   "Soft gravvy",
                   "Steel",
                   "Technology balances without"];
      for (var i = 0; i < contents.length; i++)
        Poetry.insert({content: contents[i]);
    }
  });

Twit = new TwitMaker({
    consumer_key:         'niNyfn2A5CyK8DJ9aQuuexubO'
  , consumer_secret:      'K8N5z53aIfzk7xrNhMuk2crYLMGeVwcJa8E1SespTeLTzc1EEb'
  , access_token:         '2776845611-nFHx9PffF2GWm0j9N0PRzK81sAbQkkmHRY0PaYc'
  , access_token_secret:  'sHHrG2uDniFJSgolbzgJHAwvOdWOJINwlCgTKlS3yIyFK'
});

Meteor.methods({

    postTweet: function(tweet) {
        return Twit.post('statuses/update', { status: tweet }, function(err, data, response) {
                   console.log(data);
                });
    }
})


