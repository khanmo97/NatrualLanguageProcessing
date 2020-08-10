import http.server
import socketserver
import json
import tweepy
import csv 
from textblob import TextBlob
import praw
import re

defaultUsername = 'mohammed'
defaultPassword = 'password'

def processTweetPhrase(searchText):
    consKey='m7D3STDCc6WMuZdIXDejSyZxi'
    consKeySec='suKdHr0ORtIYbqRxH3H1x6aNHcwxVlsgnBmtUbWjOEkxzPlyXV'
    acToken='1272604412666621957-oOVZTyJNKT0iGhSz04ptn6kKeA9i4F'
    acTokenSec='ELMqJ0M9RGYdb3AtvwI806beAisEuJHrh50VPk1IgaLQS'

    aKey= tweepy.OAuthHandler(consKey, consKeySec)
    aKey.set_access_token(acToken, acTokenSec)
 
    api=tweepy.API(aKey)

    hashtag = searchText
    hashtagList = hashtag.split()
    avg=0
    maxTweets=10
    sentScore=0


    for x in hashtagList:
        for tweet in tweepy.Cursor(api.search,q=x+' -filter:retweets', lang="en", tweet_mode='extended').items(maxTweets) : 
            tweetSent=TextBlob(tweet.full_text)
            sentScore+=tweetSent.sentiment.polarity
            print(tweet.full_text.replace('\n', ' '))
            print('\n')

    avg=sentScore/maxTweets
    avg=round(avg*100,2)
    return avg

def processRedditPhrase(searchRedText):
    clientId='gnESpqRTBGNuKQ'
    clientSecret= 'Mx9uM7CCQ88ojrrc8nsHjzGTjD4'
    userAgent='RedditNLP'
    userName='khanmo97'
    pword='1Whatisit?'

    searchFor=input('Reddit search phrase\n')
    reddit=praw.Reddit(client_id=clientId, client_secret=clientSecret,user_agent=userAgent,username=userName,password=pword)
    subred=reddit.subreddit('politics').search('title:' + searchFor)
    new=subred.new(limit=20)
    type(new)
    x=next(new)
    dir(new)
    for i in new:
        sentScore=TextBlob(i.title)
    #sentScore=TextBlob()
    avg=sentScore/20
    return str(round(avg*100,2))

class MyHandler(http.server.BaseHTTPRequestHandler):

   
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        data = json.loads((self.rfile.read(int(self.headers['content-length']))).decode('utf-8'))

        results = processTweetPhrase(data['searchText'])
        response = json.dumps({'sentiment_score': results})
        self.wfile.write(response.encode(encoding='utf_8'))

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("192.168.0.18", PORT), MyHandler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()