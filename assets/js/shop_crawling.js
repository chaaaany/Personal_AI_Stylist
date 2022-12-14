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
        const $bodyList = $("ul.list_basis div").children("div")

        $bodyList.each(function(i, elem) {
            ulList[i] = {
                title: $(this).find('a').attr('title'),
                url: $(this).find('a').attr('href'),
                image_url: $(this).find('div.basicList_img_area__AdRY_ div a img').attr('src'),
                price: $(this).find('span.price_num__S2p_v').text()
            };
        });

        const data = ulList.filter(n => n.title);
        return data;
    })
    .then(res => {
        console.log(res)
    });