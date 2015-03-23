import cgi
import webapp2
import urllib
import os
import time


from oauth2client import appengine
from oauth2client import client

from google.appengine.ext import db
from google.appengine.api import images
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers

import jinja2
import uuid
from google.appengine.ext.ndb.tasklets import sleep

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
PATIENT_DETAILS = """\
{
    "id":"1",
    "name":"Deepak"
}
"""


PATIENT_FAMILY_MEMBER_LIST = """\
            [
              { "id" : "1", "name": "Deepak" }
             ,{ "id" : "2", "name": "Manjari" }
             ,{ "id" : "3", "name": "Shekhar" }
             ]
"""

VISIT_1 = """{
        "id": "1", 
        "date":"25/08/2014",
        "chiefComplaint":"Tooth Ache",
        "prescriptionImageUrl":"",
        "physicianName":"Dr. Rajnikant"
    } """
    
VISIT_2 = """{
        "id": "2", 
        "date":"25/09/2013",
        "chiefComplaint":"Head Ache",
        "prescriptionImageUrl":"",
        "physicianName":"Dr. Thalaiva"
    } """
    
VISIT_3 = """{
        "id": "3", 
        "date":"25/11/2014",
        "chiefComplaint":"Cold",
        "prescriptionImageUrl":"img/1.png",
        "physicianName":"Dr. Basha"
    }"""
    
VISIT_4 = """{
        "id": "4", 
        "date":"05/01/2014",
        "chiefComplaint":"Cough",
        "prescriptionImageUrl":"img/1.png",
        "physicianName":"Dr. Muthu"
    }"""

VISIT_5 = """{
        "id": "5", 
        "date":"11/05/2014",
        "chiefComplaint":"Body Ache",
        "prescriptionImageUrl":"img/1.png",
        "physicianName":"Dr. Enthiran"
    }"""
    
VISIT_6 = """{
        "id": "6", 
        "date":"11/05/2013",
        "chiefComplaint":"Body Ache",
        "prescriptionImageUrl":"img/1.png",
        "physicianName":"Dr. Padaiyappan"
    }"""
    
TEST_1 = """{
        "id": "1", 
        "date":"25/08/2014",
        "test_name":"BP",
        "testImageUrl":"img/1.png"
    } """
    
TEST_2 = """{
        "id": "2", 
        "date":"25/09/2013",
        "test_name":"Lipid Profile",
        "testImageUrl":"img/1.png"
    } """
    
TEST_3 = """{
        "id": "3", 
        "date":"25/11/2014",
        "test_name":"Kidney Failure",
        "testImageUrl":"img/1.png"
    }"""
    
TEST_4 = """{
        "id": "4", 
        "date":"05/01/2014",
        "test_name":"Diabetes",
        "testImageUrl":"img/1.png"
    }"""

TEST_5 = """{
        "id": "5", 
        "date":"11/05/2014",
        "test_name":"Blood",
        "testImageUrl":"img/1.png"
    }"""
    
TEST_6 = """{
        "id": "6", 
        "date":"11/05/2013",
        "test_name":"BP",
        "testImageUrl":"img/1.png"
    }"""
    
COMMON_COMPLAINTS = """ {
   "summary": {
       "num_visits": "5",
       "common_complaints": {
           "complaint": [
               "Cold",
               "Body Ache",
               "Tooth Ache"
           ]
       }
   }
}"""

APPLICABLE_CASES = """ [
    {
        "code": "diabetes",
        "name": "Diabetes",
        "chart_data": {
            "x": [
                "2013-01-01",
                "2014-01-02",
                "2013-01-03",
                "2013-01-04",
                "2013-01-05",
                "2013-01-06",
                "2013-01-07"
            ],
            "data1": [
                220,
                320,
                0,
                0,
                280,
                270,
                250
            ],
            "data2": [
                150,
                240,
                0,
                0,
                220,
                250,
                220
            ],
            "data3": [
                150,
                150,
                150,
                150,
                150,
                150,
                150
            ],
            "data4": [
                120,
                120,
                120,
                120,
                120,
                120,
                120
            ]
        },
        "chart_data_names":{
            
            "data1" : "Systolic",
            "data2" : "Diastolic",
            "data3" : "Target",
            "data4" : "Target"
                                    
        },
        "chart_data_types":{
            "data3" : "line",
            "data4" : "line"
        },
        "chart_data_colors":{
            "pattern": [
                "blue",
                "green",
                "blue",
                "green"
            ]
        },
        "chart_data_axis":{
            "x": {
                "type": "category",
                "tick": {
                    "rotate": 75,
                    "multiline": false
                }
            }
        }
    },
    {
        "code": "bp",
        "name": "Blood Pressure",
        "chart_data": {
            "x": [
                "2013-01-01",
                "2014-01-02",
                "2013-01-03",
                "2013-01-04",
                "2013-01-05",
                "2013-01-06",
                "2013-01-07"
            ],
            "data1": [
                220,
                320,
                0,
                0,
                280,
                270,
                250
            ],
            "data2": [
                150,
                240,
                0,
                0,
                220,
                250,
                220
            ],
            "data3": [
                150,
                150,
                150,
                150,
                150,
                150,
                150
            ],
            "data4": [
                120,
                120,
                120,
                120,
                120,
                120,
                120
            ]
        },
        "chart_data_names":{
            
            "data1" : "Systolic",
            "data2" : "Diastolic",
            "data3" : "Target",
            "data4" : "Target"
                                    
        },
        "chart_data_types":{
            "data3" : "line",
            "data4" : "line"
        },
        "chart_data_colors":{
            "pattern": [
                "red",
                "yellow",
                "red",
                "yellow"
            ]
        },
        "chart_data_axis":{
            "x": {
                "type": "category",
                "tick": {
                    "rotate": 75,
                    "multiline": false
                }
            }
        }
    }
]"""

