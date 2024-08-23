# make test for anagram_utils.py

import pytest

from anagram_utils import (
    mk_dict_from_wordnet_for_length,
    get_word_frequencies,
    sort_words_by_frequency,
    get_top_n_words
)

@pytest.fixture
def word_dict():
    word_dict = {}
    for length in [4,5,6]:
        word_dict[length] = mk_dict_from_wordnet_for_length(length)
    return word_dict

@pytest.fixture
def word_freq_dict(word_dict):
    return get_word_frequencies(word_dict)

@pytest.fixture
def sorted_words_dict(word_freq_dict):
    return sort_words_by_frequency(word_freq_dict)

def test_mk_dict_from_wordnet_for_length():
    lengths = [4,5,6]
    for length in lengths:
        words = mk_dict_from_wordnet_for_length(length)
        assert len(words) > 0
        assert all([len(word) == length for word in words.keys()])
        assert all([len(definition) > 0 for definition in words.values()])


def test_get_word_frequencies(word_freq_dict):

    assert len(word_freq_dict) > 0
    assert all([len(words) > 0 for words in word_freq_dict.values()])
    for word_length, word_dict_by_length in word_freq_dict.items():
        assert all([freq > 0 for freq in word_dict_by_length.values()])

def test_sort_words_by_frequency(sorted_words_dict, word_freq_dict):
    assert len(sorted_words_dict) > 0

    for word_length, sorted_words in sorted_words_dict.items():
        freqdict = word_freq_dict[word_length]
        assert all([freqdict[word] >= freqdict[word] for i, word in enumerate(sorted_words[:-1])])