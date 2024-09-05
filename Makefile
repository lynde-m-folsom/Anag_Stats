setup: pipinstall setup-spacy
	uv venv
	
setup-spacy:
	python -m spacy download en_core_web_sm

pipinstall:
	uv pip install -r pyproject.toml
