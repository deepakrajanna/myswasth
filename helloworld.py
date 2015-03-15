import cgi
import webapp2
import urllib
import os

from oauth2client import appengine
from oauth2client import client

from google.appengine.ext import db
from google.appengine.api import images
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers

import jinja2
import uuid

BASE_URL = "http://myswasth.appspot.com"
if os.environ['SERVER_SOFTWARE'].startswith('Development'):
    BASE_URL = "http://localhost:8080"

class ImageStoreHelper(db.Model):
    img = db.BlobProperty()


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    autoescape=True,
    extensions=['jinja2.ext.autoescape'])

# CLIENT_SECRETS, name of a file containing the OAuth 2.0 information for this
# application, including client_id and client_secret, which are found
# on the API Access tab on the Google APIs
# Console <http://code.google.com/apis/console>
CLIENT_SECRETS = os.path.join(os.path.dirname(__file__), 'client_secret.json')

# Helpful message to display in the browser if the CLIENT_SECRETS file
# is missing.
MISSING_CLIENT_SECRETS_MESSAGE = """
<h1>Warning: Please configure OAuth 2.0</h1>
<p>
To make this sample run you will need to populate the client_secrets.json file
found at:
</p>
<p>
<code>%s</code>.
</p>
<p>with information found on the <a
href="https://code.google.com/apis/console">APIs Console</a>.
</p>
""" % CLIENT_SECRETS

MAIN_PAGE_HTML = """\
<html>
  <body>
    Unsupported
  </body>
</html>
"""
PATIENT_DETAILS="""\
{
    "id":"1",
    "name":"Deepak"
}
"""


PATIENT_FAMILY_MEMBER_LIST="""\
            [
              { "id" : "1", "name": "Deepak" }
             ,{ "id" : "2", "name": "Manjari" }
             ,{ "id" : "3", "name": "Shekhar" }
             ,{ "id" : "4", "name": "Anant" }
             ]
"""

VISIT_1 ="""{
        "id": "1", 
        "date":"25/08/2014",
        "chiefComplaint":"Tooth Ache",
        "prescriptionImageUrl":"",
        "physicianName":"Dr. Rajnikant"
    } """
    
VISIT_2 ="""{
        "id": "2", 
        "date":"25/09/2013",
        "chiefComplaint":"Head Ache",
        "prescriptionImageUrl":"",
        "physicianName":"Dr. Thalaiva"
    } """
    
VISIT_3="""{
        "id": "3", 
        "date":"25/11/2014",
        "chiefComplaint":"Cold",
        "prescriptionImageUrl":"img/1.png",
        "physicianName":"Dr. Basha"
    }"""
    
VISIT_4="""{
        "id": "4", 
        "date":"05/01/2014",
        "chiefComplaint":"Cough",
        "prescriptionImageUrl":"img/1.png",
        "physicianName":"Dr. Muthu"
    }"""

VISIT_5="""{
        "id": "5", 
        "date":"11/05/2014",
        "chiefComplaint":"Body Ache",
        "prescriptionImageUrl":"img/1.png",
        "physicianName":"Dr. Enthiran"
    }"""
    
VISIT_6="""{
        "id": "6", 
        "date":"11/05/2013",
        "chiefComplaint":"Body Ache",
        "prescriptionImageUrl":"img/1.png",
        "physicianName":"Dr. Padaiyappan"
    }"""
    
VISITS_LIST = {"1":VISIT_1,"2":VISIT_2,"3":VISIT_3,"4":VISIT_4,"5":VISIT_5,"6":VISIT_6}

PATIENT_VISIT_DETAIL = {"1":[1,2,3], "2":[4,5], "3":[6] }


decorator = appengine.oauth2decorator_from_clientsecrets(
    CLIENT_SECRETS,
    scope='https://www.googleapis.com/auth/plus.me',
    message=MISSING_CLIENT_SECRETS_MESSAGE)

class MainPage(webapp2.RequestHandler):
    @decorator.oauth_required
    def get(self):
        print BASE_URL
        self.response.write(MAIN_PAGE_HTML)

class AboutHandler(webapp2.RequestHandler):

  @decorator.oauth_required
  def get(self):
    try:
        http = decorator.http()
        user = service.people().get(userId='me').execute(http=http)
        text = 'Hello, %s!' % user['displayName']
        
        template = JINJA_ENVIRONMENT.get_template('welcome.html')
        self.response.write(template.render({'text': text }))
    except client.AccessTokenRefreshError:
        self.redirect('/')
      
class Visits(webapp2.RequestHandler):
    @decorator.oauth_required
    def get(self, patientid):
        if (patientid in PATIENT_VISIT_DETAIL):
            flag = False
            jsonstr = ""
            
            for visitid in PATIENT_VISIT_DETAIL[patientid]:
                if flag==True:
                    jsonstr = jsonstr + ","
                jsonstr = jsonstr + VISITS_LIST[str(visitid)]
                flag = True
            self.response.write("[" + jsonstr +"]")
        else:
            self.response.write("Error")

class Visit(webapp2.RequestHandler):
    def get(self, patientid, visitid):
        if (patientid in PATIENT_VISIT_DETAIL):
            if (int(visitid) in PATIENT_VISIT_DETAIL[patientid]):
                self.response.write(VISITS_LIST[visitid])
                return
            else:
              self.response.write("Error")
        else:
            self.response.write("Error")
    def post(self):
        print "Called Post"
        
class Patient(webapp2.RequestHandler):
    def get(self):
        self.response.write(PATIENT_DETAILS)

class Family(webapp2.RequestHandler):
    def get(self, patient_id):
        self.response.write(PATIENT_FAMILY_MEMBER_LIST)

class UploadHandler(webapp2.RequestHandler):
    def post(self):
        print "Called UploadHandler"
        imgblock = ImageStoreHelper(parent=db.Key.from_path('Test','images'))
        imgblock.img=db.Blob(images.resize(self.request.get('file'),640,640))
        imgkey = imgblock.put()
        urlgen=BASE_URL+"/img?img_id="+str(imgkey)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        self.response.out.write(urlgen)

    def get(self, uniqid):
        
        print "Get not supported"   


class ImageHandler(webapp2.RequestHandler):
  def get(self):
    imgblob = db.get(self.request.get('img_id'))
    print self.request.get('img_id')
    if imgblob.img:
        self.response.headers['Content-Type']='image/png'
        self.response.out.write(imgblob.img)
    else:
        self.response.out.write('No image')
    
    
application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/upload', UploadHandler),
    ('/img', ImageHandler),
    ('/api/visits/(.*)', Visits),
    ('/api/visit/(.*)/(.*)',Visit),
    ('/api/get_patient_id',Patient),
    ('/api/get_family_members/(.*)',Family),
    (decorator.callback_path, decorator.callback_handler()),
], debug=True)