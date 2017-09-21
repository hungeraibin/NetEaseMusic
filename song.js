$(function () {
    $.get("./lyric.json").then(function (object) {
        //let lyric = object.lyric;
        let {lyric} = object;
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
    });

    let audio = document.createElement('audio');
    audio.src = "//m10.music.126.net/20170921141805/1ebfac3e86459736df67ad23f29468a0/ymusic/e336/280a/b479/b378a26888fee12e50925f16162ba910.mp3";
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
});