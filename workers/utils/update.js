export async function autoUpdate(env, url){
  // bisa fetch versi terbaru & replace data
  try{
    const res = await fetch(url)
    const jsonData = await res.json()
    await env.CONFIG.put("latest", JSON.stringify(jsonData))
  }catch(e){ console.error(e) }
}
