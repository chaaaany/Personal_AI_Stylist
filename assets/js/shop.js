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
        const $bodyList = $("ul.list_basis div")//.children("div")

        $bodyList.each(function(i, elem) {
            // console.log(elem);
            ulList[i] = {
                title: $(this).find('a').attr('title'),
                url: $(this).find('a').attr('href'),
                image_url: $(this).find('div.basicList_inner__xCM3J'),//.attr('src'),
                price: $(this).find('span.price_num__S2p_v').text()
            };
        });

        const data = ulList.filter(n => n.title);
        return data;
    })
    .then(res => {
        document.querySelector('#test').innerHTML = res[0].url;
        console.log(res[0].url);
        // 크롤링 결과 화면에 출력
        if (typeof document !== "undefined") {
            document.getElementById("test").href = res[0].url;
            console.log(res[0].url);
        }

        console.log(res);
    });




// 백에 데이터 요청    
// shop 눌렀을 때
$(document).ready(function() {
    $("#shop").click(recommend_crawling);
    $("#shop").click(recommend_mycloset);
});

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


document.querySelector("#top1-href").addEventListener('click', getHtml);