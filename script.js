$(document).ready(function () {
    var topics = ["Superman", "Batman", "Spiderman", "Ironman", "Captain America"];
    $("<div>").addClass("hero-buttons").prependTo(".container");
    $("<div>").addClass("search").prependTo(".container");
    $(".search").append("<input type='text' class='search-box' placeholder='Search for a gif!'>");
    $(".search").append("<button class='submit'>Search</button>");

    $.each(topics, function (index, value) {
        $('.hero-buttons').prepend($("<br>" + "<button class='searchThis'>").text(value));
    });

    $(".submit").on('click', createButton);
    $('.search-box').on('keydown', function (e) {
        if (e.keyCode === 13) {
            createButton();
        }
    });
    $(document).on('click', '.searchThis', function () {
        var term = $(this).text().replace(/\s+/g, "+"),
            url = 'https://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC&limit=10';
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (response) {
            $('.gifHolder').empty();
            $.each(response.data, function (index, value) {
                $('.gifHolder')
                    .append($('<div class="image">')
                        .append('<p>Rating: ' + value.rating)
                        .append($('<img>')
                            .attr('src', value.images.fixed_height_still.url)
                            .attr('data-still', value.images.fixed_height_still.url)
                            .attr('data-animate', value.images.fixed_height.url)
                            .attr('data-state', 'still')));
            });

        });
    });
    $(document).on('click', 'img[src$=".gif"]', function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });


    function createButton() {
        var term = $(".search-box").val().trim().replace(/\s+/g, "+"),
            url = 'https://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC&limit=10';
        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (response) {
            console.log(response);
            if (response.data.length != 0) {
                $('.hero-buttons').prepend($("<br>" + "<button class='searchThis'>").html($(".search-box").val().trim()
                    .replace(/\w\S*/g, function (txt) {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    })));
                $(".search-box").val('');
            }
            else {
                alert("Search does not return any results.")
            }
        });
    }
});