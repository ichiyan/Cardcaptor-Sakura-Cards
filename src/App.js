
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const baseUrl = "https://protected-taiga-89091.herokuapp.com";
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(baseUrl + '/api/card')
    .then(response => response.json())
    .then((res) => {
      setCards(res.data.map(card => {
        return{
          ...card,
          status: "clow",
        }
      })); 
    });
  }, []);


  function cardHandler(e){
      setCards(cards.map( card => {
          if(card._id === e.target.getAttribute('value')){
              return{
                  ...card, status: card.status === "clow" ? "sakura" : "clow",
              }
          }
          return card;
      }));
  }

  return (
    <div>
      <h1>Cardcaptor Sakura Cards</h1>
      <div className="text-center instructions">
        <span>Click the cards to toggle between Clow Cards and Sakura Cards</span>
      </div>
      <div className="container">
        <div className="text-center">  
        {
            cards.map(card => {
              return card.clowCard !== "" ?
              (
                <figure>
                  <img onClick={cardHandler} value={card._id} key={card._id} className="card-img" src={card.status === "clow" ? card.clowCard : card.sakuraCard}></img>
                  <figcaption>{card.kanji} | {card.Rōmaji}</figcaption>
                </figure>  
              )
              :
              null
            })
          }
      
        </div>
      </div>
    </div>
  );
}

export default App;
