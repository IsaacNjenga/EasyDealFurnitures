import { createContext, useCallback, useContext, useState } from "react";
import debounce from "lodash.debounce";
import useFetchAllProducts from "../../hooks/fetchAllProducts";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { products } = useFetchAllProducts();

  // Enhanced search function that checks multiple fields
  const performSearch = useCallback(
    (term) => {
      if (!term || term.length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      const searchLower = term.toLowerCase().trim();
      const searchWords = searchLower.split(/\s+/); // Split into words

      const filtered = products.filter((product) => {
        // Extract searchable text from product
        const name = (product.name || "").toLowerCase();
        const description = (product.description || "").toLowerCase();
        const type = (product.type || "").toLowerCase();
        const category = (product.category || "").toLowerCase();
        const tags = (product.tags || []).map((tag) => tag.toLowerCase());
        const colours = (product.colour || []).map((c) => c.toLowerCase());

        // Combine all searchable fields
        const searchableText = [
          name,
          description,
          type,
          category,
          ...tags,
          ...colours,
        ].join(" ");

        // Check if any search word matches
        const wordMatch = searchWords.some((word) =>
          searchableText.includes(word)
        );

        // Check for exact phrase match (higher priority)
        const phraseMatch = searchableText.includes(searchLower);

        // Check name starts with search term (highest priority)
        const nameStartsWith = name.startsWith(searchLower);

        return wordMatch || phraseMatch || nameStartsWith;
      });

      // Sort results by relevance
      const sorted = filtered.sort((a, b) => {
        const aName = (a.name || "").toLowerCase();
        const bName = (b.name || "").toLowerCase();

        // Prioritize exact name matches
        if (aName === searchLower) return -1;
        if (bName === searchLower) return 1;

        // Prioritize names that start with search term
        const aStarts = aName.startsWith(searchLower);
        const bStarts = bName.startsWith(searchLower);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        // Prioritize by type match
        const aType = (a.type || "").toLowerCase();
        const bType = (b.type || "").toLowerCase();
        if (aType.includes(searchLower) && !bType.includes(searchLower))
          return -1;
        if (!aType.includes(searchLower) && bType.includes(searchLower))
          return 1;

        // Sort by availability
        if (a.available && !b.available) return -1;
        if (!a.available && b.available) return 1;

        // Finally sort alphabetically
        return aName.localeCompare(bName);
      });

      setResults(sorted);
      setLoading(false);
    },
    [products]
  );

  // Debounced search
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((term) => {
      performSearch(term);
    }, 350),
    [performSearch]
  );

  // Update search term and trigger debounced search
  const onSearchChange = useCallback(
    (e) => {
      const val = e.target.value || "";
      setSearchTerm(val);

      if (!val.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      debouncedSearch(val);
    },
    [debouncedSearch]
  );

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setResults([]);
    setLoading(false);
  }, []);

  const value = {
    setSearchTerm,
    searchTerm,
    results,
    setResults,
    setSearchOpen,
    searchOpen,
    onSearchChange,
    loading,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
