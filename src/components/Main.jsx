import React from 'react';
import api from '../utils/api';
import Card from './Card';

const Main = (props) => {
  const [userPofile, setUserProfile] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getCards()])
      .then(([profile, listCards]) => {
        setUserProfile(profile);
        setCards(listCards);
      }).catch(error => console.log(error));
  }, [])

  return (
    <main className="main">
      <section className="profile">
        <button className="profile__avatar-edit" type="button" title="Изменить аватар">
          <img className="profile__avatar" src={userPofile.avatar} alt="Аватар пользователя" onClick={props.onEditAvatar}/>
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{userPofile.name}</h1>
          <button className="profile__edit-button link" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
          <p className="profile__subtitle">{userPofile.about}</p>
        </div>
        <button className="profile__add-button link" type="button" aria-label="Добавить пост" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;