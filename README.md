# README
Client for the Shramble app.

This is not a gambling app that facilitates the exchange of any real currency, nor should it be used
as such. It's just a for-fun project that allows players to join a room, set odds for whatever they
choose and score / lose **imaginary** points. We do not condone the usage of it for monetary gain
and will not implement any features to support something like that.

# Setup
## .env

```
REACT_APP_BACKEND_URL='http://localhost:4000'
REACT_APP_RECAPTCHA_CLIENT='...'
```
be sure to generate your own (v2) [google recaptcha](https://www.google.com/recaptcha/admin/create)
