import requests
from bs4 import BeautifulSoup
import json
from pandas import DataFrame as df
import pandas as pd
import sys

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time

page = requests.get("https://awesomenear.com/projects")
soup = BeautifulSoup(page.content,"html.parser")

projects_name = []
projects_href = []
projects_category = []
projects_subtitle = []
project_series = []
project_socialmedia_links = []
project_website = []
project_dapp = []
project_buy = []
project_stake = []
project_sm_fb = []
project_sm_linkedin = []
project_sm_telegram = []
project_sm_discord = []
project_sm_twitter = []
project_sm_medium = []
project_sm_github = []
project_sm_others = []
project_abbv = []
project_img_src = []
project_token_contract_near = []
project_token_contract_aurora = []
project_token_contract_eth = []
project_token_contract_others = []
project_description = []
project_grants = []
project_articles = []
project_count = 0


getdata_fromexcel = True 
record_count = 500
loop = 0
def SeparateSocialMediaLinks(project_socialmedia_links):
    for item in project_socialmedia_links:
        item_links = item.split(',')
        fb_link = ''
        github_link = ''
        linkedin_link = ''
        medium_link = ''
        twitter_link = ''
        telegram_link = ''
        discord_link = ''
        others_link = []
        for indiv_item_links in item_links:
            if "facebook.com" in indiv_item_links:
                fb_link = indiv_item_links
            elif "twitter.com" in indiv_item_links:
                twitter_link = indiv_item_links
            elif "medium.com" in indiv_item_links:
                medium_link = indiv_item_links
            elif "t.me" in indiv_item_links:
                telegram_link = indiv_item_links
            elif "github.com" in indiv_item_links:
                github_link = indiv_item_links
            elif "linkedin.com" in indiv_item_links:
                linkedin_link = indiv_item_links
            elif "discord.com" in indiv_item_links:
                discord_link = indiv_item_links
            else:
                others_link.append(indiv_item_links)

        project_sm_fb.append(fb_link)
        project_sm_discord.append(discord_link)
        project_sm_linkedin.append(linkedin_link)
        project_sm_medium.append(medium_link)
        project_sm_others.append(",".join(others_link))  
        project_sm_telegram.append(telegram_link)
        project_sm_twitter.append(twitter_link)   
        project_sm_github.append(github_link)    

def GetHREF(soup):   
    project_count = 0
    projects_info = soup.find_all(class_ = 'column col-4 col-lg-6 col-sm-12')   
    for project_info in projects_info:
        if project_count < 1000 :            
            projects_href_extract = project_info.find(class_='near-item mainnet') 
            if projects_href_extract is not None:            
                projects_href.append('https://awesomenear.com' + projects_href_extract['href'])
            else:
                projects_href.append('https://awesomenear.com/onmachina')

            project_name_extract = project_info.find(class_ = 'tile-title')        
            projects_name.append(project_name_extract.get_text()) 
            
            categories_info = project_info.find(class_ = 'tile-tags')
            cat_text = []
            for category in categories_info:            
                cat_text.append(category.get_text())            
            projects_category.append( ",".join(cat_text))  

            project_subtitle_extract = project_info.find(class_ = 'tile-subtitle')
            projects_subtitle.append(project_subtitle_extract.get_text())
            project_count = project_count + 1

def GetDataFromSelenium(): 
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    driver = webdriver.Chrome('C:\\Users\\vinod\\OneDrive\\Desktop\\chromedriver_win32\\chromedriver',chrome_options=options) 
    #driver = webdriver.Chrome('C:\\Users\\vinod\\Downloads\\chromedriver_win32',chrome_options=options) 
    driver.maximize_window()
    driver.get('https://awesomenear.com/projects') 
    driver.implicitly_wait(200)    

    scheight = .1
    while scheight < 0.30:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight/%s);" % scheight)
        scheight += .01        

        time.sleep(5)
        html = driver.page_source
        project_soup = BeautifulSoup(html,"html.parser")
        if scheight > 0.30:
            GetHREF(project_soup)

#Scraped all AwesomeNear projects and saved as CSV (as it was time consuming). CSV has project name, SubTitle, Tags and AwesomeNear Link.
#Form a dataframe with the records in CSV. Did this twice separately - once for first 500 and again for last 500.
if getdata_fromexcel:
    dataframe1 = pd.read_csv('CheckProjectList - Copy.csv')
    projects_href = dataframe1['AwesomeNearLink'][0:500]   
    projects_name = dataframe1['ProjectName'][0:500]
    projects_category = dataframe1['Tags'][0:500]
    projects_subtitle = dataframe1['Subtitle'][0:500]
else:    
    GetDataFromSelenium()

