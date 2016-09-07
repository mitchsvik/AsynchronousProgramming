// Sequentian calls and sequentian execution
/*
readConfig('myConfig', () => {});
selectFromDb('select * from cities', () => {});
getHttpPage('http://kpi.ua', () => {});
readFile('README.md', () => {});
*/

let fns = [readConfig, selectFromDb, getHttpPage, readFile];

sequentialAsync(fns, () => {console.log('Sequential done!');});

parallelAsync(fns, () => console.log('Parallel done!'));

function parallelAsync(fns, done) {
  count = 0;
  fns.forEach((item) => {
    item('', () => {
      console.log('Parallel callback');
      if (++count === fns.length) {
          done();
      }
    })
  });
}

function sequentialAsync(fns, done) {
  fns[0]('', () => {
    console.log('--> Sequential callback');
    if (fns.length > 1){
      sequentialAsync(fns.slice(1), done)
    } else {
      done();
    }
  });
}

// Pseudo-Asynchronous Functions
// having just callbacks but working synchronously

function readConfig(name, callback) {
  setTimeout(() => {
    console.log('(1) config loaded');
    callback({name});
  }, Math.random()*5000);
}

function selectFromDb(query, callback) {
  setTimeout(() => {
    console.log('(2) SQL query executed');
    callback([ { name: 'Kiev' } , { name: 'Roma' } ]);
  }, Math.random()*5000);
}

function getHttpPage(url, callback) {
  setTimeout(() => {
    console.log('(3) Page retrieved');
    callback('<html>Some archaic web here</html>');
  }, Math.random()*5000);
}

function readFile(path, callback) {
  setTimeout(() => {
    console.log('(4) Readme file loaded');
    callback('file content');
  }, Math.random()*5000);
}
