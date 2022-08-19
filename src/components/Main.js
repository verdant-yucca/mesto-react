import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js'

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getAppInfo()
      .then(([date, cards]) => {
        setUserName(date.name);
        setUserDescription(date.about);
        setUserAvatar(date.avatar);
        setCards(cards);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }, [])

  const imageStyle = { backgroundImage: `url(${userAvatar})` };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar"  style={imageStyle}  onClick={props.onEditAvatar}></div>
        <div>
          <div className="profile__info-block">
            <h1 className="profile__profile-name">{userName}</h1>
            <button type="button" className="profile__button-edit" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__profile-info">{userDescription}</p>
        </div>
        <button type="button" className="profile__button-add" onClick={props.onAddPlace}></button>
      </section>

      <section>
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
