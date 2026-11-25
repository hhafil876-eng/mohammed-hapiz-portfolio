import { validateInquiry } from '../src/utils/inquiry.js'

// Only this server module contacts the provider. No secret is bundled by Vite.
export async function submitInquiry(input, { env = process.env, request = fetch } = {}) {
  const { fields, errors } = validateInquiry(input)
  if (Object.keys(errors).length || input?._honey) return { status:422, body:{ code:'validation', message:'Please check the form fields.', errors } }
  const key = env.WEB3FORMS_ACCESS_KEY?.trim()
  if (!key && env.FORMSUBMIT_ENABLED !== 'true') return { status:503, body:{ code:'configuration', message:'Online enquiries are awaiting mailbox setup. Please open your email app using the link below.' } }
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)
  try {
    const response = await request(key ? 'https://api.web3forms.com/submit' : 'https://formsubmit.co/ajax/hhafil876@gmail.com', {
      method:'POST', signal:controller.signal,
      headers:{ Accept:'application/json', 'Content-Type':'application/json' },
      body:JSON.stringify({ ...fields, ...(key ? {access_key:key, subject:`Portfolio Inquiry from ${fields.name}`, replyto:fields.email} : {_subject:`Portfolio Inquiry from ${fields.name}`, _template:'table'}) })
    })
    const data = await response.json().catch(() => null)
    if (/activat|confirm your email/i.test(data?.message || '')) return {status:503, body:{code:'configuration', message:'The enquiry mailbox requires activation. Please open your email app below.'}}
    if (response.ok && (data?.success === true || data?.success === 'true')) return {status:200, body:{success:true}}
    return {status:502, body:{code:'server', message:'The email service did not accept the enquiry. Your message is saved here; retry or open your email app.'}}
  } catch (error) {
    const timedOut = controller.signal.aborted || error.name === 'AbortError'
    return {status:timedOut ? 504 : 502, body:{code:timedOut ? 'timeout' : 'network', message:timedOut ? 'The email service timed out. Delivery is unconfirmed; retry or open your email app.' : 'The server could not reach the email service. Retry or open your email app.'}}
  } finally { clearTimeout(timeout) }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control','no-store')
  if (req.method !== 'POST') { res.setHeader('Allow','POST'); return res.status(405).json({code:'method',message:'Use POST.'}) }
  let input = req.body
  try { if (typeof input === 'string') input = JSON.parse(input) } catch { return res.status(400).json({code:'validation',message:'Invalid JSON.'}) }
  const result = await submitInquiry(input || {})
  return res.status(result.status).json(result.body)
}
