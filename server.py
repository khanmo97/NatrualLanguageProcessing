import http.server
import socketserver
import json
import tweepy
import csv 
from textblob import TextBlob
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
    maxTweets=200
    negative=0
    positive=0
    neutral=0


    for x in hashtagList:
        for tweet in tweepy.Cursor(api.search,q=x+' -filter:retweets', lang="en", tweet_mode='extended').items(maxTweets) : 
            tweetSent=TextBlob(tweet.full_text)
            
            polarity = tweetSent.sentiment.polarity
            
            if polarity < -0.15:
                negative = negative + 1
            elif polarity > 0.15:
                positive = positive + 1
            elif polarity != 0.0:
                neutral = neutral + 1
            full_text = tweet.full_text.encode("ascii", "ignore").decode()
            print(full_text)
            print('\n')

    return {'negative': negative, 'positive': positive, 'neutral': neutral}

class MyHandler(http.server.BaseHTTPRequestHandler):

   
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        data = json.loads((self.rfile.read(int(self.headers['content-length']))).decode('utf-8'))
        print(data)
        results = processTweetPhrase(data['searchText'])
        response = json.dumps({'sentiment_score': results})
        self.wfile.write(response.encode(encoding='utf_8'))

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

httpd = socketserver.TCPServer(("192.168.1.68", PORT), MyHandler)
print("serving at port", PORT)
httpd.serve_forever()