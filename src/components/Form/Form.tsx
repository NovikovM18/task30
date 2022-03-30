import React, {useState} from "react";
import classNames from 'classnames';

import './Form.scss';

interface TabsSel {
  id: string,
  title: string,
}

interface Tab {
  id: string,
  title: string,
}

interface Errors {
  firstName: boolean,
  surName: boolean,
  cardNumP1: boolean,
  cardNumP2: boolean,
  cardNumP3: boolean,
  cardNumP4: boolean,
  cardDate: boolean,
  cardCVV: boolean,
}

const tabsSel: TabsSel[] = [
  {id: 'tab-fo', title: 'Фіз.особа'},
  {id: 'tab-uo', title: 'Юр.особа'},
]

const tabs: Tab[] = [
  {id: 'tab-do', title: 'Зробити'},
  {id: 'tab-fin', title: 'Фінансова допомога'},
  {id: 'tab-mat', title: 'Матеріальна допомога'},
  {id: 'tab-vol', title: 'Волонтерство'},
]

const tabSystem: Tab[] = [
  {id: 'tab-visa', title: 'VISA'},
  {id: 'tab-pb', title: 'Privat24'},
  {id: 'tab-term', title: 'Terminals'},
  {id: 'tab-wm', title: 'WebMoney'},
  {id: 'tab-pp', title: 'PayPal'},
]


const isNumber = (val: string) => {
  return /^[0-9]{4}$/.test(val);
};

const isDate = (val: string) => {
  return /^[0-9]{2}[- /.][0-9]{2}$/.test(val);
};

const isCVV = (val: string) => {
  return /^[0-9]{3}$/.test(val);
};

function validate(firstName: string, surName: string, cardNumP1: string, cardNumP2: string, cardNumP3: string, cardNumP4: string, cardDate: string, cardCVV: string) {
  return {
    firstName: firstName.length === 0,
    surName: surName.length === 0,
    cardNumP1: cardNumP1.length === 0 || !isNumber(cardNumP1),
    cardNumP2: cardNumP2.length === 0 || !isNumber(cardNumP2),
    cardNumP3: cardNumP3.length === 0 || !isNumber(cardNumP3),
    cardNumP4: cardNumP4.length === 0 || !isNumber(cardNumP4),
    cardDate: cardDate.length === 0 || !isDate(cardDate),
    cardCVV: cardCVV.length === 0 || !isCVV(cardCVV),
  };
}

