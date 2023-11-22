import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Search.scss';
import ProductCard from '../ProductCard/ProductCard';

const Search = ({ menuItems, isSearching }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterMenuItems = () => {
    return menuItems.filter((item) => {
      // Check if any prop contains the search term
      return (
        item.id.toString().includes(searchTerm) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categories.some((category) =>
          category.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        item.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });
  };

  return (
    <div className="search">
      
      <AnimatePresence>
        {isSearching && (
          <motion.div
            className="search-input-container"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: "40%" }}
            exit={{ opacity: 0, x: '100%' }}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className='search__input'
            />
          </motion.div>
        )}
      </AnimatePresence>
      <ul className='menu'>
        {filterMenuItems().map((item) => (
          <ProductCard key={item.id} props={item} />
        ))}
      </ul>
    </div>
  );
};

export default Search;
