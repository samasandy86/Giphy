

    $(document).ready(function () {

        //========== STARTING GIF BUTTONS =======//
        /*  These are the starting buttons & gifs for the user */
        /*  Function for the initial buttons (let gifs variables) listed above  */
  
        let gifs = ["Funny Faces", "Silly", "Goofy", "Laughing","Michael Jordan", "Kevin Garnett", "Kobe Bryant","LeBron"];
  
        // ======= DISPLAY GIF IMAGES ========
        /* Displays GIFS on webpage    */
  
  
        function displayGiphyInfo(event) {
  
          const gif = $(event.target).data("name");
          const queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + gif + "&api_key=2P9avNVL5Yzlp3J98PRdhXYhJRndijLS&limit=20";
          $.ajax({
            url: queryURL,
            method: 'GET'
          }).then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
              let giphyRating = $(`<p style="font-size: 20px;">RATING: ${response.data[i].rating}</p>`);
              let giphyImages = $('<img>');
              giphyImages.attr("src", response.data[i].images.fixed_height_still.url);
              giphyImages.attr("data-still", response.data[i].images.fixed_height_still.url);
              giphyImages.attr("data-animate", response.data[i].images.fixed_height.url);
              giphyImages.attr("data-state", "still");
              giphyImages.addClass("image");
              $("#giphy-view").append(giphyRating, giphyImages);
            }
          })
  
        };
  
        //========= ADD NEW BUTTON ============//
        /* This fucntion adds buttons from users input */
        function renderButtons() {
          $("#giphy-buttons").empty();
          for (let i = 0; i < gifs.length; i++) {
            const button = $("<button>");
  
            button.addClass("btn btn-secondary gif");
            button.attr("data-name", gifs[i]);
            button.text(gifs[i]);
            $("#giphy-buttons").append(button);
  
            $(".close").append(button);
          }
        }
  
        //========= USERS INPUT ============//
        /* This function appends the user inputs to a button */
  
        $("#giphy-images").on("click", function (event) {
          event.preventDefault();
          let gif = $("#giphy-input").val().trim();
          gifs.push(gif);
          $('#giphy-input').val('');
  
          renderButtons();
        });
  
        //=========== ADDITIONAL NOTES FOR ABOVE SECTION===========//
  
        //  This function handles events where one button is clicked
        //  event.preventDefault() prevents the form from trying to submit itself.
        //  We're using a form so that the user can hit enter instead of clicking the button if they want
        //  This line will grab the text from the input box
        //  The gif from the textbox is then added to our array
        //  calling renderButtons which handles the processing of our gif array */
  
  
  
  
  
        //========= DELETE LAST BUTTON ========//
        //This function removes the added gif button
  
        function removeButton() {
          $(".close").click(function () {
            $(event.target).closest("giphy-buttons");
          });
        }
  
  
  
        //====== PAUSE & PLAY =========
        //This fucntion changes the still images to animated gifs
  
        $(document).on("click", ".image", function () {
          var state = $(this).attr('data-state');
          if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
          } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
          }
        });
  
        //========= CLEARING =======
        // This object clears the current gifs on screen when another button is clicked.
  
        $('#giphy-buttons').on('click', function (event) {
          event.preventDefault();
          $('#giphy-view').empty();
        });
  
        $(document).on("click", ".gif", displayGiphyInfo);
  
  
        renderButtons();
  
      });
      