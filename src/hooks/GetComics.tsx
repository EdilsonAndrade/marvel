import React, {
  createContext, useCallback, useContext, useState,
} from 'react';

import Config from 'react-native-config';
import PropTypes from 'prop-types';

import api from '../services/api';

export interface IComic{
    id:string;
    issueNumber:number;
    thumbnail:{
      path:string;
      extension:string;
      size: 'portrait_medium'
    };
    prices:[
      {price:number}
    ];
    title:string;
    transformedUrlImage: string;
}

interface IComicResponse{
  data:{
    results:IComic[];
  }
}
interface IComicData{
  comics:IComic[];
  getComicsByHeroName(hero:string): Promise<void>;
  loading:boolean;
  resetOffset():void;
}

const ComicContext = createContext<IComicData>({} as IComicData);

const ComicProvider: React.FC = ({ children }) => {
  const [comicData, setComicData] = useState<IComic[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getComicsByHeroName = useCallback(async (hero:string) => {
    try {
      setLoading(true);
      const characterResponse = await api.get(`/characters?name=${hero}&apikey=${Config.API_KEY}&ts=${Config.MARVEL_TS}&hash=${Config.MARVEL_HASH}`);
      if (characterResponse.data === undefined) {
        setComicData([]);
      } else {
        const { id } = characterResponse.data?.data?.results[0];

        if (id) {
          const response = await api.get<IComicResponse>(`/characters/${id}/comics?limit=8&offset=${offset}&apikey=${Config.API_KEY}&ts=${Config.MARVEL_TS}&hash=${Config.MARVEL_HASH}`);

          const data:IComic[] = response.data.data.results.map((comicElement) => ({
            ...comicElement,
            transformedUrlImage: `${comicElement.thumbnail.path}/portrait_fantastic.${comicElement.thumbnail.extension}`,
          }));
          setOffset(offset + 10);
          setComicData([...comicData, ...data]);
        } else {
          setComicData([]);
        }
      }
    } catch (error) {
      setComicData([]);
    }
    setLoading(false);
  }, [comicData, offset]);

  const resetOffset = () => {
    setComicData([]);
    setOffset(0);
  };

  return (
    <ComicContext.Provider
      value={
      {
        comics: comicData,
        getComicsByHeroName,
        loading,
        resetOffset,
      }
    }
    >
      {children}
    </ComicContext.Provider>
  );
};

function useComics(): IComicData {
  const ctx = useContext(ComicContext);
  return ctx;
}

ComicProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export { ComicProvider, useComics };
