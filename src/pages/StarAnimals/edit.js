import React from 'react';
import { connect } from 'dva';
import styles from './edit.less';
import PageLoading from '@/components/PageLoading';

const StarAnimalEdit = ({ currentAnimal }) => {
  if (!currentAnimal) {
    return <PageLoading />;
  }

  return (
    <div className={styles.editAnimal}>
      <h3 className={styles.title}>{currentAnimal.name}</h3>
    </div>
  );
};

const mapStateToProps = state => ({
  currentAnimal: state.starAnimals.currentAnimal,
});

export default connect(mapStateToProps)(StarAnimalEdit);
