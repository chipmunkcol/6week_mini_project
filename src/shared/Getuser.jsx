import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookieToken } from './cookie';

const UseGetUser = () => {
  const [user, setUser] = useState(null);

  const readUser = async () => {
    const response = await axios.get(
      'http://54.180.122.99/api/myPage/products',
      {
        headers: {
          Authorization: getCookieToken(),
        },
      }
    );
    console.log(response.data);
    setUser(response.data);
  };

  useEffect(() => {
    readUser();
  }, []);

  return user;
};

export default UseGetUser;
