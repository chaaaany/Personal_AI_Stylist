//네이버 날씨 크롤링
const axios = require("axios");
const cheerio = require("cheerio");

//axios를 활용해 AJAX로 HTML문서를 가져오는 함수 구현
async function getHtml () {
    try {
        return await axios.get('https://weather.naver.com/');
    } catch (error) {
    console.error(error);
    }
};

getHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("div.today_weather")

        $bodyList.each(function(i, elem) {
            ulList[i] = {
                location : $(this).find('strong.location_name').text(),
                temperature: $(this).find('strong.current').text().trim(),
                weather: $(this).find('span.weather').text()
            };
        });

        const data = ulList.filter(n => n.temperature);
        return data[0];
    })
    .then(res => console.log(res.location));