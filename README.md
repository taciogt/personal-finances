[![Build Status](https://travis-ci.com/taciogt/personal-finances.svg?branch=main)](https://travis-ci.com/taciogt/personal-finances)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9579b1aedb26409bb41b22bd317514f8)](https://app.codacy.com/gh/taciogt/personal-finances?utm_source=github.com&utm_medium=referral&utm_content=taciogt/personal-finances&utm_campaign=Badge_Grade)

# Personal Finances

## Dependencies

* [Pipenv](https://pipenv.pypa.io/en/latest/)

### Environment Set Up

```shell
pipenv sync --dev
```

Frontend created with [Next + Typescript](https://github.com/vercel/next.js/tree/master/examples/with-typescript)

### Deployment

```shell
pipenv update # do not use dev dependencies
pipenv shell
cd api/personal_finances
zappa deploy/update dev
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
