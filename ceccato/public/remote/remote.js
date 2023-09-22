let options;
const URL='http://192.168.1.175:3000';

let callRemote = {
  render: async (datar, url, action, setResult, token) => {
    
    if (action === 'GET') {
      options = {
        method: action,
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      };
    } else {
      options = {
        method: action,
        body: JSON.stringify(datar),
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      };
    }
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
         setResult(data);
        // setMesGen(data.msgc);
      })
      .catch((error) => {
        console.error('Error:', error);
        let data = { status: 200, msgc: error, ms: 'errore', record: 0 };
        setResult(data);
        //setMesGen({ msgc: error });
      });

    return 'data';
  },
  after_render: async () => {},
};

export {
  callRemote
}