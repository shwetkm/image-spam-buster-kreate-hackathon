from config import *
from fastai import *
from fastai.vision import *

class Image_Classifier(object):

    def __init__(self):
        # path = '/'
        classes = ['posts', 'spam']
        data = ImageDataBunch.single_from_classes('data/', classes, ds_tfms=get_transforms(), size=224).normalize(imagenet_stats)
        self.learn = cnn_learner(data, models.resnet50)
        self.learn.load('spam_stage1')

    def evaluate_image(self,img):
        pred_class, pred_idx, outputs = self.learn.predict(img)
        return {'prediction':pred_class,'score':outputs.data[1].tolist()}
    
if __name__ == '__main__':
    img = open_image('uploads/Capture.PNG')
    img_class = Image_Classifier()
    print(img_class.evaluate_image(img))