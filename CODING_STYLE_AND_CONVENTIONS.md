
# Coding Style and Conventions

PrivacyPilot adheres strictly to official coding standards and best practices for each technology stack used in the project. Consistency in coding style ensures readability, maintainability, and efficient collaboration.

Below are the official guidelines that **all contributors must follow** when developing or submitting code for PrivacyPilot:


## Backend and API Services


### Go
Follow official Go guidelines:
- [Effective Go](https://go.dev/doc/effective_go)
- [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)
- Recommended Formatting: Run `gofmt`


### Node.js & JavaScript
Use official JavaScript guidelines and Airbnb style guide:
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Recommended formatting tool: [Prettier](https://prettier.io/)
- ESLint for linting.


### Python
Follow official Python PEP 8 standards:
- [PEP 8 – Style Guide for Python Code](https://peps.python.org/pep-0008/)
- Recommended formatter: [Black](https://github.com/psf/black)


### Perl
Adhere to the official Perl guidelines:
- [Perl Best Practices](https://perldoc.perl.org/perlstyle)

## Azure
Follow official Microsoft Azure naming conventions and best practices:
- [Azure Naming Tool & Guidelines](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/naming-and-tagging)
- [Microsoft Cloud Adoption Framework: Naming and Tagging](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/naming-and-tagging)
- Use clear, consistent, and descriptive resource names. Follow resource-type abbreviations and environment suffixes (e.g., `rg-`, `app-`, `dev`, `prod`).
- Use lowercase letters, numbers, and hyphens. Avoid special characters and reserved words.
- Tag resources appropriately for cost management, ownership, and environment.


## Docker and DevOps
Follow Docker's official best practices and guidelines:
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)


## Terraform
Adhere to the official HashiCorp Terraform style conventions:
- [Terraform Style Conventions](https://developer.hashicorp.com/terraform/language/syntax/style)


## Kubernetes
Follow Kubernetes official YAML conventions:
- [Kubernetes YAML best practices](https://kubernetes.io/docs/concepts/configuration/overview/)


## YAML
General YAML best practices:
- [YAML Official Website](https://yaml.org/spec/1.2.2/)


## Markdown
Markdown best practices for documentation:
- [Markdown Style Guide](https://www.markdownguide.org/basic-syntax/)


## Git and Commit Messages
Follow conventional commit standards:
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)


## AI Ethics and Responsible AI
Follow responsible AI and ethical AI development guidelines:
- [Microsoft Responsible AI Principles](https://www.microsoft.com/en-us/ai/responsible-ai)
- [Ethics Guidelines for Trustworthy AI (EU)](https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai)
- Ensure transparency, fairness, privacy, and accountability in all AI/ML features.
- Avoid bias, document data sources, and provide explainability where possible.
- Respect user privacy and comply with relevant data protection regulations (e.g., GDPR).

## General Principles
- Code must be clearly written and maintainable.
- Consistently apply proper indentation, spacing, and line breaks.
- Name variables, functions, and services clearly and meaningfully.
- Always include meaningful and concise comments for complex logic.
- Write tests where appropriate and ensure they pass before submitting pull requests.
- Prioritize security, privacy, and accessibility in all code and documentation.
- Document architectural decisions and rationale for significant changes.

---


---

Thank you for adhering to these guidelines and helping keep Privacy Copilot maintainable, clean, professional, and responsible.