for href in projects_href: 
    loop = loop + 1
    if href != "":
        options = Options()
        options.add_argument('--headless')
        options.add_argument('--disable-gpu')
        driver = webdriver.Chrome('C:\\Users\\vinod\\OneDrive\\Desktop\\chromedriver_win32\\chromedriver',chrome_options=options) 
        driver.get(href) 
        time.sleep(5) 
        html = driver.page_source
        project_soup = BeautifulSoup(html,"html.parser")
        
        articles_links = []
        articles_details = project_soup.find_all(class_ = 'article-item')
        if articles_details is not None:
            for indiv_articles in articles_details:
                articles_links.append('https://awesomenear.com' + indiv_articles['href'])
        project_articles.append(";".join(articles_links))
        
        desc_para_details = project_soup.find(class_ = 'content-widget markdown')
        li_text = ""
        for li_indiv_text in desc_para_details.find_all('li'):
            li_text = li_text + ',' + li_indiv_text.get_text()
        new_tag = project_soup.new_tag("p")
        new_tag.string = li_text + '.'
        print(new_tag)        
        ul_replace = [ul.replace_with(new_tag) for ul in desc_para_details.find_all('ul')] 

        desc_text = ""
        for para in desc_para_details.find_all('p'):
            desc_text = desc_text + ' ' + para.get_text()
        project_description.append(desc_text) 

        desc_grants_details = project_soup.find(class_ = 'content-grants')
        grants_text = []
        if desc_grants_details is not None:
            desc_grants_all_divs = desc_grants_details.find_all('div')
            for indiv_grants_div in desc_grants_all_divs:
                grants_text.append(indiv_grants_div.get_text())
        project_grants.append( ",".join(grants_text))  
        
        token_details = project_soup.find_all(class_ = 'token-widget-label')
        near_token = ''
        aurora_token = ''
        eth_token = ''
        other_token = ''
        for token in token_details:            
            tokencontract_text = token.get_text().lower()
            if "near chain" in tokencontract_text:
                near_token = token.a['href']
            elif "aurora chain" in tokencontract_text:
                aurora_token = token.a['href']
            elif "ethereum chain" in tokencontract_text:
                eth_token = token.a['href']
            else:
                other_token = token.a['href']
            
        project_token_contract_near.append(near_token)
        project_token_contract_aurora.append(aurora_token)
        project_token_contract_eth.append(eth_token)
        project_token_contract_others.append(other_token)

        series_details = project_soup.find(class_ = 'hero-series')  
        series_text = []        
        for series in series_details:        
            series_text.append(series.get_text())         
        project_series.append( ",".join(series_text))         

        title_small_details = project_soup.select_one(".hero-title > small")
        if title_small_details is not None:
            project_abbv.append(title_small_details.get_text(strip=True))
        else:
            project_abbv.append('')
        
        project_img_details = project_soup.select_one(".hero-img > img")      
        project_img_src.append(project_img_details['src'])

        project_website_details = project_soup.select_one("a:contains('Visit Website')")
        if project_website_details is not None:
            project_website.append(project_website_details['href'])   
        else:
            project_website.append('')  

        project_buy_details = project_soup.select_one("a:contains('Buy')")
        if project_buy_details is not None:
            project_buy.append(project_buy_details['href'])
        else:
            project_buy.append('')        

        project_stake_details = project_soup.select_one("a:contains('Stake')")
        if project_stake_details is not None:
            project_stake.append(project_stake_details['href'])
        else:
            project_stake.append('')        

        project_dapp_details = project_soup.select_one(".btn-group > a:contains('DApp')")        
        if project_dapp_details is not None:
            project_dapp.append(project_dapp_details['href'])
        else:
            project_dapp.append('')
        #print(project_dapp)

        website_level = 0
        website_inner_level = 0  
        links_div_details = project_soup.find_all(class_ = 'hero-links')   
        
        for link_div in links_div_details:            
            if website_level == 0: 
                pass     
            else:
                socialmedia_links = link_div.find_all('a')
                media_links = []
                for indiv_links in socialmedia_links:
                    media_links.append(indiv_links['href']) 
                project_socialmedia_links.append(",".join(media_links))                
            website_level = website_level + 1
    else:
        project_series.append("")  

    if loop > record_count:
        break    

SeparateSocialMediaLinks(project_socialmedia_links)

data = { 'ProjectName' : projects_name,'Category' : projects_category, 'Subtitle' : projects_subtitle, 'AwesomeNearLink' : projects_href,
            'Series' : project_series, 'ABBV' : project_abbv,'Icon':project_img_src,
            'Website Link' : project_website, 'Buy Link':project_buy, 'Stake Link': project_stake , 'DApp Link' : project_dapp,
            'Facebook': project_sm_fb, 'Twitter' : project_sm_twitter, 'Github' :project_sm_github,
            'Telegram' : project_sm_telegram, 'Discord' : project_sm_discord, 'Linkedin': project_sm_linkedin,
            'Medium' : project_sm_medium, 'Other Links' : project_sm_others,
            'Near Token' : project_token_contract_near,'Aurora Token' : project_token_contract_aurora,
            'Ethereum Token' : project_token_contract_eth, 'Other Tokens' : project_token_contract_others,
            'Description' : project_description, 'Grants' : project_grants,'News Articles' : project_articles}
#data = {'ProjectName' : projects_name,'Category' : projects_category, 'Subtitle' : projects_subtitle, 'AwesomeNearLink' : projects_href,'Tags' : project_series,'Website': project_website,'Social Media Links' : project_socialmedia_links}
#data = {'ProjectName' : projects_name, 'Category' : projects_category, 'Subtitle' : projects_subtitle,'AwesomeNearLink' : projects_href}
df = pd.DataFrame(data)
df.to_csv("Last.csv",index = False)
