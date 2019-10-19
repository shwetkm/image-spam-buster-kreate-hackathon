import json
import re
import math
class HeuristicSpamClassifier:

	def sigmoid(self,x):
  		return 1 / (1 + math.exp(-x))

	def classify(self,ocr_text):
		is_spam = False			
		output_json = {"predicted":is_spam,
						"score":0
						}
		hinglish_array = ocr_text.split("CUSTOMIZED DELIMITER")
		english_text = hinglish_array[0]
		hindi_text = hinglish_array[1]
		# Considering an image without text as non-spam
		total_score = 0
		if hindi_text or english_text:
			known_bad_words_json = open("./config.json","r").read()
			known_bad_words_dict = json.loads(known_bad_words_json)
			for word in ocr_text.split():
				word = word.lower()
				# word = re.sub("(?is)[^0-9a-z]","",word)
				# word = re.sub("(?is)[^0-9a-z$₹]","",word)
				if word:
					for common_word in known_bad_words_dict["high_probability_symbols"]:
					 	if common_word in word:
					 		# Treating common as high_probability_word
					 		total_score += known_bad_words_dict["high_probability_weight"]
					 		next
					if word in known_bad_words_dict["high_probability_known_bad_words"]:
						total_score += known_bad_words_dict["high_probability_weight"]
					elif word in known_bad_words_dict["medium_probability_known_bad_words"]:
						total_score += known_bad_words_dict["medium_probability_weight"]
					elif word in known_bad_words_dict["low_probability_known_bad_words"]:
						total_score += known_bad_words_dict["low_probability_weight"]
			print(total_score)
			print(self.sigmoid(total_score))
			sigmoid_score = self.sigmoid(total_score)
			if self.sigmoid(total_score)*100 >= known_bad_words_dict["threshold"]:
				is_spam = True
			output_json = {"predicted":is_spam,
							"score": sigmoid_score
							}
			print(output_json)
		return output_json

if __name__== "__main__":
	heuristic_spam_classifier_obj = HeuristicSpamClassifier()
	# sample_text = "CUSTOMIZED DELIMITER चंदृहूँया हुँठं बैर्तिनौ, 'निंदा शाही, ईर्षा घृना, येसब नुएँब्रुरहिंहैड्डा 7 ईंच्छेदृऔरभ्रम ध्दष्ट्रमु; बुरग्रईकींज्ञड़हैँ1 ३"
	sample_text = "eastoo MAKE $500 TODAY! MAKE MONEY LIKE YOUR FAVORITE INSTAGRAMMER REGISTER EARN $25 FOR FREE SHARE CSL WITH FRIENDS CLEC Ces SIGN NOW! CASHOG.CO CUSTOMIZED DELIMITER ८८3०० श्या ५५ ५ 5 0 0 1'० 3५५४ र्शि^५दृ ग्यर्थिदृझा [1५९ ४०…१ स्म^५०प्तानंष्ट 'र्थिठेगाझेदृरेर्रिझेशिर्शिदृरि हैं स्टष्टठाआष्टार म्भशैझे आत्मा 825 स्याम म्भष्टष्ट क्या अम्ममाट प्रष्टस्टप्तत्साहुंद्वात्मा शारा। त्माष्टत्माष्ठ कि. आस्था ०11? श्याधार ष्टश्चात्माञ्चख्या 3 3 स्म सिं ० क्या ५५ 3 पिं 0 6 0 0"
	# sample_text = "ALTRRET PRET. Disrena are thay wes3 aba DD, 98374 19 7B. TET TTA SHAE &ei- 98374 7 Oey BepPer ITF Booo DOT GTRMT 7 7993 SEU Soe alates Beer 6 ARAN FRNA 2 Wes MyTT 4 ave 2-1. Jeu acd rete Fen 8 ‘ar IEC OTT STR SUT GAYS BEM PAIS FEMA GPT 12, FTE: TIRE ORC veneits gap: ath ees ae. CUSTOMIZED DELIMITER क्या २८ क्वे स्याक्ति- झेश्याल्यक्ष्मफ्लाचिंश्यल्यश्लो'ठेक्योंब्लिआंह्माहीटो. ३ ब्जीनं'त्यं 33९' हेट्ठीश्लेध्याड्डे खुनु दृस्म' १०37१में'८9ठेस्याणिक्यब्रशाट्विलेक्लीयब्रम्प्रअठा कीक्तिण ह्रठ- आत्मा ग्रे'श्चव्वास्थापीशअन्न- क्या' च्चात्का नंन्जाजाछींथ च्चा टा'न्य 7333 डाहस्ना- हौंसंस्वाश्योंठे छुत्नश्वेवेप्रक्सिर्वट्ठ हैं' यदैक्नो'सैश्र्व त्त'स्या दृटीगौदृश्मीत्ये कीक्ति ज्ञा' कुब्लो'कायोश तुकें' श्लीसंल्य7३८ रूदैड्डाब्रअं हूँ ८ 2.५ हुल्दीस्मशा 6 बुझाए 2 ३ क्व स्थ्यदिहुड्डीत्सादृ ७ 'क्या फ्लो हादृदृब्जा टीझदेणखी'छाघोत्राड्डे हैं स्वया झब्बाझुणाक्लउद्रहाँनी संख्याओंठेश्चिक्या ३ ह्वा'- त्त'ल्यस्तीठन्नष्टणिआं म्पा१दृदृ३२म्पाहँ८7ओँ5 ३3क्शा३३३' स्था'ष्णह्मा स्थाई क्लक्षल्य. 5९३ ७ 5 35 7 35 झ्वयोंछाटत्यि ८हुँ क्योंत्मा …३'…५. ५ --५"
	# sample_text = "Paytm Wallet =greaLaE: 5 Minutes CUSTOMIZED DELIMITER ०१ 1 व्या ० सिर्फ 1 मिनट में हैं 6 0 झक्शागा ३ 3 3 ८ हिंड्स ड्डछिठेदृ हूँक्लिंड्ड'बै थ्व स्मच्चाशा। णाआँटा ३०2३46 5 त्माशाधास्टष्ठ"
	# sample_text = "Get 1000rs as bonus CUSTOMIZED DELIMITER ०१ 1 व्या ० सिर्फ 1 मिनट में हैं 6 0 झक्शागा ३ 3 3 ८ हिंड्स ड्डछिठेदृ हूँक्लिंड्ड'बै थ्व स्मच्चाशा। णाआँटा ३०2३46 5 त्माशाधास्टष्ठ"
	heuristic_spam_classifier_obj.classify(sample_text)