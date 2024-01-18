// Uutislähteet JSON
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
					<div class="news-title"><a href="${link}">${title}</a></div>
					<div class="news-description">${description}</div>
					<div class="news-pubDate">${pubDate}</div>
					</div><br>`;
			});

			uutisetElementti.html(uutisetHTML);
		}
	});

}