RECOMMENDATIONS = """ 
    {
        "diabetes": {
            "recommendations": {
                "recommendation": [
                    "Exercise regularly",
                    "Reduce fats in your diet"
                ]
            }
        },
        "bp": {
            "recommendations": {
                "recommendation": [
                    "Hangout more with friends",
                    "More sex"
                ]
            }
        }
    }
"""

ALL_TESTS = """ 
    [
  {
    "code": "bp",
    "name": "BP"
  },
  {
    "code": "diabetes",
    "name": "Diabetes"
  },
  {
    "code": "lipid_profile",
    "name": "Lipid Profile"
  },
  {
    "code": "anaemia",
    "name": "Anaemia"
  }
]
  
"""

ALL_TEST_FORMS = """ 
   {
  "bp":{
    "code": "bp",
    "name": "BP",
    "description": "Description of BP",
    "value": [
      {
        "code": "systolic",
        "name": "Systolic",
        "type": "Integer",
        "validation": {
          "min": "50",
          "max": "300",
          "normal":"200"
        }
      },
      {
        "code": "diastolic",
        "name": "Diastolic",
        "type": "Integer",
        "validation": {
          "min": "50",
          "max": "300",
          "normal":"200"
        }
      }
    ]
  },
  "diabetes":{
    "code": "diabetes",
    "name": "Diabetes",
    "description": "Description of Diabetes ",
    "value": [
      {
        "code": "hba1c",
        "name": "HbA1C",
        "type": "Integer",
        "unit": "%",
        "validation": {
          "min": "0",
          "max": "100",
          "normal":"200"
        }
      },
      {
        "code": "fasting_sugar",
        "name": "Fasting Sugar",
        "type": "Integer",
        "unit": "mg/dl",
        "validation": {
          "min": "10",
          "max": "200",
          "normal":"200"
        }
      },
      {
        "code": "post_prandial_sugar",
        "name": "Post-prandial Sugar",
        "type": "Integer",
        "unit": "mg/dl",
        "validation": {
          "min": "10",
          "max": "200",
          "normal":"200"
        }
      }
    ]
  },
  "lipid_profile":{
    "code": "lipid_profile",
    "name": "Lipid Profile",
    "description": "Discription of Lipid Profile ",
    "value": [
      {
        "code": "ldl",
        "name": "LDL",
        "type": "Integer",
        "unit": "%",
        "validation": {
          "min": "0",
          "max": "100",
          "normal":"200"
        }
      },
      {
        "code": "hdl",
        "name": "HDL",
        "type": "Integer",
        "unit": "mg/dl",
        "validation": {
          "min": "10",
          "max": "200",
          "normal":"200"
        }
      },
      {
        "code": "triglycerides",
        "name": "Triglycerides",
        "type": "Integer",
        "unit": "mg/dl",
        "validation": {
          "min": "10",
          "max": "200",
          "normal":"200"
        }
      },
      {
        "code": "total_cholesterol",
        "name": "Total Cholesterol",
        "type": "Integer",
        "unit": "mg/dl",
        "validation": {
          "min": "10",
          "max": "200",
          "normal":"200"
        }
      }
    ]
  },
  "anaemia":{
    "code": "anaemia",
    "name": "Anaemia",
    "description": "Description of Anaemia",
    "value": [
        {
          "code": "haemoglobin",
          "name": "Haemoglobin",
          "type": "Integer",
          "unit": "g/dl",
          "validation": {
            "min": "2",
            "max": "20",
          "normal":"200"
          }
        }
      ]
  }
}
  
"""
    
