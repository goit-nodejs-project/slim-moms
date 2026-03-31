import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/diary/diaryOperations';
import axiosInstance from '../../api/axiosInstance';
import styles from './DiaryAddProductForm.module.css';

const DiaryAddProductForm = () => {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.diary.date);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productName, setProductName] = useState('');
  const [grams, setGrams] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');

  const debounceRef = useRef(null);
  const inputRef = useRef(null);
  const lastQueryRef = useRef('');

  const handleProductChange = (e) => {
    const value = e.target.value;
    setProductName(value);
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (!value.trim()) {
        setSuggestions([]);
        return;
      }

      lastQueryRef.current = value;

      try {
        const { data } = await axiosInstance.get(`/products?q=${value}`);

        if (lastQueryRef.current === value) {
          setSuggestions(Array.isArray(data) ? data : data.products || []);
        }
      } catch {
        setSuggestions([]);
      }
    }, 300);
  };

  const handleSelectSuggestion = (item) => {
    setProductName(item.title);
    setSelectedProductId(item._id);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedProductId) {
      setError('Please select a product from the list');
      return;
    }

    if (!grams || grams <= 0) {
      setError('Please enter valid grams');
      return;
    }

    try {
      await dispatch(
        addProduct({
          date,
          productId: selectedProductId,
          weight: Number(grams),
        })
      ).unwrap();
      setProductName('');
      setGrams('');
      setSuggestions([]);
    } catch {
      setError('Failed to add product');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={inputRef}>
      <div style={{ position: 'relative', flex: 1 }}>
        <input
          className={styles.input}
          type="text"
          placeholder="Product name"
          value={productName}
          onChange={handleProductChange}
          onFocus={() => setShowDropdown(true)}
        />

        {showDropdown && suggestions.length > 0 && (
          <div className={styles.dropdown}>
            {suggestions.map((item) => (
              <div
                key={item._id}
                className={styles.dropdownItem}
                onClick={() => handleSelectSuggestion(item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        className={styles.inputSmall}
        type="number"
        placeholder="Grams"
        value={grams}
        min="1"
        onChange={(e) => setGrams(e.target.value)}
      />

      <button className={styles.btn} type="submit">
        +
      </button>

      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

export default DiaryAddProductForm;
