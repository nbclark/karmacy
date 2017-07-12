// Embedding Horizon server according to http://horizon.io/docs/embed/
const _ = require('lodash');
const express = require('express');
const horizon = require('@horizon/server');
const fetch = require('node-fetch')
const cors = require('cors')
const config = require('./config')
const path = require('path')
const RestService = require('./rest.api.js')

const port = 9000

const app = express();
app.use(cors())
app.use(require('cookie-parser')());
app.use(require('body-parser').json({ limit: '5mb' }));
app.use(require('express-session')({ secret: 'secret', resave: false, saveUninitialized: false }));

const jwt = require('jsonwebtoken');
const httpServer = app.listen(port);

const logger = horizon.logger
logger.level = 'info'

const horizonServer = horizon(httpServer, config.horizon)

var conn, r, hzHelper, restService = new RestService();

horizonServer._reql_conn.ready().then(c => {
  conn = c.connection();
  r = horizon.r;

  restService.init(conn)

  const restRouter = new express.Router()
  restService.registerRoutes(restRouter)
  app.use('/api/rest', restRouter)
  app.use('/api/rest', restRouter)

}).catch((err) => {
  console.log(err)
  process.exit(-1)
})

app.get('/login/oauth2callback', function (req, res) {
  const code = req.query.code
  res.json({})

  // providerName := r.URL.Query().Get("state")
  // provider := _providers[providerName]

  // if nil == provider {
  // 	w.WriteHeader(http.StatusForbidden)
  // 	return
  // }

  // config := _config[providerName]

  // code := r.URL.Query().Get("code")

  // var refreshToken *string
  // var accessToken *string
  // var userInfo *auth.User
  // var err *auth.AppError
  // var expiry *time.Time

  // if code != "" {
  // 	refreshToken, accessToken, expiry, userInfo, err = provider.ConnectWithCode(code, &config, r)
  // } else {
  // 	tracelog.Error(errors.New("code is empty"), "Web", "authConnect")
  // 	http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
  // 	return
  // }

  // if err != nil {
  // 	tracelog.Error(err.Err, "Web", "authConnect")
  // 	http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
  // 	return
  // }

  // a, account_err := account.GetAccountFromEmailAddress(userInfo.Email)

  // if account_err != nil || a == nil {
  // 	c, company_err := company.GetCompanyFromDomain(userInfo.Domain)
  // 	var role account.Role

  // 	if nil != c && nil == company_err {
  // 		// Let's allow a person to join the company for now...
  // 		// http.Redirect(w, r, "/login?err=Company+Exists", http.StatusTemporaryRedirect)
  // 		// return
  // 		role = account.Employee

  // 		// DEBUG ONLY
  // 		if providerName == "fake" {
  // 			queryString := r.URL.Query()
  // 			if queryString["admin"][0] == "1" {
  // 				role = account.Administrator
  // 			}
  // 		}
  // 	} else {

  // 		// First account is the administrator
  // 		role = account.Administrator

  // 		dispatchError := dispatcher.DispatchCommand(cqrs.Command{Body: company.CreateCompany{
  // 			Name: userInfo.Domain, Domain: userInfo.Domain, Contact: &company.CompanyContactRequest{
  // 				FirstName:    cqrs.NewNullableString(userInfo.FirstName),
  // 				LastName:     cqrs.NewNullableString(userInfo.LastName),
  // 				EmailAddress: cqrs.NewNullableString(userInfo.Email),
  // 			},
  // 		}})

  // 		if nil != dispatchError {
  // 			tracelog.Error(dispatchError, "Web", "authConnect")
  // 			http.Redirect(w, r, "/login?err=Error+Creating+Company", http.StatusTemporaryRedirect)
  // 			return
  // 		}

  // 		c, company_err = company.GetCompanyFromDomain(userInfo.Domain)

  // 		if nil == c || nil != company_err {
  // 			tracelog.Error(company_err, "Web", "authConnect")
  // 			http.Redirect(w, r, "/login?err=Failed+to+Create+Company", http.StatusTemporaryRedirect)
  // 			return
  // 		}
  // 	}

  // 	tracelog.Info("Web", "authConnect", "Creating/Linking account: %v", userInfo.Email)
  // 	dispatchError := dispatcher.DispatchCommand(cqrs.Command{Body: account.CreateOrLinkAccount{
  // 		userInfo.ID, c.ID(), role, userInfo.FirstName, userInfo.LastName, "", userInfo.Email, userInfo.Provider, true,
  // 	}})

  // 	if nil != dispatchError {
  // 		tracelog.Error(dispatchError, "Web", "authConnect")
  // 		http.Redirect(w, r, "/login?err=Error+Creating+Account", http.StatusTemporaryRedirect)
  // 		return
  // 	}
  // } else {

  // 	_ = dispatcher.DispatchCommand(cqrs.Command{Body: account.LoginAccount{
  // 		a.ID(),
  // 	}})
  // }

  // userJson, _ := json.Marshal(&userInfo)
  // session.Values["refresh_token"] = refreshToken
  // session.Values["access_token"] = accessToken
  // session.Values["provider"] = providerName
  // session.Values["user_info"] = string(userJson)
  // session.Save(r, w)

  // payload := userJson
  // duration := time.Duration(0)

  // if nil != expiry {
  // 	duration = expiry.Sub(time.Now().UTC())
  // }

  // _redisClient.Set(*accessToken, string(payload), duration)

  // http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
})

console.log(path.join(__dirname, '../dist'))
app.use(express.static(path.join(__dirname, '../dist')))
console.log('Listening on port ' + port)
