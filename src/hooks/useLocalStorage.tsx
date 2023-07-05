import { useState, useEffect } from 'react';

type StoredValue<T> = [T, (value: T) => void];

interface StorageData<T> {
  value: T;
  expire?: number;
}

function useLocalStorage<T>(key: string, initialValue: T, expirationSeconds?: number): StoredValue<T> {
  const storedData = localStorage.getItem(key);
  const parsedData: StorageData<T> = storedData ? JSON.parse(storedData) : { value: initialValue };

  const [value, setValue] = useState<T>(parsedData.value);

  useEffect(() => {
    if (expirationSeconds && parsedData.expire) {
      const expirationTime = parsedData.expire;
      const currentTime = Date.now();

      if (currentTime > expirationTime) {
        localStorage.removeItem(key);
        setValue(initialValue);
        return;
      }
    }
  }, [key, initialValue, expirationSeconds, parsedData.expire]);

  const updateValue = (newValue: T) => {
    setValue(newValue);
    if (expirationSeconds) {
      const expirationTime = Date.now() + expirationSeconds * 1000;
      const updatedData: StorageData<T> = { value: newValue, expire: expirationTime };
      localStorage.setItem(key, JSON.stringify(updatedData));
    } else {
      const updatedData: StorageData<T> = { value: newValue };
      localStorage.setItem(key, JSON.stringify(updatedData));
    }
  };

  return [value, updateValue];
}

export default useLocalStorage;
