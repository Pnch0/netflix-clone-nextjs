import axios from 'axios';

export const MovieService = {
  getTrending: async (mediaType = 'all', timeWindow = 'week') => {
    const { data } = await axios.get(`/api/movies/trending?mediaType=${mediaType}&timeWindow=${timeWindow}`);
    return data;
  },

  getMoviesByCategory: async (category = 'popular', page = 1) => {
    const { data } = await axios.get(`/api/movies/category?type=movie&category=${category}&page=${page}`);
    return data;
  },

  getTvShowsByCategory: async (category = 'popular', page = 1) => {
    const { data } = await axios.get(`/api/movies/category?type=tv&category=${category}&page=${page}`);
    return data;
  },

  discoverByGenre: async (mediaType = 'movie', genreId, page = 1) => {
    const { data } = await axios.get(`/api/movies/discover?mediaType=${mediaType}&genreId=${genreId}&page=${page}`);
    return data;
  },

  searchMulti: async (query, page = 1) => {
    const { data } = await axios.get(`/api/movies/search?query=${encodeURIComponent(query)}&page=${page}`);
    return data;
  },

  getKdramas: async (page = 1) => {
    const { data } = await axios.get(`/api/movies/kdramas?page=${page}`);
    return data;
  },

  getMovieDetails: async (id) => {
    const { data } = await axios.get(`/api/movies/details/movie?id=${id}`);
    return data;
  },

  getTvDetails: async (id) => {
    const { data } = await axios.get(`/api/movies/details/tv?id=${id}`);
    return data;
  },

  getGenres: async (mediaType = 'movie') => {
    const { data } = await axios.get(`/api/movies/genres?mediaType=${mediaType}`);
    return data;
  }
};

export const AuthService = {
  login: async (credentials) => {
    const { data } = await axios.post('/api/users/login', credentials);
    return data;
  }
};

export const UserService = {
  createUser: async (userData) => {
    const { data } = await axios.post('/api/users/register', userData);
    return data;
  }
};

