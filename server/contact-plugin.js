import { loadEnv } from 'vite'
import { submitInquiry } from '../api/contact.js'
export function contactApi() {
  let env
  const middleware = (req,res,next) => {
    if (req.url?.split('?')[0] !== '/api/contact') return next()
    res.setHeader('Content-Type','application/json')
    res.setHeader('Cache-Control','no-store')
    if (req.method !== 'POST') {res.statusCode=405;res.setHeader('Allow','POST');res.end(JSON.stringify({message:'Use POST.'}));return}
    let body=''
    req.on('data',chunk=>{body+=chunk;if(body.length>16384)req.destroy()})
    req.on('end',async()=>{
      try {const result=await submitInquiry(JSON.parse(body),{env});res.statusCode=result.status;res.end(JSON.stringify(result.body))}
      catch {res.statusCode=400;res.end(JSON.stringify({code:'validation',message:'Invalid request.'}))}
    })
  }
  return {name:'contact-api',configResolved(config){env={...loadEnv(config.mode,config.root,''),...process.env}},configureServer(server){server.middlewares.use(middleware)},configurePreviewServer(server){server.middlewares.use(middleware)}}
}
