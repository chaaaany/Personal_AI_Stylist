import requests
from bs4 import BeautifulSoup
import re
from flask import Blueprint, request, render_template, flash, redirect, url_for
from flask import current_app as current_app

main = Blueprint('main', __name__, url_prefix='/')

@main.route('/main', methods=['GET'])

def index() : 
    url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=서울시 도봉구 날씨'
    res = requests.get(url)
    res.raise_for_status()

    soup = BeautifulSoup(res.text, 'lxml') 

    now_temp = soup.find('div',attrs = {'class':'temperature_text'}).get_text()

    now_wheth = soup.find('span',attrs = {'class':'weather before_slash'}).get_text()

    now_temp1 = now_temp.strip("현재 온도""°")
    
    return render_template('/main/weather.html', nowtemp = now_temp)