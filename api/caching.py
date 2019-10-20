from PIL import Image
import imagehash
from config import *
import redis

class Hashing(object):

    def __init__(self):
        # self.redis_host = redis_host
        # self.redis_port = redis_port
        # self.redis_password = redis_password
        self.r = redis.StrictRedis(host=redis_host, port=redis_port, password=redis_password, decode_responses=True)
    def calculate_hash(self,path):
        hash_value = imagehash.average_hash(Image.open(path))
        return hash_value

    def cacher(self,path):
        h_value = str(self.calculate_hash(path))
        if self.r.exists(h_value):
            return self.r[h_value],h_value
        else:
            return False,h_value

    def set_redis_store_value(self,h_value,store_json):
        status = self.r.set(h_value,store_json)
        return status

if __name__ == "__main__":
    caching_obj = Hashing()
    status,h_value = caching_obj.cacher("./uploads/Capture.PNG")
    print(caching_obj.r.get(h_value))
    #status = caching_obj.set_redis_store_value(h_value,"{'predicted':'True','score':0.87}")
    #print(caching_obj.r.get(h_value))
