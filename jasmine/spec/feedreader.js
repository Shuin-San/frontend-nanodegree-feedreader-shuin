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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Post contains URL', function(){
          allFeeds.forEach(function(theFeed){
            expect(theFeed.url).toBeDefined();
            expect(theFeed.url).not.toBe("");
          });
        })

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Post contains a name', function(){
           allFeeds.forEach(function(theFeed){
             expect(theFeed.name).toBeDefined();
             expect(theFeed.name).not.toBe("");
           });
         })
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){
      var $theBody = document.getElementsByTagName("BODY")[0];
      var $theButton = document.getElementsByClassName("menu-icon-link")[0];

          /* TODO: Write a test that ensures the menu element is
          * hidden by default. You'll have to analyze the HTML and
          * the CSS to determine how we're performing the
          * hiding/showing of the menu element.
          */
          it('is the menu hidden by default ?', function(){
            expect($theBody.classList[0] === "menu-hidden").toBe(true);
          })
          /* TODO: Write a test that ensures the menu changes
            * visibility when the menu icon is clicked. This test
            * should have two expectations: does the menu display when
            * clicked and does it hide when clicked again.
            */
            it('menu appears / hides when clicked', function(){
              document.getElementsByClassName("menu-icon-link")[0].click();
              expect($theBody.classList[0] === "menu-hidden").not.toBe(true);

              document.getElementsByClassName("menu-icon-link")[0].click();
              expect($theBody.classList[0] === "menu-hidden").toBe(true);
            })
          });

          /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
      var $theFeed;

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
      beforeEach(function(done) {
        loadFeed(0, function(){
          $theFeed = document.getElementsByClassName("feed")[0].childNodes;
          done();
        });
      })

      it('Loads at least one post ?', function(){
        expect($theFeed[0]).toBeDefined();
      })
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var startHTML;
        beforeEach(function(done) {
          loadFeed(0, function() {
            startHTML = window.document.querySelector(".feed").innerHTML;
            loadFeed(1, function() {
              done();
            });
          });
        });


        it('content changes successfully ?', function() {
          var newHTML = window.document.querySelector(".feed").innerHTML;
          expect(startHTML).not.toBe(newHTML);
        });
    });
}());
