import cgi
import webapp2
import urllib
import os

from oauth2client import appengine
from oauth2client import client

from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers

import jinja2


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
             ,{ "id" : "5", "name": "Shruti" }
             ]
"""
VISITS_JSON = """\
[
    {
        "id": "0", 
        "date":"25/11/2014",
        "chiefComplaint":"Cold",
        "prescriptionImageUrl":"img/1.png",
        "physicianName":"pn1"
    },
    {
        "id": "1", 
        "date":"25/07/2014",
        "chiefComplaint":"Body Ache",
        "prescriptionImageUrl":"img/2.png",
        "physicianName":"pn2"
    },
    {
        "id": "2", 
        "date":"25/07/2014",
        "chiefComplaint":"Cold",
        "prescriptionImageUrl":"img/3.png",
        "physicianName":"pn3"
    },
    {
        "id": "3", 
        "date":"25/08/2014",
        "chiefComplaint":"Head Ache",
        "prescriptionImageUrl":"",
        "physicianName":"pn4"
    }
]
"""
VISIT_PATIENT_1 ="""{
        "id": "3", 
        "date":"25/08/2014",
        "chiefComplaint":"Tooth Ache",
        "prescriptionImageUrl":"",
        "physicianName":"pn4"
    } """
VISIT_DETAIL_JSON = {"1":VISIT_PATIENT_1 }


decorator = appengine.oauth2decorator_from_clientsecrets(
    CLIENT_SECRETS,
    scope='https://www.googleapis.com/auth/plus.me',
    message=MISSING_CLIENT_SECRETS_MESSAGE)

class MainPage(webapp2.RequestHandler):
    @decorator.oauth_required
    def get(self):
        print "debug"
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
        self.response.write(VISITS_JSON)

class Visit(webapp2.RequestHandler):
    def get(self, patientid, visitid):
        self.response.write(VISIT_DETAIL_JSON[str(visitid)])

class Patient(webapp2.RequestHandler):
    def get(self):
        self.response.write(PATIENT_DETAILS)

class Family(webapp2.RequestHandler):
    def get(self, patient_id):
        self.response.write(PATIENT_FAMILY_MEMBER_LIST)

class TestImageForm(webapp2.RequestHandler):
  def get(self):
    upload_url = blobstore.create_upload_url('/upload')
    self.response.out.write('<html><body>')
    self.response.out.write('<form action="%s" method="POST" enctype="multipart/form-data">' % upload_url)
    self.response.out.write("""Upload File: <input type="file" name="file"><br> <input type="submit"
        name="submit" value="Submit"> </form></body></html>""")

class UploadHandler(webapp2.RequestHandler):
  def post(self):
    file = self.request.POST['file']                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    self.response.out.write( "http://localhost:8080/images/something")

  def get(self):
    print "Get not supported"   

class ServeHandler(blobstore_handlers.BlobstoreDownloadHandler):
  def get(self, resource):
    resource = str(urllib.unquote(resource))
    blob_info = blobstore.BlobInfo.get(resource)
    self.send_blob(blob_info)
    
application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/testimage', TestImageForm),
    ('/upload', UploadHandler),
    ('/images/([^/]+)?', ServeHandler),
    ('/api/visits/(.*)', Visits),
    ('/api/visit/(.*)/(.*)',Visit),
    ('/api/get_patient_id',Patient),
    ('/api/get_family_members/(.*)',Family),
    (decorator.callback_path, decorator.callback_handler()),
], debug=True)