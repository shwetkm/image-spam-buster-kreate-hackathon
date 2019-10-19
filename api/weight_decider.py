import os
import json
class WeightDecider:

	def decide_weight(self):
		keyword_dict = {}
		directory = "./kreate_output/spam"
		# directory = "./test"
		for file in os.listdir(directory):
			# filename = os.fsdecode(file)
			# print(directory+"/"+file)
			f = open(directory+"/"+file,"r")
			ocr_text = f.read()
			hinglish_array = ocr_text.split("CUSTOMIZED DELIMITER")
			english_text = hinglish_array[0]
			for word in english_text.split():
				if keyword_dict.get(word):
					keyword_dict[word] = keyword_dict[word]+1
				else:
					keyword_dict[word] = 1
			# print(keyword_dict)
			# f.close()
		fl = open("./kreate_output/spam_weights.json","w")
		fl.write(json.dumps(keyword_dict))
		fl.close()
		print(keyword_dict)

if __name__== "__main__":
	weight_decider_object = WeightDecider()
	weight_decider_object.decide_weight()