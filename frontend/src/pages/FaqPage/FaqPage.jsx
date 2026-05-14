import { useState } from 'react'
import styles from './FaqPage.module.css'

const faqs = [
  {
    question: '¿Cuál es el horario del museo?',
    answer: 'El museo está abierto de martes a domingo de 10:00 a 17:00 horas. Cerrado los lunes y los días festivos nacionales.'
  },
  {
    question: '¿Cuál es el precio de la entrada?',
    answer: 'La entrada general cuesta 20 dólares. Estudiantes y mayores de 65 años tienen un descuento del 50%. Los menores de 18 años y los miembros de la comunidad universitaria de Harvard entran gratis.'
  },
  {
    question: '¿Cómo puedo acceder a la colección online?',
    answer: 'Toda nuestra colección está disponible online a través de esta aplicación y de nuestra web oficial. Puedes buscar por título, autor, cultura, período y mucho más.'
  },
  {
    question: '¿Se pueden hacer visitas guiadas?',
    answer: 'Sí, ofrecemos visitas guiadas en inglés y español todos los fines de semana a las 11:00 y a las 14:00 horas. También es posible contratar visitas guiadas privadas para grupos.'
  },
  {
    question: '¿Está permitida la fotografía en el museo?',
    answer: 'Se permite la fotografía sin flash para uso personal en la mayoría de las salas. Algunas obras tienen restricciones de copyright — en esos casos se indica claramente en la sala.'
  },
  {
    question: '¿Cómo puedo hacer una donación?',
    answer: 'Puedes realizar donaciones a través de nuestra web oficial o contactando directamente con nuestro departamento de desarrollo. Todas las donaciones son deducibles de impuestos.'
  },
  {
    question: '¿El museo es accesible para personas con movilidad reducida?',
    answer: 'Sí, el edificio es completamente accesible. Disponemos de rampas, ascensores, sillas de ruedas disponibles en recepción y aseos adaptados en todas las plantas.'
  }
]

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null)

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Preguntas Frecuentes</h1>
        <p className={styles.intro}>
          Encuentra respuesta a las preguntas más habituales sobre 
          nuestra colección, visitas y servicios.
        </p>
        <div className={styles.list}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.item}>
              <button
                className={styles.question}
                onClick={() => handleToggle(index)}
              >
                {faq.question}
                <span className={styles.icon}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <p className={styles.answer}>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FaqPage