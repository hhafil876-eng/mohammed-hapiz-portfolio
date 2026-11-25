import { test, expect } from '@playwright/test'
import { submitInquiry } from '../api/contact.js'
const fields={name:'  Test Visitor  ',email:' visitor@example.com ',message:' A mocked enquiry for testing only. '}
const fill=async p=>{for(const [k,v] of Object.entries(fields))await p.locator('#contact-'+k).fill(v)}
for(const width of [360,390,768,1024,1440]) for(const reducedMotion of ['no-preference','reduce']) test(`layout ${width} ${reducedMotion}`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion});const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='warning' && /non-static/.test(m.text()))errors.push(m.text())});
 await page.goto('/');await page.waitForTimeout(900);
 for(const id of ['about','skills','projects','experience','achievements','contact']){
  const section=page.locator('#'+id);await section.scrollIntoViewIfNeeded();await expect(section.locator('h2')).toBeVisible();
  expect(await section.locator('h2').evaluate(e=>Number(getComputedStyle(e.parentElement).opacity))).toBe(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 }
 await page.locator('footer').scrollIntoViewIfNeeded();expect(errors).toEqual([]);
 if(reducedMotion==='no-preference')await page.screenshot({path:`qa/repair/after-${width}.png`,fullPage:true});
 await page.goto('/#skills');await expect(page.locator('#skills h2')).toBeInViewport();await page.reload();await expect(page.locator('#skills h2')).toBeInViewport();
});
test('validation, pending, confirmed success, reset and duplicate guard',async({page})=>{
 let count=0;await page.route('**/api/contact',async route=>{count++;expect(route.request().postDataJSON()).toEqual({...Object.fromEntries(Object.entries(fields).map(([k,v])=>[k,v.trim()])),_honey:''});await new Promise(r=>setTimeout(r,400));await route.fulfill({json:{success:true}})});
 await page.goto('/#contact');await page.getByRole('button',{name:'Send Message',exact:true}).click();await expect(page.locator('#contact-name')).toBeFocused();await expect(page.locator('[aria-invalid="true"]')).toHaveCount(3);expect(count).toBe(0);
 await fill(page);await page.getByRole('button',{name:'Send Message',exact:true}).click();await expect(page.getByRole('button',{name:'Transmitting'})).toBeDisabled();await page.locator('form').evaluate(e=>e.requestSubmit());await expect(page.getByText('Enquiry Accepted')).toBeVisible();expect(count).toBe(1);await page.getByRole('button',{name:'Send Another Message'}).click();await expect(page.locator('#contact-name')).toHaveValue('');
});
for(const mode of ['server','network','timeout','invalid-confirmation','validation'])test(`form ${mode} and retry`,async({page})=>{
 await page.route('**/api/contact',async route=>{if(mode==='network')return route.abort('failed');if(mode==='timeout')return;await route.fulfill({status:mode==='server'?502:mode==='validation'?422:200,json:mode==='invalid-confirmation'?{success:false}:{message:'Mock service rejection',errors:mode==='validation'?{email:'Check this email'}:undefined}})});
 await page.goto('/#contact');await fill(page);await page.getByRole('button',{name:'Send Message',exact:true}).click();await expect(page.getByRole('alert')).toBeVisible({timeout:25000});await expect(page.locator('#contact-name')).toHaveValue(fields.name);await expect(page.getByRole('button',{name:'Retry',exact:true})).toBeEnabled();await expect(page.getByText('Enquiry Accepted')).toHaveCount(0);await page.unroute('**/api/contact');await page.route('**/api/contact',r=>r.fulfill({json:{success:true}}));await page.getByRole('button',{name:'Retry',exact:true}).click();await expect(page.getByText('Enquiry Accepted')).toBeVisible();
});
test('server validates, guards configuration, and handles provider responses without email',async()=>{
 expect((await submitInquiry({},{env:{}})).status).toBe(422);expect((await submitInquiry(fields,{env:{}})).body.code).toBe('configuration');
 for(const [data,status,expected] of [[{success:true},200,200],[{success:'true'},200,200],[{success:false},200,502],[{message:'Please activate your email'},200,503],[{},500,502]]){
 const result=await submitInquiry(fields,{env:{FORMSUBMIT_ENABLED:'true'},request:async(url,options)=>{expect(url).toContain('hhafil876@gmail.com');expect(JSON.parse(options.body).name).toBe('Test Visitor');return new Response(JSON.stringify(data),{status})}});expect(result.status).toBe(expected)}
 expect((await submitInquiry(fields,{env:{FORMSUBMIT_ENABLED:'true'},request:async()=>{throw new TypeError('offline')}})).body.code).toBe('network');
 expect((await submitInquiry(fields,{env:{FORMSUBMIT_ENABLED:'true'},request:async()=>{throw new DOMException('timeout','AbortError')}})).body.code).toBe('timeout');
});
test('skills, filters, dialog keyboard, resume, email and back-to-top',async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);await page.goto('/');await page.getByRole('searchbox',{name:'Filter skills by keyword'}).fill(' React ');await expect(page.locator('.detail-panel')).toContainText('React.js');await page.getByRole('searchbox').fill('');await page.getByRole('button',{name:'Select AI & Agents skill domain'}).focus();await page.keyboard.press('Enter');await expect(page.locator('.detail-panel h3')).toHaveText('AI & Agents');
 await page.getByRole('button',{name:'Games',exact:true}).click();await expect(page.locator('.project-panel')).toHaveCount(1);await page.getByRole('button',{name:'All Projects',exact:true}).click();await expect(page.locator('.project-panel')).toHaveCount(6);
 const trigger=page.getByRole('button',{name:/Open full case study/}).first();await trigger.click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Shift+Tab');expect(await page.getByRole('dialog').evaluate(e=>e.contains(document.activeElement))).toBeTruthy();await page.keyboard.press('Escape');await expect(trigger).toBeFocused();
 expect((await page.request.get('/assets/mohammed-hapiz-resume.pdf')).headers()['content-type']).toContain('pdf');await page.getByRole('button',{name:'Copy email address to clipboard'}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe('hhafil876@gmail.com');await expect(page.getByRole('link',{name:'Open your email app',exact:true})).toHaveAttribute('href',/^mailto:hhafil876@gmail.com/);await page.getByRole('button',{name:'Scroll to top of page'}).click();await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
});

