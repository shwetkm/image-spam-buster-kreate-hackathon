try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract
import codecs
import re
import time
import os.path
class BasicOCR:
	
	def text_cleanup(self,input_string):
		words = input_string.split()
		cleaned_text = []
		for word in words:
			if len(word) > 2 or word.isdigit():
				cleaned_text.append(word)
		cleaned_text = ' '.join(cleaned_text)
		return cleaned_text

	def extract_text_from_image(self,image_file_path):
		if os.path.exists(image_file_path):
			image = Image.open(image_file_path)
			image_file_name = image_file_path.split("/")[-1]
			image_file_name = image_file_name.split('.')[0] + '.txt'
			english_text = pytesseract.image_to_string(image)
			hindi_text = pytesseract.image_to_string(image,lang='hin')
			cleaned_english_text = self.text_cleanup(english_text)
			cleaned_hindi_text = self.text_cleanup(hindi_text)
			cleaned_data = cleaned_english_text + "\nCUSTOMIZED DELIMITER\n" + cleaned_hindi_text
		return cleaned_data

if __name__== "__main__":
	obj = BasicOCR()
	print("Start Timestamp : " + time.ctime())
	for count in range(9):
		if os.path.exists("./KREATE/data/spam/"+str(count)+".jpg"):
			if (count)%50 == 0:
				print(count)
			obj.extract_text_from_image("./KREATE/data/spam/"+str(count)+".jpg")
	print("End Timestamp : " + time.ctime())