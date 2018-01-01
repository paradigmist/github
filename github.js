function call() {
  var username = document.getElementById('username').value;
  if (!username) { 
    document.getElementById('content').innerHTML = "no data to get"
    return;
  }
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(data => {
    	let contributors_urls = data.map(obj => obj.contributors_url)
    	, languages_urls = data.map(obj => obj.languages_url)
    	, details = languages_urls.concat(contributors_urls)
        , promises = details.map(url => fetch(url).then(y => y.json()));

    	Promise.all(promises).then(results => {
    	    data.map((obj,i) => {
    	    	obj.languages_url = results[i]
    	    	obj.contributors_url = results[(data.length) + i]
    	    	return obj
    	    });
    	    document.getElementById('content').innerHTML = JSON.stringify(data, null, 2)
    	});
    })
    .catch(err => console.log('err', err));
}