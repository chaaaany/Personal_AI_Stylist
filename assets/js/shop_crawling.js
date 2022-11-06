// 네이버 쇼핑 크롤링
const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
    try {
        return await axios.get("https://search.shopping.naver.com/search/all?query=%EC%B2%AD%EB%B0%94%EC%A7%80&cat_id=&frm=NVSHATC");
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
            title: $(this).find('a img').attr('alt'),
            url: $(this).find('a').attr('href'),
            image_url: $(this).find('a img').attr('src'),
            image_alt: $(this).find('a img').attr('alt'),
        };
    });

    const data = ulList.filter(n => n.title);
    return data;
})
.then(res => {
    console.log(res)
});