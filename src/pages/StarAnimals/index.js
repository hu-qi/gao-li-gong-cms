import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const StarAnimals = ({ animals = [], history }) => {
  return (
    <div>
      <h2 className={styles.pageTitle}>明星物种</h2>

      <div className={styles.starAnimalPortal}>
        {animals.map(animal => (
          <div
            onClick={() => history.push(`/starAnimals/edit/${animal.name}`)}
            key={animal.name}
            className={styles.starAnimalCard}
          >
            <img alt={animal.name} src={animal.imgUrl} className={styles.animalImage} />

            <div className={styles.name}>{animal.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    animals: state.starAnimals.animals,
  };
};

export default connect(mapStateToProps)(StarAnimals);
