import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { host } from '@/components/ImgUpload'

import styles from './index.less';

const StarAnimals = ({ animals = [], history }) => {
  return (
    <React.Fragment>
      <PageHeaderWrapper />
      <Card bordered={false} style={{marginTop: '1em'}} className={styles.editAnimal}>
        <div className={styles.starAnimalPortal}>
          {animals.map(animal => (
            <div
              onClick={() => history.push(`/starAnimals/edit/${animal.name}`)}
              key={animal.name}
              className={styles.starAnimalCard}
            >
              {/*<img alt={animal.name} src={`${host}${JSON.parse(animal.thumbnail)[0]}`} className={styles.animalImage} />*/}
              <div className={styles.name}>{animal.name}</div>
            </div>
          ))}
        </div>
      </Card>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    animals: state.starAnimals.animals,
  };
};

export default connect(mapStateToProps)(StarAnimals);
