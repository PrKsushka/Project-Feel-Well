import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';
import ModalForLogin from '../../components/modals/module/modalForLogin';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { loginModalActivation } from '../../store/modules/modals/modal.actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/types/types';
import ModalForRegistration from '../../components/modals/module/modalForRegistration';
import links from '../../constants/links';
import CircleButton from '../../UI/circleButton/circleButton';
import { getThreeRandomRecipes } from '../../api/dataAboutRecipes';
import { RecipeTypes } from '../../store/types/recipes.types';
import interestingFactsForHome from '../../constants/interestingFactsForHome';

type LocationStateTypes = {
  from: {
    pathname: string;
  };
};
const Home: React.FunctionComponent = () => {
  const auth = useSelector((state: StoreState) => state.user.auth);
  const history = useHistory();
  const location = useLocation();
  const locationState = location.state as LocationStateTypes;
  const dispatch = useDispatch();
  const loginModal = useSelector((state: StoreState) => state.modal.loginModal);
  const registrationModal = useSelector((state: StoreState) => state.modal.registrationModal);
  if (!auth && history.location.search === '?signIn=false') {
    dispatch(loginModalActivation(true));
  }
  if (!auth && history.location.search === '/') {
    dispatch(loginModalActivation(false));
  }
  if (auth) {
    if (locationState) {
      console.log(locationState);
      history.push(locationState.from.pathname);
    }
  }
  const [arrOfRandomProducts, setArrOfRandomProducts] = useState<Array<RecipeTypes>>([]);
  useEffect(() => {
    getThreeRandomRecipes()
      .then((res) => {
        if (res.data) {
          setArrOfRandomProducts((prevState) => {
            return [...prevState, ...res.data];
          });
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    window.scrollTo(0, 0);
  }, []);

  const handleClick = (id?: number) => (e?: React.SyntheticEvent) => {
    history.push(`${links.recipes}/${id}`);
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainBanner}>
        <div className={styles.salads} />
        <div className={styles.leaf} />
        <div className={styles.textBlock}>
          <h3>Healthy wealthy life</h3>
          <p>прямо здесь прямо сейчас</p>
        </div>
        <div className="vector"></div>
        <div className={styles.wrapperForDesc}>
          <div className={styles.desk}></div>
        </div>
      </div>
      <div className={styles.secondWindow}>
        <div className={styles.secondBlockText}>
          <h3>О нас</h3>
          <p>
            Привет! Добро пожаловать в мир полезной еды, классных ребят, крутых мест. Приложение-помощник, котрое поможет тебе поддерживать свое
            здоровье. Здесь ты найдешь отличные рецепты в зависимости от твоих особенностей огранизма, узнаешь много нового.{' '}
          </p>
          <Link to={links.health} className={styles.beigeButton}>
            Перейти
          </Link>
        </div>
        <div className={styles.cherry} />
      </div>
      <div className={styles.thirdWindow}>
        <h3 className={styles.title}>РЕЦЕПТЫ ДНЯ</h3>
        <div className={styles.leaf} />
        <div className={styles.cardWrapper}>
          {arrOfRandomProducts.length !== 0
            ? arrOfRandomProducts.map((el: RecipeTypes, i) => (
                <div key={i} className={styles.card} style={{ backgroundImage: `url(${require(`../../${el.image}`)})` }}>
                  <div className={styles.whiteElem}>
                    <h3 className={styles.cardTitle}>{el.name}</h3>
                    <CircleButton clickFunc={() => handleClick(el._id || el.id)} id={el._id || el.id} />
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className={styles.secondLeaf}></div>
      </div>
      <div className={styles.fourthWindow}>
        <div className={styles.title}>ПОЛЕЗНЫЕ ФАКТЫ</div>
        <div className={styles.factsWrapper}>
          {interestingFactsForHome.map((el) => (
            <div className={styles.facts} key={el.id}>
              <div
                className={styles.factsImage}
                style={{
                  background: `url(${require(`../../${el.image}`)}) no-repeat center`,
                  backgroundSize: 'cover',
                }}
              ></div>
              <div className={styles.factsContent}>
                <h3>{el.name}</h3>
                <p>{el.content}</p>
                <Link to={links.health} className={styles.beigeButton} style={{ margin: '20px 0 0 0', marginInline: 'auto' }}>
                  Читать
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.fifthWindow}>
        <h3>Магазины, рестораны, кафе</h3>
        <p>Подбери для себя идеальное место прямо сейчас </p>
        <Link to={links.places} className={styles.beigeButton} style={{ margin: '0' }}>
          Перейти
        </Link>
      </div>
      {loginModal ? <ModalForLogin /> : null}
      {registrationModal ? <ModalForRegistration /> : null}
    </div>
  );
};
export default Home;
