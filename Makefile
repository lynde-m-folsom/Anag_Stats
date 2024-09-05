setup: pipinstall setup-spacy
	uv venv

pipinstall:
	uv pip install -r pyproject.toml
