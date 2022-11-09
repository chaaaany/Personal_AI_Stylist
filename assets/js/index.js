//마이클로젯 의류 표기
//return_mycloset = 받아온 json 데이터

//절대경로
const ABSOLUTE_PATH = ####

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



// 0, 1, 2, 3    
// for i in range(length(top_address_array)) : 
//     document.getElementById("mycloset-top"+str(i+1))