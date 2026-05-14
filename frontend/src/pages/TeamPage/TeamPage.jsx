import styles from './TeamPage.module.css'

const team = [
  {
    name: 'Dr. Eleanor Marsh',
    role: 'Curadora',
    department: 'Arte Europeo',
    bio: 'Especialista en pintura flamenca del siglo XVII con más de 20 años de experiencia en museos internacionales. Doctorada por la Universidad de Oxford.',
    email: 'e.marsh@harvard.edu',
    avatar: 'EM'
  },
  {
    name: 'Dr. James Okonkwo',
    role: 'Conservador',
    department: 'Arte Asiático',
    bio: 'Experto en conservación de obras sobre papel y textiles asiáticos. Ha trabajado en el Metropolitan Museum of Art y el British Museum.',
    email: 'j.okonkwo@harvard.edu',
    avatar: 'JO'
  },
  {
    name: 'Sofía Reyes',
    role: 'Restauradora',
    department: 'Arte Contemporáneo',
    bio: 'Especializada en restauración de obras contemporáneas y nuevos medios. Graduada por el Instituto Central de Conservación de Madrid.',
    email: 's.reyes@harvard.edu',
    avatar: 'SR'
  }
]

function TeamPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Nuestro Equipo</h1>
        <p className={styles.intro}>
          El Harvard Art Museums cuenta con un equipo de profesionales 
          dedicados a la preservación, investigación y difusión del patrimonio artístico mundial.
        </p>
        <div className={styles.grid}>
          {team.map(member => (
            <div key={member.name} className={styles.card}>
              <div className={styles.avatar}>{member.avatar}</div>
              <div className={styles.info}>
                <h2 className={styles.name}>{member.name}</h2>
                <p className={styles.role}>{member.role} — {member.department}</p>
                <p className={styles.bio}>{member.bio}</p>
                <a href={`mailto:${member.email}`} className={styles.email}>
                  {member.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamPage