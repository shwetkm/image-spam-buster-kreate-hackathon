import os
#import magic
import urllib.request
# from app import app
from flask import Flask, flash, request, redirect, render_template,jsonify
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
UPLOAD_FOLDER = '/Users/vinay/workStuff/repo/kreate-hackathon-mall91/api/uploads'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'You will never guess'


def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS	

@app.route('/api/image_upload', methods=['POST'])
def upload_file():
	if request.method == 'POST':
		# check if the post request has the file part
		if 'file' not in request.files:
			flash('No file part')
			return jsonify({request.url:'No file part'})
		file = request.files['file']
		if file.filename == '':
			flash('No file selected for uploading')
			return jsonify({request.url:'No file selected for uploading'})
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			print("filename")
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			flash('File successfully uploaded')
			return jsonify({request.url:'File successfully uploaded'})
		else:
			flash('Allowed file types are png, jpg, jpeg')
			return redirect(request.url)

@app.route('/api/health', methods=['GET'])
def health():
	if request.method == 'GET':
		return True

	

if __name__ == '__main__':
	app.run(debug = True, host="0.0.0.0", port=5001)
