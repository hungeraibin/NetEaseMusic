$(function () {
    let id = parseInt(location.search.match(/\bid=([^&]*)/)[1], 10);

    $.get('./songs.json').then(function (response) {
        let songs = response;
        let song = songs.filter((s)=>{
            return (s.id == id);
        })[0]
        let {url, name, lyric} = song;
        initPlayer.call(undefined, url);
        initText(name, lyric);
    });
    
    function initText(name, lyric) {
        $('.song-description > h1').text(name);
        parseLyric(lyric);
    }

    function initPlayer(url) {
        let audio = document.createElement('audio');
        audio.src = url;
        audio.oncanplay = function () {
            audio.play();
            $('.dist-container').addClass('playing');
        }
        $('.icon-pause').on('touchstart', function () {
            audio.pause();
            $('.dist-container').removeClass('playing');
        })
        $('.icon-play').on('touchstart', function () {
            audio.play();
            $('.dist-container').addClass('playing');
        })
    }

    function parseLyric(lyric) {
        let array = lyric.split('\n');
        let regex = /^\[(.+)\](.*)$/;
        array = array.map(function (string) {
            let matches = string.match(regex);
            if (matches) {
                return {
                    time: matches[1],
                    words: matches[2]
                }
            }
        })
        let $lyric = $('.lyric');
        array.map(function (object) {
            if (!object) {return}
            let $p = $('<p/>');
            $p.attr('data-time', object.time).text(object.words);
            $p.appendTo($lyric.children('.lines'));
        })
    }




});