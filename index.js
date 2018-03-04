const https = require('https');

module.exports = class Botyt {
  constructor (requete) {
    this.requete = requete;
  }

  /**
   * Initialize
   * @return {Error | string} result
   */
  init () {
    var sync = true;
    const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + this.requete + '&key=AIzaSyDzC9gAicvS0LVilYaM-9VtMSfMnucQY90';

    https.get(url, (resp) => {
      this.data = '';
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        this.data += chunk;
      });
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        this.setJson(JSON.parse(this.data));
        sync = false;
      });
    }).on('error', (err) => {
      console.log('Error: ' + err.message);
    });
    while (sync) {
      require('deasync').sleep(100);
    }
    //console.log(this.json);
  }

  setJson (json) {
    this.json = json;
  }

  getJson () {
    return this.json;
  }

  getId () {
    return this.json.items[0].id.videoId;
  }

  /**
   * Run
   * @return {Error | string} result
   */
  run () {
    this.init();
  }
};

