"use client"
import { useEffect, useState } from 'react';
import { getFirestore, collection, where, query, getDocs, or } from 'firebase/firestore';
import { app } from '../firebase';

const db = getFirestore(app);
const posesCollection = collection(db, 'yogaPose');

const YogaPosesPage = () => {
  const [matchingPoses, setMatchingPoses] = useState([]);
  const [diseases, setDisease] =useState( ["diabetes"]); // Replace with user input
  const[painAreas, setPainAreas]= useState(["back"])
  const[aim, setAim]=useState(["Increase Flexibility & Mobility"])
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log({diseases})
        const q = query(posesCollection,  or(where('diseases', 'array-contains-any', diseases),
        where('painAreas', 'array-contains-any',painAreas),
        where('Aim','array-contains-any',aim)
        ));
        const querySnapshot = await getDocs(q);
        const matchingPosesData = querySnapshot.docs.map(doc => doc.data());
        // console.log(matchingPosesData)
        setMatchingPoses(matchingPosesData);
      } catch (error) {
        console.error(error);
        console.log("error caught");
      }
    };

    fetchData();
  }, [diseases]);
  useEffect(()=>{
    if(matchingPoses.length > 0)
    console.log(matchingPoses);
  }, [matchingPoses])

  return (
    <div>

    </div>
  );
};

export default YogaPosesPage;