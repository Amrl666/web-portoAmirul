'use server'

export async function sendEmail (values: { name: string; email: string; subject: string; message: string }) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_KEY}`
    },
    body: JSON.stringify({
      from: `Portofolio Form <onboarding@resend.dev>`,
      to: process.env.FORM_RECIPIENT,
      subject: `${values.subject} - ${values.email}`,
      text: values.message
    })
  })
}
