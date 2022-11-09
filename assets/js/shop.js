// 해당 옷 페이지로 이동
// function move () {
//     window.open('https://www.naver.com/');
// }




// 네이버 쇼핑 크롤링
const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
    try {
        keyword = '%EC%B2%AD%EB%B0%94%EC%A7%80';
        return await axios.get('https://search.shopping.naver.com/search/all?query=' + keyword + '&cat_id=&frm=NVSHATC');
    } catch (error) {
    console.error(error);
    }
};

getHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("ul.list_basis div div")//.children("div")

        $bodyList.each(function(i, elem) {
            console.log(elem);
            ulList[i] = {
                // title: $(this).find('a').attr('title'),
                title: $(this).find('a.thumbnail_thumb__Bxb6Z img').attr('alt'),
                url: $(this).find('a').attr('href'),
                image_url: $(this).find('div.basicList_info_area__TWvzp'),//.attr('src'),
                // image_url: document.querySelector("li div div.basicList_img_area__AdRY_ div a img"),
                price: $(this).find('span.price_num__S2p_v').text()
            };
        });

        const data = ulList.filter(n => n.title);
        return data;
    })
    .then(res => {
        console.log(res)

        // 크롤링 결과 화면에 출력
        if (typeof document !== "undefined") {
            // document.getElementById("top1-href").href = data[0].url;
            // document.querySelector("#top1-href").href = data[0].url;
            document.getElementById("test").href = data[0].url;
            console.log(data[0].url);
        }
    });




// 백에 데이터 요청    
// shop 눌렀을 때
// $(document).ready(function() {
//     $("#shop").click(recommend_crawling);
//     $("#shop").click(recommend_mycloset);
// });

// 취향 기반 추천 리스트 요청
function recommend_crawling() {
    $.ajax({
            type: "GET",
            url: "http://localhost:3000/shop/recommendationlist",
            data: {},
            success: function (response) {
                console.log(response);
            }
    })
};

// 옷장 기반 추천 리스트 요청
function recommend_mycloset() {
    $.ajax({
            type: "GET",
            url: "http://localhost:3000/findfrommycloset",
            data: {},
            success: function (response) {
                console.log(response);
            }
    })
};