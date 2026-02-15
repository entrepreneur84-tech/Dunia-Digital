import { json } from "./utils/response.js"
import { saveMember, getMember } from "./kv/members.js"
import { saveLicense, checkLicense } from "./kv/licenses.js"

export default {
  async fetch(request, env){
    const url = new URL(request.url)

    // Lihat ranking reseller
    if(url.pathname === "/api/reseller/ranking"){
      const resellers = await env.RESELLERS.list() // KV list
      return json({ok:true,data:resellers.keys})
    }

    return new Response("Not Found",{status:404})
  }
}
