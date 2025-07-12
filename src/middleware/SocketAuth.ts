function verifyToken(socket, next) {
    const token = socket.handshake.query.token;
    console.log(socket)
    if (!token) {
      return next(new Error('Authentication error. Token not provided.'));
    }
  
    // jwt.verify(token, secret, (err, decoded) => {
    //   if (err) {
    //     return next(new Error('Authentication error. Invalid token.'));
    //   }
  
    //   socket.decoded = decoded;
      next();
    // });
}
  
export default verifyToken;
  