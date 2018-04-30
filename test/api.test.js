const { describe, it } = require('mocha');
const assert = require('assert');
const request = require('request-promise');

describe('site', () => {
    it('works', () => {
        return request.get({
            url: 'http://localhost:5000'
        })
        .then((res) => {
            assert.equal(res, '<html><head><link href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.0/semantic.min.css" rel="stylesheet"/><link href="/css/homepage.css" rel="stylesheet"/></head><body class="landing-page"><h1 id="landing-header">WELCOME TO THE ALtruist</h1><a class="ui white inverted button" id="go-to-app" href="/favors">Go to App</a></body></html>')
        })
    })

    describe('login', () => {
        describe('is successful', () => {
            it('with valid credentials', () => {
                return request.post({
                    url: 'http://localhost:5000/login',
                    form: { user_name: 'jav', user_password: 'jav'},
                    simple: false
                })
                .then((res) => {
                    assert.equal(res, 'Found. Redirecting to /favors');
                })
            })
        })
    })
})

