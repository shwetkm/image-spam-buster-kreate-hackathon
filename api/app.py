import os
#import magic
import urllib.request
# from app import app
from flask import Flask, flash, request, redirect, render_template,jsonify
from werkzeug.utils import secure_filename
from fastai import *
from fastai.vision import *
from caching import Hashing
from basic_ocr import BasicOCR
from nlp_classifier import NLP_classifier
from image_classifier import Image_Classifier
from heuristic_spam_classifier import HeuristicSpamClassifier

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
UPLOAD_FOLDER = '/opt/kreate-hackathon-mall91/api/uploads'

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
			if 'model' in request.args:
				model_name = request.args.get('model')
			else:
				model_name = 'heuristic_classifier'
			
			filename = secure_filename(file.filename)
			print("filename")
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			caching_obj = Hashing()
			status,h_value = caching_obj.cacher(model_name,app.config['UPLOAD_FOLDER']+'/'+filename)
			if status:
				return jsonify(status)
			else:
				if model_name == 'image_classifier':
					img = open_image(app.config['UPLOAD_FOLDER']+'/'+filename)
					img_class = Image_Classifier()
					return jsonify(img_class.evaluate_image(img))
				else:
					obj = BasicOCR()
					txt = obj.extract_text_from_image(app.config['UPLOAD_FOLDER']+'/'+filename)
					if model_name == 'heuristic_classifier':
						heuristic_spam_classifier_obj = HeuristicSpamClassifier()
						return jsonify(heuristic_spam_classifier_obj.classify(txt))
					elif model_name == 'text_classifier':
						nlp = NLP_classifier()
						return jsonify(nlp.predict_class(txt))
					else:
						img = open_image(app.config['UPLOAD_FOLDER']+'/'+filename)
						img_class = Image_Classifier()
						image_op = img_class.evaluate_image(img)
						heuristic_spam_classifier_obj = HeuristicSpamClassifier()
						heuristic_op = heuristic_spam_classifier_obj.classify(txt)
						nlp = NLP_classifier()
						nlp_op = nlp.predict_class(txt)
						final = {}
						final['predicted'] = image_op['predicted'] or heuristic_op['predicted'] or nlp_op['predicted']
						final['score'] = (image_op['score'] + heuristic_op['score'] + nlp_op['score'])/3.0
						return jsonify(final)
		else:
			flash('Allowed file types are png, jpg, jpeg')
			return redirect(request.url)

@app.route('/api/health', methods=['GET'])
def health():
	if request.method == 'GET':
		return True

	

if __name__ == '__main__':
	app.run(debug = True, host="0.0.0.0", port=5001)