test('navigation and mobile menu keyboard',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 await page.getByRole('button',{name:'Selected Works',exact:true}).click();await expect(page.locator('#projects h2')).toBeInViewport();
 await page.evaluate(()=>scrollTo(0,0));const toggle=page.getByRole('button',{name:'Toggle menu'});await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');await page.keyboard.press('Escape');await expect(toggle).toBeFocused();await expect(toggle).toHaveAttribute('aria-expanded','false');
 for(const [label,id] of [['About','about'],['Skills','skills'],['Works','projects'],['Trajectory','experience'],['Credentials','achievements'],['Contact','contact']]){
  await page.evaluate(()=>scrollTo(0,0));await toggle.click();await page.locator('#mobile-navigation').getByRole('link',{name:new RegExp(label,'i')}).click();await expect(page.locator('#'+id+' h2')).toBeInViewport();await expect(toggle).toHaveAttribute('aria-expanded','false');
 }
 await page.evaluate(()=>scrollTo(0,0));await page.locator('.hero-cta-row').getByRole('button',{name:'Initiate Inquiry'}).click();await expect(page.locator('#contact h2')).toBeInViewport();
 await page.setViewportSize({width:1440,height:900});await page.evaluate(()=>scrollTo(0,0));await page.getByRole('button',{name:'Inquire',exact:true}).click();await expect(page.locator('#contact h2')).toBeInViewport();
});
test('content stays visible when observers never fire',async({page})=>{
 await page.addInitScript(()=>{window.IntersectionObserver=class{observe(){} unobserve(){} disconnect(){}}});await page.goto('/');
 for(const selector of ['.about-text-col','.graph-col','.detail-col','.project-panel','.exp-entry','.achievement-exhibit','.contact-form-col']){
  for(const el of await page.locator(selector).all()) expect(await el.evaluate(e=>getComputedStyle(e).opacity)).toBe('1');
 }
});
import AxeBuilder from '@axe-core/playwright'
for(const width of [390,1440])test(`accessibility ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 await expect(page.locator('#contact h2')).toBeAttached();const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(audit.violations).toEqual([]);
 await page.getByRole('button',{name:/Open full case study/}).first().click();await expect(page.getByRole('dialog')).toBeVisible();const modal=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(modal.violations).toEqual([]);
});
