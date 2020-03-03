const app = require('./Server/app'); 


app.listen(app.get('port'), () => {
    console.log('server is run in port 3000');
  });
  