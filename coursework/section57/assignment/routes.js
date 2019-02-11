const requesthandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>User Page</title></head>');
    res.write('<h1>Hello user, welcome to my page.</h1>')
    res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/user') {
    res.write('<html>');
    res.write('<head><title>User Page</title></head>');
    res.write('<ul><li>Dayna</li><li>Richard</li><li>Kevin</li><li>Sean</li><li>Dotty</li></ul>')
    res.write('</html>');
    return res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const username = parseBody.split('=')[1];
      console.log(username);
      res.statusCode = 302;
      res.setHeader('Location', '/user');
      return res.end();
    });
  }
};

module.exports = {
  handler: requesthandler 
}
