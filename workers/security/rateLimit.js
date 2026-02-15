export class RateLimiter{
  constructor(limit){ this.limit = limit; this.calls = {} }

  check(ip){
    const now = Date.now()
    if(!this.calls[ip]) this.calls[ip]=[]
    this.calls[ip]=this.calls[ip].filter(t=>now-t<60000)
    if(this.calls[ip].length>=this.limit) return false
    this.calls[ip].push(now)
    return true
  }
                                         }
