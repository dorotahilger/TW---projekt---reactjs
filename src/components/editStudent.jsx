import React, { useState } from 'react';

const updateStudent =  (studentId, firstName, lastName) => {
    try {
      if (studentId && firstName && lastName) {
         fetch(`http://localhost:8000/students/${studentId}`, {
          method: 'PUT',
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  
  

function ChangeStudent() {
  const [isChanged, setIsChanged] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleChangeStudent = async () => {
    try {
      const isSuccess = await updateStudent(
        studentId,
        firstName,
        lastName
      );
      setIsChanged(isSuccess);
    } catch (error) {
      console.error('Pojawił się błąd podczas tworzenia studenta: ', error);
      setIsChanged(false);
    }
  };

  const handleIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  return (
    <div>
      <h1>Zmodyfikuj dane studenta</h1>
      <label>Numer ID:</label>
      <input
        type="number"
        id="studentId"
        value={studentId}
        onChange={handleIdChange}
      />
      <br />
      <label>Nowe imię:</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <br />
      <label>Nowe nazwisko:</label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <br />
      <button onClick={handleChangeStudent}>Zmień studenta</button>
      {isChanged && <p>Student zmieniony</p>}
    </div>
  );
}

export default ChangeStudent;
