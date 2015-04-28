import Vue from "yyx990803/vue";
import jsonp from 'jsonp';
/*
	vm.$el // -The View
	vm.$data // -The Model
*/

var vm = new Vue({ 
	/* options */ 

	el: '#demo',
	data: {
		hello: 'hello Hello'
	}
});


class RedditApi {
	constructor() {
		this.redditURL = "http://www.reddit.com/r/nsfw_gifs.json";
		this.redditURL = "https://www.reddit.com/r/gifs.json";
	}
	load() {
		
		return new Promise ((resolve, reject ) => {

			jsonp( this.redditURL, {param: 'jsonp'}, (err, data) => {
				err ? reject(err) : resolve(data.data.children);
			})
		})
	}
}


function extractGifs(posts) {
	return posts
		.filter( post => !post.data.over_18 )
		.map( post => post.data.url )
		.filter( url => /gifv?$/.exec(url) )
		.map(url => url.replace(/v$/,'') )
}

var aa = new RedditApi();


var ele = document.querySelector('#demo');


aa.load()
	.then( extractGifs )
	.then( urls => {
		console.log(urls);
		ele.innerHTML = urls.map( url => `<img src = "${url}">`).join('\n');
	});