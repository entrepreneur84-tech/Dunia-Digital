import { json } from "./utils/response.js"

export default {
  async fetch(request, env){
    const url = new URL(request.url)

    // Info white-label
    if(url.pathname === "/api/saas/info"){
      return json({ok:true,siteName:"Dunia Digital",theme:"default"})
    }

    return new Response("Not Found",{status:404})
  }
}
