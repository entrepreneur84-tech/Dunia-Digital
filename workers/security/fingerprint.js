export function generateFingerprint(req){
  return req.headers.get("user-agent")+"|"+req.headers.get("cf-connecting-ip")
}
