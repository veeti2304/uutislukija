// Uutislähteet JSON
// Tähän voi halutessaan lisätä uusia uutislähteitä jos niiltä löytyy rss feedi.

let lahteet = [
    {
      "id": "yle",
      "title": "Yle Uutiset",
      "url": "https://feeds.yle.fi/uutiset/v1/majorHeadlines/YLE_UUTISET.rss"
    },
    {
      "id": "su",
      "title": "Suomen Uutiset",
      "url": "https://www.suomenuutiset.fi/feed/"
    },
    {
      "id": "il",
      "title": "Iltalehti",
      "url": "https://www.iltalehti.fi/rss/uutiset.xml"
    },
	{
		"id": "kal",
		"title": "Kaleva",
		"url": "https://www.kaleva.fi/feedit/rss/managed-listing/rss-uusimmat/"
	},
	{
		"id": "hs",
		"title": "Helsingin Sanomat",
		"url": "https://www.hs.fi/rss/kotimaa.xml"
	},
	{
		"id": "kl",
		"title": "Kauppalehti",
		"url": "https://feeds.kauppalehti.fi/rss/main"
	}
];

var naytetaanUutisia = false;

// Valitse uutislähde joka näytetään news divissä.
function valitseUutislahde(id) {
    
	// Piilota
	if (naytetaanUutisia) {
		$("#newsDisp").hide();
		$("#help").show();
		naytetaanUutisia = false;
		return;
	} else {
		$("#newsDisp").show();
		$("#help").hide();
		naytetaanUutisia = true;
	}

	var uutisetURL = "";
	for (var i = 0; i < lahteet.length; i++) {
		if (lahteet[i].id == id) {
			uutisetURL = lahteet[i].url;
		}
	}

	var uutisetElementti = $("#newsDisp");
	var uutisetHTML = "";

	$.ajax({
		url: uutisetURL,
		type: "GET",
		dataType: "xml",
		success: function (data) {
			$(data).find("item").each(function () {
				var el = $(this);
				var title = el.find("title").text();
				var link = el.find("link").text();
				var description = el.find("description").text();
				var pubDate = el.find("pubDate").text();

				uutisetHTML += `<div class="news-item">
					<div class="news-title"><a onclick="window.open('${link}', '_blank')">${title}</a></div>
					<div class="news-description">${description}</div>
					<div class="news-pubDate">${pubDate}</div>
					</div><br>`;
			});

			uutisetElementti.html(uutisetHTML);
		}
	});

}