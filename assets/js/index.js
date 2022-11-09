//마이클로젯 의류 표기
//return_mycloset = 받아온 json 데이터

// 절대 경로 붙이기
const ABSOLUTE_PATH = 'C:/node_workspace/express-mysql-example/public/images/';

// 옷 추가 눌렀을 때
$(document).ready(function() {
    $("#home").click(getCloset);
});

function getCloset() { // 옷 추가
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/mycloset/myclosetclothes",
        data: {},
        success: function (response) {
            let top_address_array = [];
            let bottom_address_array = [];
            let onepiece_address_array = [];
            let outer_address_array = [];

            var image_address = ""

            for(let image_name in return_mycloset['top']) {
                image_address = ABSOLUTE_PATH + image_name
                top_address_array.push(image_address)
            }

            for(let image_name in return_mycloset['bottom']) {
                image_address = ABSOLUTE_PATH + image_name
                bottom_address_array.push(image_address)
            }

            for(let image_name in return_mycloset['onepiece']) {
                image_address = ABSOLUTE_PATH + image_name
                onepiece_address_array.push(image_address)
            }

            for(let image_name in return_mycloset['outer']) {
                image_address = ABSOLUTE_PATH + image_name
                outer_address_array.push(image_address)
            }


            for(var i=0; i<Math.min(top_address_array.length, 3); i++) {
                document.getElementById("main_mycloset_top"+String(i+1)).src = top_address_array[i];
            }

            for(var i=0; i<Math.min(bottom_address_array.length, 3); i++) {
                document.getElementById("main_mycloset_bottom"+String(i+1)).src = bottom_address_array[i];
            }

            for(var i=0; i<Math.min(onepiece_address_array.length, 3); i++) {
                document.getElementById("main_mycloset_onepiece"+String(i+1)).src = onepiece_address_array[i];
            }

            for(var i=0; i<Math.min(outer_address_array.length, 3); i++) {
                document.getElementById("main_mycloset_outer"+String(i+1)).src = outer_address_array[i];
            }
        }
    })
}