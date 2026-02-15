import { saveMember } from "../kv/members.js"
import { generateLicense, saveLicense } from "../kv/licenses.js"
import { json } from "../utils/response.js"
import { invoiceTemplate } from "../utils/invoiceTemplate.js"
import { CONFIG } from "../config.js"

export async function registerMember(request, env){
  const { email, plan, phone } = await request.json()
  if(!email || !plan || !phone) return json({ok:false,error:"Data tidak lengkap"},400)

  // Save member
  const member = { email, plan, phone, start: Date.now() }
  await saveMember(env, member)

  // Generate license
  const licenseKey = generateLicense(email)
  await saveLicense(env,email,licenseKey)

  // Invoice
  const invoice = invoiceTemplate({email,plan,invoiceNo:licenseKey})

  // WhatsApp link
  const whatsapp = `https://wa.me/${phone}?text=` + encodeURIComponent(
    `Halo Admin Dunia Digital,%0ASaya sudah membeli membership.%0ALicense: ${licenseKey}%0AEmail: ${email}%0APaket: ${plan}`
  )

  // Email link
  const emailLink = `mailto:${CONFIG.adminEmail}?subject=` + 
    encodeURIComponent("Konfirmasi Pembayaran Dunia Digital") + 
    "&body=" + encodeURIComponent(
      `Halo Admin Dunia Digital,\n\nSaya sudah membeli membership:\nLicense: ${licenseKey}\nEmail: ${email}\nPaket: ${plan}\n\nTerima kasih.`
    )

  return json({ok:true,licenseKey,invoice,whatsapp,email:emailLink})
}
