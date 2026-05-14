import styles from './AboutPage.module.css'

function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Sobre nosotros</h1>
        <p className={styles.intro}>
          El Harvard Art Museums es uno de los museos universitarios más grandes 
          e influyentes del mundo, con una colección de más de 250.000 objetos 
          que abarcan culturas y épocas de todo el planeta.
        </p>

        <div className={styles.section}>
          <h2 className={styles.subtitle}>Nuestra misión</h2>
          <p>Promover el estudio, la comprensión y el disfrute del arte a través 
          de la investigación, la educación y la exhibición de nuestra colección, 
          conectando el pasado con el presente.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.subtitle}>Historia</h2>
          <p>Fundado en 1895, el museo alberga tres colecciones distintas: el Fogg 
          Museum, el Busch-Reisinger Museum y el Arthur M. Sackler Museum. En 2014 
          se inauguró el edificio actual, diseñado por el arquitecto Renzo Piano, 
          que unifica las tres colecciones bajo un mismo techo.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.subtitle}>La colección</h2>
          <p>Nuestra colección incluye obras de arte occidental, asiático e islámico, 
          desde la antigüedad hasta el presente. Destacan especialmente las colecciones 
          de arte europeo, arte asiático, arte islámico y arte contemporáneo.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage