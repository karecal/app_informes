import styles from './FaqPage.module.css'

const FAQS = [
  {
    pregunta: '¿Cómo añado un nuevo bien patrimonial?',
    respuesta: 'Solo los administradores pueden crear bienes. Una vez autenticado como admin, verás el botón "+ Nuevo bien patrimonial" en la página principal. Rellena el formulario con los datos del bien y guarda.'
  },
  {
    pregunta: '¿Quién puede crear o eliminar bienes?',
    respuesta: 'Solo los usuarios con rol de administrador pueden crear, editar y eliminar bienes patrimoniales. Los restauradores pueden crear y editar sus propios informes.'
  },
  {
    pregunta: '¿Cómo registro un informe de conservación?',
    respuesta: 'Entra en el detalle de un bien patrimonial y pulsa el botón "+ Nuevo informe". Rellena el diagnóstico, tratamiento, procedimientos, materiales utilizados y fechas. El informe quedará asociado automáticamente a tu usuario.'
  },
  {
    pregunta: '¿Cómo busco informes de un período concreto?',
    respuesta: 'En la página principal encontrarás los filtros "Informes desde" e "Informes hasta". Introduce el año de inicio y fin del período y el sistema mostrará los bienes que tienen intervenciones en ese rango.'
  },
  {
    pregunta: '¿Puedo editar un informe ya creado?',
    respuesta: 'Sí. Los restauradores pueden editar sus propios informes y los administradores pueden editar cualquier informe. Entra en el detalle del bien, localiza el informe y pulsa el botón de edición.'
  }
]

function FaqPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Preguntas frecuentes</h1>
        <p className={styles.intro}>Resuelve tus dudas sobre el uso de Patrimonio Info.</p>

        <div className={styles.list}>
          {FAQS.map((faq, i) => (
            <div key={i} className={styles.item}>
              <h2 className={styles.question}>{faq.pregunta}</h2>
              <p className={styles.answer}>{faq.respuesta}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FaqPage