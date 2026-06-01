import styles from '../styles/Card.module.css';

export default function Card({ filme }) {
  if (!filme) return null;

  return (
    <div className={styles.card}>
      <img 
        src={filme.Poster !== 'N/A' ? filme.Poster : '/placeholder.png'} 
        alt={filme.Title} 
      />
      <div className={styles.info}>
        <h3>{filme.Title}</h3>
        <p><strong>Ano:</strong> {filme.Year}</p>
        
        {}
        <p className={styles.diretor}>Diretor: Não disponível</p>
        
        {}
        <p className={styles.nota}>★ Nota: Em breve</p>
      </div>
    </div>
  );
}