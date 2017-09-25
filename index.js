$(function () {
    $.get('songs.json').then(function (response) {
        let items = response;
        items.forEach((i)=>{
            let $li = $(`
        <li>
            <a href="./song.html?id=${i.id}">
              <h3>${i.name}</h3>
                <p>
                <svg class="sq">
                   <use xlink:href="#icon-sq"></use>
                </svg>
                    ${i.singer}</p>
                <svg class="play-circled">
                    <use xlink:href="#icon-play-circled"></use>
                </svg>
            </a>
        </li>`);

            $('#lastestMusic').append($li);
        });
        $('#lastestMusicLoading').remove();
    });

    $('.siteNav').on('click', 'ol.tabItems>li', function (e) {
        let $li = $(e.currentTarget).addClass('active');
        $li.siblings().removeClass('active');
        let index = $li.index();
        $li.trigger('tabChange', index);
        $('.tabContent > li').eq(index).addClass('active')
            .siblings().removeClass('active');
    });

    $('.siteNav').on('tabChange', function (e, index) {
        let $li = $('.tabContent > li').eq(index);
        if ($li.attr('data-downloaded')  === 'yes') {
            return;
        }
        if (index === 1) {
            $.get('./songs.json').then((response)=>{
                let items = response;
                items.forEach((i)=>{
                    let $song = $(`
<section class="lastestMusic">
    <ol>
        <li>
            <a href="./song.html?id=${i.id}">
              <h3>${i.name}</h3>
                <p>
                <svg class="sq">
                   <use xlink:href="#icon-sq"></use>
                </svg>
                    ${i.singer}</p>
                <svg class="play-circled">
                    <use xlink:href="#icon-play-circled"></use>
                </svg>
            </a>
        </li>
    </ol>
</section>`);
                    $li.append($song);
                })
                $('#Tab2Loading').remove();

                $li.attr('data-downloaded', 'yes');
            })
        } else if (index === 2) {
            $.get('./page3.json').then((response)=>{
               // $li.text(response.content);
                $li.attr('data-downloaded', 'yes');
            })
        }
    });

    let timer = undefined;
    $('input#searchSong').on('input', function (e) {
        let $input = $(e.currentTarget);
        let value = $input.val().trim();
        if (value === '') {return;}

        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            search(value).then((result)=>{
                timer = undefined;
                if (result.length !== 0) {
                    $('#output').text(result.map((r)=>r.name).join(','))
                } else {
                    $('#output').text('哎呀呀，没有搜到这首歌哟')
                }
            })
        }, 1000)
    });

    function search(keyword) {
        return new Promise((resolve, reject)=>{
            var database = [
                {
                    "id": "1",
                    "name": "带你去旅行",
                },
                {
                    "id": "2",
                    "name": "你不在南京",
                },
                {
                    "id": "3",
                    "name": "女孩你为何踮脚尖",
                },
                {
                    "id": "4",
                    "name": "再也没有",
                },{
                    "id": "5",
                    "name": "阳光宅男",
                },{
                    "id": "6",
                    "name": "追光者",
                },{
                    "id": "7",
                    "name": "你不要想起我",
                },{
                    "id": "8",
                    "name": "非酋",
                },{
                    "id": "9",
                    "name": "告白气球",
                },{
                    "id": "10",
                    "name": "最后一页",
                }
            ];
            let result = database.filter(function (item) {
                return item.name.indexOf(keyword) >= 0;
            });
            setTimeout(function () {
                resolve(result);
            }, (Math.random()*200 + 1000))
        })
    }
    window.search = search;
});