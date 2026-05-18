import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const enviarNotificacionInforme = async ({ titulo, bien, restaurador }) => {
  await transporter.sendMail({
    from: `"Patrimonio Info" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_ADMIN,
    subject: `Nuevo informe: ${titulo}`,
    html: `
      <h2>Nuevo informe de conservación registrado</h2>
      <p><strong>Bien patrimonial:</strong> ${bien}</p>
      <p><strong>Título:</strong> ${titulo}</p>
      <p><strong>Restaurador:</strong> ${restaurador}</p>
      <p>Accede a la aplicación para ver los detalles completos.</p>
    `
  })
}