var app=(function(module) {
  module.init=init;
  module.myUI={};

  function init(){
    //init cms sdk
    cms.init({
      alias: 'costainapp_1383735125091',
      onNav:function(contentId){
        app.view.changePage(contentId,{"changeHash":true,"addBackBtn":true});
      }
    });  
    $.mobile.showPageLoadingMsg("a","Fetching content");
    cms.ui.initUi(function(){
        var ul=cms.ui.getHtml(cms.app.alias);
        $("#homePage [data-role='content']").html(ul).trigger('create').trigger('pageinit');
        // ul.listview();
        $.mobile.hidePageLoadingMsg();
    });
    $.mobile.page.prototype.options.addBackBtn=true;
    cms.service.startPoll(8); //sync every 30 seconds.
  }

  return module;
  
})(app || {});

app.data={
  "title": "Joint Venture Supports Local Hospice",
  "description": "<p>6 November 2013</p>\n<p style=\"text-align: justify;\">Costain staff and colleagues from the GCA (Galliford Try, Costain and Atkins) joint venture (jv) have collected Â£4,000 for a local hospice.</p>\n<p style=\"text-align: justify;\">The money was raised at a ball held to celebrate the hard work and achievement of GCAâ€™s AMP5 Framework. GCA has been working with client and alliance partner United Utilities in the AMP5 Framework since 2010. The Framework is set to run until March 2015 but the ball was timed to capture staff numbers at their peak. United Utilities staff were also among the 300 who attended the event at the Mere Golf and Country Club in Knutsford, Cheshire.</p>\n<p style=\"text-align: justify;\">Guests paid a deposit to reserve their place at the ball, and this money was used to fund raffles for GCAâ€™s chosen charity: St Roccoâ€™s Hospice in Warrington, which cares for the terminally ill. Vanessa Simmons from St Roccoâ€™s was at the ball to be presented with a cheque for Â£3,620. On the night the jv board members made a further contribution to bring the total up to Â£4,000.</p>\n<p style=\"text-align: justify;\">â€œThe ball was a Great Celebration of Achievement and a thank-you to everyone in GCA for all their hard work,â€ said Costainâ€™s Herman Schurink, GCA Commercial Manager.</p>\n<p style=\"text-align: justify;\">BBC presenter Chris Hollins (of Watchdog and Strictly Come Dancing fame) hosted the Hollywood themed-event, which included its very own Oscars Ceremony.Â  Costainâ€™s Steve Dudley, Lead Programme MEICA Design, won an award for his Outstanding Contribution to GCA. Another prize went to Senior Site Manager Gary Thompson, Costainâ€™s very own Iron Man, who has recently begun to compete in Iron Man triathlons.</p>\n<p style=\"text-align: justify;\">*GCA has since helped raise further funds for St Roccoâ€™s in an â€˜Itâ€™s a Knockoutâ€™ type event for local businesses and organisations. â€œWe came 11th out of 12 - despite having a former professional rugby league player in our team!â€ said Herman. â€œNonetheless it was a day of smiles and laughter.â€</p>\n<p>Ends</p>",
  "summary": "<p>6 November 2013</p>\n<p style=\"text-align: justify;\">Costain staff and colleagues from the GCA (Galliford Try, Costain and Atkins) joint venture (jv) have collected Â£4,000 for a local hospice.</p>\n<p style=\"text-align: justify;\">The money was raised at a ball held to celebrate the hard work and achievement of GCAâ€™s AMP5 Framework. GCA has been working with client and alliance partner United Utilities in the AMP5 Framework since 2010. The Framework is set to run until March 2015 but the ball was timed to capture staff numbers at their peak. United Utilities staff were also among the 300 who attended the event at the Mere Golf and Country Club in Knutsford, Cheshire.</p>\n<p style=\"text-align: justify;\">Guests paid a deposit to reserve their place at the ball, and this money was used to fund raffles for GCAâ€™s chosen charity: St Roccoâ€™s Hospice in Warrington, which cares for the terminally ill. Vanessa Simmons from St Roccoâ€™s was at the ball to be presented with a cheque for Â£3,620. On the night the jv board members made a further contribution to bring the total up to Â£4,000.</p>\n<p style=\"text-align: justify;\">â€œThe ball was a Great Celebration of Achievement and a thank-you to everyone in GCA for all their hard work,â€ said Costainâ€™s Herman Schurink, GCA Commercial Manager.</p>\n<p style=\"text-align: justify;\">BBC presenter Chris Hollins (of Watchdog and Strictly Come Dancing fame) hosted the Hollywood themed-event, which included its very own Oscars Ceremony.Â  Costainâ€™s Steve Dudley, Lead Programme MEICA Design, won an award for his Outstanding Contribution to GCA. Another prize went to Senior Site Manager Gary Thompson, Costainâ€™s very own Iron Man, who has recently begun to compete in Iron Man triathlons.</p>\n<p style=\"text-align: justify;\">*GCA has since helped raise further funds for St Roccoâ€™s in an â€˜Itâ€™s a Knockoutâ€™ type event for local businesses and organisations. â€œWe came 11th out of 12 - despite having a former professional rugby league player in our team!â€ said Herman. â€œNonetheless it was a day of smiles and laughter.â€</p>\n<p>Ends</p>",
  "date": "2013-11-06T00:00:00.000Z",
  "pubdate": "2013-11-06T00:00:00.000Z"
  };