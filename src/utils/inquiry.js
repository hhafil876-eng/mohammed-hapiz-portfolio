export function validateInquiry(input = {}) {
  input = input && typeof input === 'object' ? input : {}
  const fields = Object.fromEntries(['name','email','message'].map(k => [k, typeof input[k] === 'string' ? input[k].trim() : '']))
  const errors = {}
  if (fields.name.length < 2 || fields.name.length > 120) errors.name = 'Enter a name between 2 and 120 characters.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || fields.email.length > 254) errors.email = 'Enter a valid email address.'
  if (fields.message.length < 10 || fields.message.length > 5000) errors.message = 'Enter a message between 10 and 5,000 characters.'
  return { fields, errors }
}
