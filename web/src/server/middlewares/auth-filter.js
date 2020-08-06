module.exports = function setup(app) {
  app.use((req, res, next) => {
    let url = decodeURI(req.originalUrl);
    if ((url.indexOf('/static/') != -1) || (url.indexOf('favicon.ico') != -1)) {
      console.log(url);
      next();
    } else {
      if (req.query.login || (url.indexOf('?login=KC\\') != -1)) {
        let login = '';
        console.log(url);
        
        if (url.indexOf('?login=KC\\') != -1) {
          login = url.slice(url.indexOf('?login=KC')).split('\\')[1];
          res.cookie('login', login, {expires: new Date(Date.now() + 8 * 3600000)})
          res.append('Cache-Control', 'no-store')
          res.redirect(302, `${req.protocol}://${req.get('host')}${url.slice(0, url.indexOf('?login=KC'))}`);
        } else {
          login = req.query.login.split('\\')[1] || req.query.login;
          res.cookie('login', login, {expires: new Date(Date.now() + 8 * 3600000)})
          res.append('Cache-Control', 'no-store')
          res.redirect(302,  `${req.protocol}://${req.get('host')}${url.replace(`login=${req.query.login}`, '')}`);
        }
      } else {
        if (req.cookies.login) {
          console.log(req.cookies.login);
          next();
        } else {
          res.redirect(302, `http://triada.consultant.ru/AuthRedirectService/?callback=${req.protocol}://${req.headers['last-host']+url}`);
        }
      }
    }
  });
};
