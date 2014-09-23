Twit = new TwitMaker({
    consumer_key:         'niNyfn2A5CyK8DJ9aQuuexubO'
  , consumer_secret:      'K8N5z53aIfzk7xrNhMuk2crYLMGeVwcJa8E1SespTeLTzc1EEb'
  , access_token:         '2776845611-nFHx9PffF2GWm0j9N0PRzK81sAbQkkmHRY0PaYc'
  , access_token_secret:  'sHHrG2uDniFJSgolbzgJHAwvOdWOJINwlCgTKlS3yIyFK'
});

var poem = 'hey bro, I just want to say Hello world.';

Twit.post('statuses/update', { status: poem }, function(err, data, response) {
  console.log(data);
})