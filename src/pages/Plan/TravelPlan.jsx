import { useState } from 'react';
import PlanSummary from './PlanSummary';
import TransportationCard from './TransportationCard';
import AccommodationCard from './AccommodationCard';
import AttractionCard from './AttractionCard';
import './TravelPlan.css';

function TravelPlan() {
  const [selectedCard, setSelectedCard] = useState('transportation');

  const handleCardClick = (card) => {
    setSelectedCard(card === selectedCard ? null : card); // Nếu click lại thì bỏ chọn
    console.log(card);
    if(card=='attraction')handleAttractionSelected();
  };

  // Hàm này chỉ được gọi khi nhấn next hoặc back trong AttractionCard
  const handleAttractionSelected = () => {
    setSelectedCard('attraction'); // Luôn chọn AttractionCard khi nhấn next hoặc back
  };

  return (
    <main className="travel-plan">
      <PlanSummary />
      <section className="travel-details">
        <TransportationCard
          className={selectedCard === 'transportation' ? 'active' : selectedCard ? 'inactive' : ''}
          onClick={() => handleCardClick('transportation')}
        />
        <AccommodationCard
          className={selectedCard === 'accommodation' ? 'active' : selectedCard ? 'inactive' : ''}
          onClick={() => handleCardClick('accommodation')}
        />
        <AttractionCard
          className={selectedCard === 'attraction' ? 'active' : selectedCard ? 'inactive' : ''}
          onClick={() => 
            handleCardClick('attraction') // Gọi hàm này khi click vào AttractionCard 
          }
          onNext={handleAttractionSelected} // Truyền hàm này vào props
          onBack={handleAttractionSelected} // Truyền hàm này vào props
        />
      </section>
    </main>
  );
}

export default TravelPlan;
