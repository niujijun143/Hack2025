import json
import numpy as np
from utils import tokenize, stem, bag_of_words
import torch

with open('intents.json', 'r') as file:
    intents = json.load(file)

words = []
#the tags
tags = []
xy = []

for intent in intents['intents']:
    tag = intent["tag"]
    tags.append(tag)
    for pattern in intent['patterns']:
        p = tokenize(pattern)
        #using extend instead of append because p is an array, not an individual element
        words.extend(p)
        #adding the pattern (word) and the corresponding tag
        xy.append((p, tag))

##ignore puncutation
exclude  = ['?', '!', '#', '.', ',']

##stem the words, and make sure that there are no punctation marks
words = [stem(word) for word in words if word not in exclude]
print(words)

#removing duplicates
words = sorted(set(words))
tags = sorted(set(tags))
print(tags)

#creating the training set
#X_train has the pattern and the associated word
#y_train has the value
X_train = []
y_train = []
for(pattern_sentence, tag) in xy:
    #create a bag of words
    bag = bag_of_words(pattern_sentence, words)
    X_train.append(bag)
    label = tags.index(tag)
    y_train.append(label)
X_train = np.array(X_train)
y_train = np.array(y_train)

class chatDataset(Dataset):
    def __init__(self):