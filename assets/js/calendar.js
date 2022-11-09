// (1) 날짜 데이터 가져오기
let date = new Date();

const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    // year-month 채우기
    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    // 지난 달 마지막 Date, 이번 달 마지막 Date
    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    // Dates 기본 배열들
    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    // prevDates 계산
    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
        prevDates.unshift(PLDate - i);
        }
    }

    // nextDates 계산
    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i)
    }

    // Dates 합치기
    const dates = prevDates.concat(thisDates, nextDates);

    // Dates 정리
    // 이전 달, 다음 달 날짜 투명도 조절
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);
    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1
                        ? 'this'
                        : 'other';


        dates[i] = `<div class="date">
                        <span class="${condition}">${date}</span>
                        <div class="schedule-box">
                            <span class="schedule" id="${viewMonth+1}-${date}schedule"></span>
                        </div>
                        <div class="cody-box">
                            <img class="cody-image" id="${viewMonth+1}-${date}cody" />
                        </div>
                    </div>`;
    })

    // Dates 그리기
    document.querySelector('.dates').innerHTML = dates.join('');

    // 오늘 날짜 표시하기
    const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (+date.innerText === today.getDate()) {
                date.classList.add('today');
                break;
            }
        }
    }
}
  
renderCalendar();

// 지난달, 다음달 오늘 날짜로 돌아가기
const prevMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
}

const nextMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
}

const goToday = () => {
    date = new Date();
    renderCalendar();
}

/*
// 일정 추가
const add = () => {
    //alert("일정 추가")
}
*/



// 일정 추가를 위한 팝업
function show () {
    document.querySelector(".background").className = "background show";
}
  
function close () { 
    document.querySelector(".background").className = "background";
}

// 선택한 일정 담을 변수
let schedule;

function add () { 
    // 선택한 날짜 가져오기
    const date = document.getElementById('date-input').value;
    let day = date.split("-");

    if(day[1].slice(0, 1) === '0') {
        day[1] = day[1].slice(1);
    }

    if(day[2].slice(0, 1) === '0') {
        day[2] = day[2].slice(1);
    }

    document.getElementById(day[1]+'-'+day[2]+'schedule').textContent = schedule;

    // 일정 등록 팝업에서 선택된 내용들 초기화
    document.getElementById('date-input').value = null;
    document.getElementById("selectSchedule").selectedIndex = 0;
    //document.getElementsByClassName('dropbtn_content').textContent = "";
    schedule = null;

    document.querySelector(".background").className = "background";
}
  
document.querySelector("#show").addEventListener('click', show);
document.querySelector("#close").addEventListener('click', close);
document.querySelector("#add").addEventListener('click', add);


// 현지언니가 수정한 select 드롭다운으로 했을 때
// 선택한 일정 달력에 보여주기 위해 고를때 변수에 담아주기
selectSchedule=()=>{
    const selectSchedules = document.getElementById("selectSchedule");

    let selectValue = selectSchedules.options[selectSchedules.selectedIndex].textContent;
    schedule = selectValue;
}


/*

// 내가 기존에 했던 드롭다운으로 했을 때
// 일정 선택 트롭다운
window.onload=()=>{
    document.querySelector('.dropbtn_click').onclick = ()=>{
        dropdown();
    }
    document.getElementsByClassName('fastfood').onclick = ()=>{
        showMenu(value);
    };
    dropdown = () => {
        var v = document.querySelector('.dropdown-content');
        var dropbtn = document.querySelector('.dropbtn')
        v.classList.toggle('show');
        dropbtn.style.borderColor = 'rgb(94, 94, 94)';
    }

    showMenu=(value)=>{
        var dropbtn_icon = document.querySelector('.dropbtn_icon');
        var dropbtn_content = document.querySelector('.dropbtn_content');
        var dropbtn_click = document.querySelector('.dropbtn_click');
        var dropbtn = document.querySelector('.dropbtn');

        dropbtn_icon.innerText = '';
        dropbtn_content.innerText = value;
        dropbtn_content.style.color = '#252525';
        dropbtn.style.borderColor = '#3992a8';

        // 선택한 일정 달력에 보여주기 위해 고를때 변수에 담아주기
        schedule = value;
    }
}
window.onclick= (e)=>{
    if(!e.target.matches('.dropbtn_click')){
        var dropdowns = document.getElementsByClassName("dropdown-content");

        var dropbtn_icon = document.querySelector('.dropbtn_icon');
        var dropbtn_content = document.querySelector('.dropbtn_content');
        var dropbtn_click = document.querySelector('.dropbtn_click');
        var dropbtn = document.querySelector('.dropbtn');

        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

*/


