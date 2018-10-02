/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loop through each feed in the allFeeds object
         *and ensure it has a URL defined
         * and that the URL is not empty.
         */

        it('Post contains URL', function(){
          allFeeds.forEach(function(theFeed){
            expect(theFeed.url).toBeDefined();
            expect(theFeed.url).not.toBe("");
          });
        })

        /* Loop through each feed in the allFeeds object
         * and ensure it has a name defined
         * and that the name is not empty.
         */

         it('Post contains a name', function(){
           allFeeds.forEach(function(theFeed){
             expect(theFeed.name).toBeDefined();
             expect(theFeed.name).not.toBe("");
           });
         })
    });

// Test the menu
    describe('The menu', function(){
      var $theBody = $(document.body);
      var $theButton = $( ".menu-icon-link");

          // make sure the menu is hidden by default

          it('is the menu hidden by default ?', function(){
            expect($theBody.hasClass("menu-hidden")).toBe(true);
          })
          // Test click functionality
            it('menu appears / hides when clicked', function(){
              $theButton.click();
              expect($theBody.hasClass("menu-hidden")).not.toBe(true);

              $theButton.click();
              expect($theBody.hasClass("menu-hidden")).toBe(true);
            })
          });

          // loadFeed() Tests

    describe('Initial Entries', function(){
      var $theFeed;

        /* Test if loadFeed() is called , and it effectively loads feeds.
         * using done() because the call is async
         */

      beforeEach(function(done) {
        loadFeed(0, function(){
          done();
        });
      })

      it('Loads at least one post ?', function(){
        expect ($('.feed .entry').length).toBeGreaterThan(0);
      })
    });

    /* Test if the new feed is loaded */

    describe('New Feed Selection', function() {
        var startHTML;
        beforeEach(function(done) {
          loadFeed(0, function() {
            // Save old feed in a variable
            startHTML = window.document.querySelector(".feed").innerHTML;
            // Load new feed
            loadFeed(1, function() {
              done();
            });
          });
        });

        // Time to compare startHTML and newHTML
        it('content changes successfully ?', function() {
          var newHTML = window.document.querySelector(".feed").innerHTML;
          expect(startHTML).not.toBe(newHTML);
        });
    });
}());
