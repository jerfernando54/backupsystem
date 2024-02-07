const {MESSAGES,STATUS} = require('./../utils/constants')

const allowedIPs = ['192.168.1.1','::1', '::ffff:127.0.0.1'];
exports.allowOnlySpecificIPs = (req, res, next) => {
  console.log(req.ip)
  const clientIP = req.ip || req.connection.remotAddress;
  
  if(allowedIPs.includes(clientIP)) {
    next();
  } else {
    res.status(403).send(MESSAGES.ACCESS_DENIED)
  }
}