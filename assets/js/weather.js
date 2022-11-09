//네이버 날씨 크롤링
const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
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
        return data;
    })
    .then(res => {
        console.log(res)

        // 크롤링 결과 화면에 출력
        if (typeof document !== "undefined") {
            document.getElementById("top1-href").href = data[0].url;
        }
    });