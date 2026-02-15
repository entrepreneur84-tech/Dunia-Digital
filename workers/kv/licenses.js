export function generateLicense(email){
  return "LIC-" + btoa(email + "-" + Date.now())
}

export async function saveLicense(env,email,licenseKey){
  const key = "license:" + licenseKey
  await env.LICENSES.put(key, JSON.stringify({email,licenseKey,created:Date.now()}))
}

export async function checkLicense(env,licenseKey){
  const data = await env.LICENSES.get("license:" + licenseKey)
  return data ? JSON.parse(data) : null
                                      }
