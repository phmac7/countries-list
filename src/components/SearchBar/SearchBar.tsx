import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  placeholder?: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar = ({
  placeholder = 'Search for a country...',
  setSearch,
  search,
}: Readonly<SearchBarProps>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <FaSearch
        className={styles.searchIcon}
        width={18}
        height={18}
        onClick={() =>
          (
            document.querySelector(`.${styles.searchInput}`) as HTMLInputElement
          )?.focus()
        }
        style={{ cursor: 'pointer' }}
        data-testid="search-icon"
      />
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        onChange={handleChange}
        value={search}
      />
    </div>
  );
};