// 코디 사진 추가를 위한 팝업
function show2 () {
    document.querySelector(".background2").className = "background2 show2";
}

function close2 () { 
    document.querySelector(".background2").className = "background2";
}

function add2 () { 
    // 선택한 날짜 가져오기
    const date = document.getElementById('date-input2').value;
    let day = date.split("-");

    if(day[1].slice(0, 1) === '0') {
        day[1] = day[1].slice(1);
    }

    if(day[2].slice(0, 1) === '0') {
        day[2] = day[2].slice(1);
    }

    // 선택한 이미지 캘린더에 보여주기
    document.getElementById(day[1]+'-'+day[2]+'cody').src = fileReader.result;

    // 코디 사진 등록 팝업에서 선택된 내용들 초기화
    document.getElementById('date-input2').value = null;
    document.getElementById('fileUpload2').value = "";
    document.getElementById("previewImg2").src = "";

    document.querySelector(".background2").className = "background2";
}

document.querySelector("#show2").addEventListener('click', show2);
document.querySelector("#close2").addEventListener('click', close2);
document.querySelector("#add2").addEventListener('click', add2);

// 선택한 이미지 보여주기
const fileInput = document.getElementById("fileUpload2");

let fileReader;
const handleFiles = (e) => {
    const selectedFile = [...fileInput.files];
    //const fileReader = new FileReader();
    fileReader = new FileReader();

    fileReader.readAsDataURL(selectedFile[0]);

    fileReader.onload = function () {
        document.getElementById("previewImg2").src = fileReader.result;
    };
};

fileInput.addEventListener("change", handleFiles);

selectSchedule=()=>{
    // 선택한 일정 달력에 보여주기 위해 고를때 변수에 담아주기

    const selectSchedules = document.getElementById("selectSchedule");

    let selectValue = selectSchedules.options[selectSchedules.selectedIndex].textContent;
    schedule = selectValue;
    console.log(selectValue);
}



// 백에 데이터 요청
// calendar 눌렀을 떄
$(document).ready(function() {
    $("#calendar").click(getSchedule); // 전체 일정
    $("#calendar").click(getCodyImage); // 전체 코디 사진
    $("#calendar").click(getRecent); // 최근 일정
    // 마이클로젯 기반 추천
    // 크롤링 추천
});

// '일정 추가' 눌렀을 때
$(document).ready(function() {
    $("#add").click(getSchedule);
});

// '코디 추가' 눌렀을 때
$(document).ready(function() {
    $("#add2").click(getCodyImage);
});

function getSchedule() { // 전체 일정
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

function getCodyImage() { // 전체 코디 사진
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/calendar/getCodyImage",
        data: {},
        success: function (response) {
            $.each($(data).find(''), function() {
                
            })
        }
    })
}

function getRecent() { // 최근 일정
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/calendar/getRecent",
        data: {},
        success: function (response) {
            $.each($(data).find(''), function() {
                
            })
        }
    })
}


// 최근 일정 기반 추천
function getScheduleMycloset() { // 마이클로젯 기반 추천
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/calendar/getScheduleMycloset",
        data: {},
        success: function (response) {
            $.each($(data).find(''), function() {
                
            })
        }
    })
}

function getScheduleCrawling() { // 크롤링 추천
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/calendar/getScheduleCrawling",
        data: {},
        success: function (response) {
            $.each($(data).find(''), function() {
                
            })
        }
    })
}



// `<div class="date">
//     <span class="${condition}">${date}</span>
//     <div class="schedule-box">
//         <span class="schedule" id="${viewMonth+1}-${date}schedule"></span>
//     </div>
//     <div class="cody-box">
//         <img class="cody-image" id="${viewMonth+1}-${date}cody" />
//     </div>
// </div>`