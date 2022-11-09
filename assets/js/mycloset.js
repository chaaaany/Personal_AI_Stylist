// 의류 등록 위한 팝업
function show () {
    document.querySelector(".background").className = "background show";
}

function close () { 
document.querySelector(".background").className = "background";
}

document.querySelector("#show").addEventListener('click', show);
document.querySelector("#close").addEventListener('click', close);

// 선택한 이미지 보여주기
const fileInput = document.getElementById("fileUpload");

let fileReader;
const handleFiles = (e) => {
    const selectedFile = [...fileInput.files];
    //const fileReader = new FileReader();
    fileReader = new FileReader();

    fileReader.readAsDataURL(selectedFile[0]);

    fileReader.onload = function () {
        document.getElementById("previewImg").src = fileReader.result;
    };
};

fileInput.addEventListener("change", handleFiles);

// 나의 옷 사진 추가하기
function add () {
    // 등록할 사진 DB에 전달 후 웹페이지에 보여줘야할 부분
    // 상의료 분류되게 함
    const src = fileReader.result;
    
    const cloth =
        `<div class="port_item xs-m-top-30">
            <div class="port_img">
                <img src="${src}" alt="" />
                <div class="port_overlay text-center">
                    <a href="${src}" class="popup-img">+</a>
                </div>
            </div>
        </div>`;

    // 이미지 클로젯에 나타나게 하기
    document.querySelector("#new-add-cloth").innerHTML = cloth;

    // 팝업에서 선택한 것들 초기화
    document.getElementById('fileUpload').value = "";
    document.getElementById("previewImg").src = "";

    document.querySelector(".background").className = "background";
}

document.querySelector("#add").addEventListener('click', add);




// id="add" 눌렀을 때
$(document).ready(function() {
    $("#add").click(getCloset);
});

function getCloset() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/calendar/getSchedule",
        data: {},
        success: function (response) {
            $.each($(data).find(''), function() {
                
            })
        }
    })
}