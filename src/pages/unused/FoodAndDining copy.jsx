import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../components/Firebase';
function FoodAndDining() {
  const [foodData, setFoodData] = useState([]);
  const [newCard, setNewCard] = useState({ shopName: '', location: '', category: '', description: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('adminLoggedIn') === 'true');
  const navigate = useNavigate();

  // Check if "FoodAndDining" collection exists and retrieve data
  useEffect(() => {
    const fetchFoodData = async () => {
      const foodCollectionRef = collection(db, 'FoodAndDining');
      const foodSnapshot = await getDocs(foodCollectionRef);
      if (!foodSnapshot.empty) {
        const foodList = foodSnapshot.docs.map((doc) => doc.data());
        setFoodData(foodList);
      }
    };
    fetchFoodData();
  }, []);

  const handleAddCard = async () => {
    try {
      await addDoc(collection(db, 'FoodAndDining'), {
        shopName: newCard.shopName,
        location: newCard.location,
        category: newCard.category,
        description: newCard.description,
      });
      setFoodData([...foodData, newCard]);
      setNewCard({ shopName: '', location: '', category: '', description: '' });
    } catch (error) {
      alert('Error adding new card: ' + error.message);
    }
  };

  const handleEditCard = (index) => {
    // Edit logic here (could be a modal or in-place editing)
    alert(`Edit card logic for ${foodData[index].shopName}`);
  };

  const handleChange = (e) => {
    setNewCard({
      ...newCard,
      [e.target.name]: e.target.value,
    });
  };

  if (!isLoggedIn) {
    navigate('/');
  }

  return (
    <div>
      <h2>Food and Dining</h2>
      {/* Existing food data cards */}
      <div className="cards-container">
        {foodData.map((item, index) => (
          <div key={index} className="card">
            <h3>{item.shopName}</h3>
            <p>Location: {item.location}</p>
            <p>Category: {item.category}</p>
            <p>{item.description}</p>
            {isLoggedIn && (
              <button onClick={() => handleEditCard(index)}>Edit</button>
            )}
          </div>
        ))}
      </div>

      {/* Add New Card Form */}
      {isLoggedIn && (
        <div className="add-card-form">
          <h3>Add New Food and Dining</h3>
          <input
            type="text"
            name="shopName"
            value={newCard.shopName}
            onChange={handleChange}
            placeholder="Shop Name"
          />
          <input
            type="text"
            name="location"
            value={newCard.location}
            onChange={handleChange}
            placeholder="Location"
          />
          <select
            name="category"
            value={newCard.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Coffeeshop">Coffeeshop</option>
            <option value="Fastfood">Fastfood</option>
            <option value="Restaurant">Restaurant</option>
          </select>
          <textarea
            name="description"
            value={newCard.description}
            onChange={handleChange}
            placeholder="Description"
          ></textarea>
          <button onClick={handleAddCard}>Add Card</button>
        </div>
      )}

      {/* + Button */}
      {isLoggedIn && (
        <button onClick={handleAddCard} className="btn btn-primary">+</button>
      )}
    </div>
  );
}

export default FoodAndDining;
