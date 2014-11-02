import cgi
import webapp2
import urllib


from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers

MAIN_PAGE_HTML = """\
<html>
  <body>
    Unsupported
  </body>
</html>
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

class MainPage(webapp2.RequestHandler):
    def get(self):
        print "debug"
        self.response.write(MAIN_PAGE_HTML)

class Visits(webapp2.RequestHandler):
    def get(self, patientid):
        self.response.write(VISITS_JSON)


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
    ('/api/visits/(.*)', Visits)
], debug=True)