VISITS_LIST = {"1":VISIT_1, "2":VISIT_2, "3":VISIT_3, "4":VISIT_4, "5":VISIT_5, "6":VISIT_6}

PATIENT_VISIT_DETAIL = {"1":[1, 2, 3], "2":[4, 5], "3":[6] }

PATIENT_TEST_DETAIL = {"1":[1, 2, 3], "2":[4, 5], "3":[6] }

TESTS_LIST = {"1":TEST_1, "2":TEST_2, "3":TEST_3, "4":TEST_4, "5":TEST_5, "6":TEST_6}

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
                if flag == True:
                    jsonstr = jsonstr + ","
                jsonstr = jsonstr + VISITS_LIST[str(visitid)]
                flag = True
            self.response.write("[" + jsonstr + "]")
        else:
            self.response.write("Error")
            
class Tests(webapp2.RequestHandler):
    @decorator.oauth_required
    def get(self, patientid):
        if (patientid in PATIENT_TEST_DETAIL):
            flag = False
            jsonstr = ""
            
            for testid in PATIENT_TEST_DETAIL[patientid]:
                if flag == True:
                    jsonstr = jsonstr + ","
                jsonstr = jsonstr + TESTS_LIST[str(testid)]
                flag = True
            self.response.write("[" + jsonstr + "]")
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
        
class Test(webapp2.RequestHandler):
    def get(self, patientid, testid):
        if (patientid in PATIENT_TEST_DETAIL):
            if (int(testid) in PATIENT_TEST_DETAIL[patientid]):
                self.response.write(TESTS_LIST[testid])
                return
            else:
              self.response.write("Error")
        else:
            self.response.write("Error")
    def post(self):
        print "Called Post"
        
class AllTests(webapp2.RequestHandler):
    def get(self):
        self.response.write(ALL_TESTS)
        
class AllTestForms(webapp2.RequestHandler):
    def get(self):
        self.response.write(ALL_TEST_FORMS)
        
class Patient(webapp2.RequestHandler):
    def get(self):
        self.response.write(PATIENT_DETAILS)

class Family(webapp2.RequestHandler):
    def get(self, patient_id):
        self.response.write(PATIENT_FAMILY_MEMBER_LIST)
        
class AddVisit(webapp2.RequestHandler):
    def post(self):
        print  self.request.body

class AddTest(webapp2.RequestHandler):
    def post(self):
        print  self.request.body        

class UploadHandler(webapp2.RequestHandler):
    def post(self):
        print "Called UploadHandler"
        imgblock = ImageStoreHelper(parent=db.Key.from_path('Test', 'images'))
        imgblock.img = db.Blob(images.resize(self.request.get('file'), 640, 640))
        imgkey = imgblock.put()
        urlgen = BASE_URL + "/img?img_id=" + str(imgkey)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        self.response.out.write(urlgen)

    def get(self, uniqid):
        
        print "Get not supported"   


class ImageHandler(webapp2.RequestHandler):
  def get(self):
    imgblob = db.get(self.request.get('img_id'))
    print self.request.get('img_id')
    if imgblob.img:
        self.response.headers['Content-Type'] = 'image/png'
        self.response.out.write(imgblob.img)
    else:
        self.response.out.write('No image')
  
      
class CommonComplaints(webapp2.RequestHandler):
    def get(self, patientid):
        if (patientid in PATIENT_VISIT_DETAIL):
            self.response.write(COMMON_COMPLAINTS)
        else:
            self.response.write("Error")  
   
      
class ApplicableCases(webapp2.RequestHandler):
    def get(self, patientid):
        time.sleep(2)
        if (patientid in PATIENT_VISIT_DETAIL):
            self.response.write(APPLICABLE_CASES)
        else:
            self.response.write("Error")   
            
class Recommendations(webapp2.RequestHandler):
    def get(self, patientid):
        if (patientid in PATIENT_VISIT_DETAIL):
            self.response.write(RECOMMENDATIONS)
        else:
            self.response.write("Error") 
    
application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/upload', UploadHandler),
    ('/img', ImageHandler),
    ('/addvisit', AddVisit),
    ('/addtest', AddTest),
    ('/api/visits/(.*)', Visits),
    ('/api/tests/(.*)', Tests),
    ('/api/visit/(.*)/(.*)', Visit),
    ('/api/test/(.*)/(.*)', Test),
    ('/api/alltests', AllTests),
    ('/api/alltestforms', AllTestForms),
    ('/api/get_patient_id', Patient),
    ('/api/get_family_members/(.*)', Family),
    ('/api/common_complaints/(.*)', CommonComplaints),
    ('/api/available_cases/(.*)', ApplicableCases),
    ('/api/get_recommendations/(.*)', Recommendations),
    (decorator.callback_path, decorator.callback_handler()),
], debug=True)
