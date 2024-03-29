# Personal Finances
[![Tests](https://github.com/taciogt/personal-finances/actions/workflows/tests.yml/badge.svg)](https://github.com/taciogt/personal-finances/actions/workflows/tests.yml)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9579b1aedb26409bb41b22bd317514f8)](https://app.codacy.com/gh/taciogt/personal-finances?utm_source=github.com&utm_medium=referral&utm_content=taciogt/personal-finances&utm_campaign=Badge_Grade)


## Dependencies

* [Pipx](https://pypa.github.io/pipx/)
* [Pipenv](https://pipenv.pypa.io/en/latest/)
* [Direnv](https://direnv.net/)
* [Fnm](https://github.com/Schniz/fnm)

### Environment Set Up

```shell
pipenv sync --dev
```

Frontend created with [Next + Typescript](https://github.com/vercel/next.js/tree/master/examples/with-typescript)

#### Running outside containers

On Ubuntu:

```shell
sudo apt-get update
sudo apt-get -y install postgresql  # confirm if this dependency is necessary
```

### Deployment

```shell
cd backend
pipenv clean
pipenv install
source `pipenv --venv`/bin/activate 

cd api/personal_finances
pip install zappa==0.52.0
zappa deploy|update dev  # updates returns an error, but works

```

## To Do's

* https://pre-commit.com/
* https://pypi.org/project/isort/
* [Zappa](https://github.com/zappa/Zappa)
  * [Django Guide](https://romandc.com/zappa-django-guide/)
  * https://blog.logrocket.com/zappa-and-aws-lambda-for-serverless-django/
* React Tutorial:
  * https://reactjs.org/docs/components-and-props.html
* https://htmlcolorcodes.com/color-picker/
  * Base color: #FF8B00
* https://serverlesscode.com/post/zappa-wsgi-for-python-pt-2/

## Troubleshooting

When [facing issues](https://github.com/pypa/pipenv/issues/4804) with `pipenv install`, I had to:

* deactivate the virtualenv: `deactivate`
* set the python to the desired version: `pyenv global 3.8.7`
* install pipenv on that python version: `pip install pipenv`
* after that, it worked

Another error:

* [AttributeError: 'Template' object has no attribute 'add_description'](https://stackoverflow.com/questions/68391621/zappa-deploy-fails-with-attributeerror-template-object-has-no-attribute-add)
