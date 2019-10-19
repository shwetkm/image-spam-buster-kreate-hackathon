
import pandas as pd
import numpy as np
import sys
from scipy.sparse import hstack, csr_matrix
import pickle
import string
from config import *

class NLP_classifier(object):
    def __init__(self):
        self.scaler = {}
        for col in cont_cols:
            # print(col)
            with open('models/'+col+'.pkl', 'rb') as fid:
                self.scaler[col] = pickle.load(fid)
        with open('models/'+'tfidf.pkl', 'rb') as fid:
            self.tfidf_vect = pickle.load(fid)
        with open('models/'+'label_encode.pkl', 'rb') as fid:
            self.encoder = pickle.load(fid)
        with open('models/'+'clf.pkl', 'rb') as fid:
            self.classifier = pickle.load(fid)

    def text_cleaning(self,txt):
        txt = txt.replace('\n',' ')
        txt = txt.replace(',','')
        return txt

    def predict_class(self,txt):
        txt = self.text_cleaning(txt)
        ccs_char_count = len(txt)
        ccs_word_count = len(txt.split())
        ccs_word_density = ccs_char_count / (ccs_word_count+1)
        ccs_punctuation_count = len("".join(_ for _ in txt if _ in string.punctuation)) 
        ccs_title_word_count = len([wrd for wrd in txt.split() if wrd.istitle()])
        ccs_upper_case_word_count = len([wrd for wrd in txt.split() if wrd.isupper()])
        cont_dict = {'ccs_char_count':ccs_char_count,'ccs_word_count':ccs_word_count,\
                    'ccs_word_density':ccs_word_density,'ccs_punctuation_count':ccs_punctuation_count,\
                    'ccs_title_word_count':ccs_title_word_count,
                    'ccs_upper_case_word_count':ccs_upper_case_word_count}
        for col in cont_cols:
            scaler = self.scaler[col]
            cont_dict[col] = scaler.transform(np.array(cont_dict[col]).reshape(-1, 1))
        x = [cont_dict['ccs_char_count'], cont_dict['ccs_word_count'], cont_dict['ccs_word_density'],
        cont_dict['ccs_punctuation_count'], cont_dict['ccs_title_word_count'],
        cont_dict['ccs_upper_case_word_count']]
        
        x_tfidf = self.tfidf_vect.transform(np.array([txt]))
        x = [p[0][0] for p in x]
        x_df = pd.DataFrame([x],columns = ['ccs_char_count',
                                    'ccs_word_count',
                                    'ccs_word_density',
                                    'ccs_punctuation_count',
                                    'ccs_title_word_count',
                                    'ccs_upper_case_word_count'])
        final_x = hstack([x_tfidf,csr_matrix(x_df.loc[x_df.index,])], 'csr')
        return (self.encoder.inverse_transform(self.classifier.predict(final_x)))[0]

if __name__ == '__main__':
    nlp = NLP_classifier()
    txt = sys.argv[1]
    print(nlp.predict_class(txt))