import axios from 'axios';

const Deneme = () => {


const fetchRooms = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/rooms'); // Backend URL'ini doğru şekilde ekleyin
    console.log(response.data); // Gelen veri
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
};

fetchRooms();
}

export default Deneme