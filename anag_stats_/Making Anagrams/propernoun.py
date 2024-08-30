# russ made this lil python script to remove proper nouns from a list of words using spacy

import spacy

try:
    import en_core_web_sm
except ImportError:
    # Download the English model
    import subprocess
    subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])


def remove_proper_nouns(words: list):
    nlp = en_core_web_sm.load()
    doc = nlp(' '.join(words))
    non_ents = [i for i in words if i not in [token.text for token in doc.ents]]
    return non_ents


if __name__ == "__main__":
    nlp = en_core_web_sm.load()
    text = "Apple is looking at buying U.K. startup for $1 billion"
    print(remove_proper_nouns(text.split()))
