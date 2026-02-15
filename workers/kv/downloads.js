// Simpan history download per license
export async function saveDownload(env, licenseKey, fileName){
  const key = "download:"+licenseKey+":"+Date.now()
  await env.DOWNLOADS.put(key, JSON.stringify({licenseKey,fileName,time:Date.now()}))
}

export async function listDownloads(env){
  const list = await env.DOWNLOADS.list()
  return list.keys
}
