# functions for making anagrams from wordnet for a given word length

# imports
from nltk.corpus import wordnet as wn
from wordfreq import zipf_frequency

# function: make a dictionary of words from wordnet for a given word length
def mk_dict_from_wordnet_for_length(word_length):
    # words have synset of length 3 after splitting by "."
    synset_length = 3
    # lemmas are keys and definitions are values
    selected_words = {}

    # TODO: filter out proper nouns AND any items with non-alphabetic characters
    for synset in wn.all_synsets():
        if len(synset.name().split(".")) == synset_length:
            if len(synset.name().split(".")[0]) == word_length:
                selected_words[synset.name().split(".")[0]] = synset.definition()
    
    return selected_words

# function: get word frequencies for a given word as a dictionary
def get_word_frequencies(word_dict, minfrequency=1):
    word_frequencies = {}
    for wordlength in word_dict.keys():
        word_frequencies[wordlength] = {}
        for word in word_dict[wordlength]:
            freq = zipf_frequency(word, "en")
            if freq >= minfrequency:
                word_frequencies[wordlength][word] = freq
    return word_frequencies

# function: sort words by frequency
def sort_words_by_frequency(word_frequencies):
    sorted_word_frequencies = {}
    for wordlength, wordfreq_by_length in word_frequencies.items():
        sorted_word_frequencies[wordlength] = sorted(
            wordfreq_by_length,
            key=wordfreq_by_length.get,
            reverse=True)
    return sorted_word_frequencies

# function: get the top n words from a sorted distribution
def get_top_n_words(sorted_fdist, n):
    return sorted_fdist[:n]