export const Form: React.FC = () => {
  const [selectedTabS, setSelectedTabS] = useState(tabsSel[0]);
  const [selectedTab, setSelectedTab] = useState(tabs[1]);
  const [selectedTS, setSelectedTS] = useState(tabSystem[0]);
  const [firstName, setFirstName] = useState('');
  const [surName, setSurname] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [adress, setAdress] = useState('');
  const [post, setPost] = useState('');
  const [cardNumP1, setCardNumP1] = useState('');
  const [cardNumP2, setCardNumP2] = useState('');
  const [cardNumP3, setCardNumP3] = useState('');
  const [cardNumP4, setCardNumP4] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [isDirty, setIsDirty] = useState({
    firstName: false, surName: false, cardNumP1: false, cardNumP2: false, cardNumP3: false, cardNumP4: false, cardDate: false, cardCVV: false,
  });

  const clearInputs = () => {
    setFirstName('');
    setSurname('');
    setCompany('');
    setEmail('');
    setTel('');
    setCountry('');
    setCity('');
    setState('');
    setAdress('');
    setPost('');
    setCardNumP1('');
    setCardNumP2('');
    setCardNumP3('');
    setCardNumP4('');
    setCardDate('');
    setCardCVV('');
  };

  const clearErrors = () => {
    setIsDirty({
      firstName: false, surName: false, cardNumP1: false, cardNumP2: false, cardNumP3: false, cardNumP4: false, cardDate: false, cardCVV: false,
    });
  };

  const errors = validate(firstName, surName, cardNumP1, cardNumP2, cardNumP3, cardNumP4, cardDate, cardCVV);

  const isEnabled = !Object.keys(errors).some(x => errors[x as keyof Errors]);

  const cardNum: string = `${cardNumP1} ${cardNumP2} ${cardNumP3} ${cardNumP4}`

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFinHelpInfo = {
      firstName,
      surName,
      company,
      email,
      tel,
      country,
      city,
      state,
      adress,
      post,
      cardNum,
      cardDate,
      cardCVV,
    };

    console.log(newFinHelpInfo);
    
    clearInputs();
    clearErrors();
  };

  return (
  <div className="App__container">
    <h1 className="App__title">Заповніть форму</h1>

    <div className="tabs-select">
      <ul className="tabs-select__list">
        {tabsSel.map(tab => (
          <li key={tab.id} className="tabs-select__item">
            <button
              className="tabs-select__button"
              type="button"
              onClick={() => setSelectedTabS(tab)}
              >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
    
    <form className="form" 
      onSubmit={onFormSubmit} 
      >
      {selectedTabS === tabsSel[0] && (
      <div className="self-inputs">
        <div className="self-info">
          <div className="self">
            <div className="name-container">
              <label htmlFor="name">Імя</label>

              <input
                className={classNames({ error: errors.firstName && isDirty.firstName })}
                type="text"
                id="firstName"
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
                onBlur={() => setIsDirty({ ...isDirty, firstName: true })}
                required
              />
            </div>
          
            <div className="name-container">
              <label htmlFor="surname">Фамілія</label>

              <input 
                className={classNames({ error: errors.surName && isDirty.surName })}
                type="text" 
                id="surname"
                value={surName}
                onChange={event => setSurname(event.target.value)}
                onBlur={() => setIsDirty({ ...isDirty, surName: true })}
                required
              />
            </div>
          </div>
          
          <div className="item-container">
            <label htmlFor="company">Найва компанії, організації</label>

            <input 
              type="text"
              id="company"
              value={company}
              onChange={event => setCompany(event.target.value)}
            />
          </div>
          
          <div className="item-container">
            <label htmlFor="email">Email-адрес</label>

            <input
              type="text"
              id="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </div>
        
          <div className="item-container">
            <label htmlFor="tel">Номер телефону</label>

            <input
              type="text"
              id="tel"
              value={tel}
              onChange={event => setTel(event.target.value)}
            />
          </div>
        </div>

        <div className="location">
          <div className="item-container">
            <label htmlFor="country">Країна</label>

            <input
              type="text"
              id="country"
              value={country}
              onChange={event => setCountry(event.target.value)}
            />
          </div>
          
          <div className="city">
            <div className="name-container">
              <label htmlFor="city">Місто</label>

              <input
                type="text"
                id="city"
                value={city}
                onChange={event => setCity(event.target.value)}
              />
            </div>
            
            <div className="name-container">
              <label htmlFor="state">Штат, район</label>

              <input
                type="text"
                id="state"
                value={state}
                onChange={event => setState(event.target.value)}
              />
            </div>
          </div>

          <div className="item-container">
            <label htmlFor="adress">Адреса</label>

            <input
              type="text"
              id="adress"
              value={adress}
              onChange={event => setAdress(event.target.value)}
            />
          </div>
          
          <div className="item-container">
            <label htmlFor="post">Поштовий індекс</label>

            <input 
              type="text"
              id="post"
              value={post}
              onChange={event => setPost(event.target.value)}
            />  
          </div>
        </div>
      </div>
      )}

      {selectedTabS === tabsSel[1] && (
        <div>
          <h2>Форма для юридичної особи</h2>
        </div>
      )}

      <div className="payment">
        <h1 className="App__title">Види допомоги</h1>

        <p>Ви можете змінити вид допомоги</p>

        <div className="tab">
          <ul className="tabs__list">
            {tabs.map(tab => (
              <li key={tab.id} className="tabs__item">
                <button
                  className="tabs__botton"
                  type="button"
                  onClick={() => setSelectedTab(tab)}
                  >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {selectedTab === tabs[0] && (
          <div>
            <p>Кращий подарунок - зробленний своїми руками</p>
          </div>
        )}

        {selectedTab === tabs[1] && (
        <div className="payment__info">
          <div className="payment__info__container">
            <div className="payment__info__system">
              <p>Спосіб оплати</p>

              <div className="tab-system">
                <ul className="tab-system__list">
                  {tabSystem.map(tab => (
                    <li key={tab.id} className="tab-system__item">
                      <button
                        className="tab-system__button"
                        type="button"
                        onClick={() => setSelectedTS(tab)}
                        >
                        {tab.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {selectedTS === tabSystem[0] && (
              <div className="payment__info__card-info">
                <p>Введіть наступні данні</p>
                
                <div className="card">
                  <div className="card-info-1">
                    <div className="card__item-container">
                      <label htmlFor="cardnumP1">Номер карти</label>
                        <div className="card-number">
                          <input 
                            className={classNames("card-number__item", { error: errors.cardNumP1 && isDirty.cardNumP1 })}
                            type="textP1"
                            id="cardnum"
                            value={cardNumP1}
                            onChange={event => setCardNumP1(event.target.value)}
                            onBlur={() => setIsDirty({ ...isDirty, cardNumP1: true })}
                            required
                          />

                          <input
                            className={classNames("card-number__item", { error: errors.cardNumP2 && isDirty.cardNumP2 })}
                            type="textP2"
                            id="cardnum"
                            value={cardNumP2}
                            onChange={event => setCardNumP2(event.target.value)}
                            onBlur={() => setIsDirty({ ...isDirty, cardNumP2: true })}
                            required
                          />

                          <input
                            className={classNames("card-number__item", { error: errors.cardNumP3 && isDirty.cardNumP3 })}
                            type="textP3"
                            id="cardnum"
                            value={cardNumP3}
                            onChange={event => setCardNumP3(event.target.value)}
                            onBlur={() => setIsDirty({ ...isDirty, cardNumP3: true })}
                            required
                          />

                          <input
                            className={classNames("card-number__item", { error: errors.cardNumP4 && isDirty.cardNumP4 })}
                            type="textP4"
                            id="cardnum"
                            value={cardNumP4}
                            onChange={event => setCardNumP4(event.target.value)}
                            onBlur={() => setIsDirty({ ...isDirty, cardNumP4: true })}
                            required
                          />
                        </div>
                    </div>
                  </div>

                  <div className="card-info-2">
                    <div className="card__item-container">
                      <label htmlFor="dateoff">Термін дії</label>

                      <input
                        className={classNames("card__input", { error: errors.cardDate && isDirty.cardDate })}
                        type="text"
                        id="dateoff"
                        value={cardDate}
                        onChange={event => setCardDate(event.target.value)}
                        onBlur={() => setIsDirty({ ...isDirty, cardDate: true })}
                        required
                      />
                    </div>

                    <div className="card__item-container">
                      <label htmlFor="CVV">CVC/CVV</label>

                      <input
                        className={classNames("card__input", { error: errors.cardCVV && isDirty.cardCVV })}
                        type="text"
                        id="CVV"
                        value={cardCVV}
                        onChange={event => setCardCVV(event.target.value)}
                        onBlur={() => setIsDirty({ ...isDirty, cardCVV: true })}
                        required
                      />
                    </div>
                  </div>
                
                </div>
              </div>
            )}

            {selectedTS === tabSystem[1] && (
              <div className="payment__info__card-info">
                <p>Рахунок для переказів у Приват24:</p>
              </div>
            )}

            {selectedTS === tabSystem[2] && (
              <div className="payment__info__card-info">
                <p>Рахунок для поповнення з терміналів:</p>
              </div>
            )}
            
            {selectedTS === tabSystem[3] && (
              <div className="payment__info__card-info">
                <p>Гаманець WebMoney:</p>
              </div>
            )}

            {selectedTS === tabSystem[4] && (
              <div className="payment__info__card-info">
                <p>Гаманець PayPal:</p>
              </div>
            )}
          </div>

          <button
            className="main-button"
            type="submit"
            disabled={!isEnabled}
          >
            Допомогти
          </button>
        </div>
        )}

        {selectedTab === tabs[2] && (
          <div>
            <p>"Нема грошей? - ..."</p>
          </div>
        )}
        
        {selectedTab === tabs[3] && (
          <div>
            <p>Волонтерство теж краще за нічого</p>
          </div>
        )}
      </div>
    </form>
  </div>
  );
};
