import nltk
import numpy as np
#package with a pre-trained tokenizer
nltk.download('punkt')
from nltk.stem.porter import PorterStemmer
stemmer = PorterStemmer()
def tokenize(mySentence):
    #tokenizing, essentially splitting up the sentence into an array of words
    return nltk.word_tokenize(mySentence)

#cutting off any roots to basically get the base word
def stem(myWord):
    return stemmer.stem(myWord.lower())

#basically what a bag of words is that
#it takes in the tokenized sentence, and then looks at all words
#if the word in the sentence is one of the words in all the words, return 1
#if the word is not in all words, return a 0
def bag_of_words(mySentence, all_words):
    mySentence = [stem(word) for word in mySentence]
    bag = np.zeros(len(all_words), dtype = np.float32)
    for index, word in enumerate(all_words):
        if word in mySentence:
            bag[index] = 1.0
    return bag


