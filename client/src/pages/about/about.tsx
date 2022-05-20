import React, { useEffect, useState } from 'react';
import { getDataAboutArticles } from '../../api/dataAboutArticles';
import styles from './about.module.scss';

interface ArticlesTypes {
  id?: number;
  _id?: number;
  title: string;
  main: string;
  image: string;
}

const About: React.FunctionComponent = () => {
  const [arrOfArticles, setArrOfArticles] = useState<Array<ArticlesTypes>>([]);
  useEffect(() => {
    getDataAboutArticles()
      .then((res) => {
        if (res.data) {
          setArrOfArticles((prevState) => [...res.data]);
        } else {
          throw Error();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.firstBanner}>
        <div className={styles.textForBanner}>
          <h3>Здоровый образ жизни</h3>
          <p>полезные заметки о питании, спорте</p>
        </div>
        <div className={styles.bannerImage}></div>
      </div>
      {arrOfArticles.map((el) => (
        <div className={styles.topic} key={el.id || el._id}>
          <div
            className={styles.image}
            style={{
              background: `url(${require(`../../${el.image}`)}) no-repeat center`,
              backgroundSize: 'cover',
            }}
          ></div>
          <div className={styles.text}>
            <h3 className={styles.title}>{el.title}</h3>
            <p className={styles.mainText}>{el.main}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default About;
