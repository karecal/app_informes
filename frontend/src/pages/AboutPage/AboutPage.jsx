import styles from './AboutPage.module.css'

function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Sobre el proyecto</h1>
        <p className={styles.intro}>
          Patrimonio Info es una herramienta de gestión digital para el registro 
          y seguimiento de los informes de conservación-restauración de los bienes 
          patrimoniales de Gran Canaria.
        </p>

        <div className={styles.section}>
          <h2 className={styles.subtitle}>Nuestra misión</h2>
          <p>Facilitar la documentación, el acceso y el seguimiento del estado de 
          conservación del patrimonio cultural de la isla, poniendo en valor el trabajo 
          de los profesionales de la restauración y garantizando la trazabilidad de 
          cada intervención.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.subtitle}>¿Qué gestionamos?</h2>
          <p>La aplicación permite registrar bienes patrimoniales muebles, inmuebles 
          e inmateriales de los 21 municipios de Gran Canaria, asociando a cada bien 
          todos los informes de conservación-restauración realizados a lo largo del tiempo, 
          con sus procedimientos, materiales y restauradores responsables.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.subtitle}>Patrimonio de Gran Canaria</h2>
          <p>Gran Canaria alberga un rico patrimonio cultural que abarca desde yacimientos 
          arqueológicos de la cultura prehispánica canaria hasta arquitectura colonial, 
          arte religioso barroco, patrimonio etnográfico y manifestaciones inmateriales 
          de gran valor identitario para sus 21 municipios.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage