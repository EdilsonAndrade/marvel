import { renderHook, act } from '@testing-library/react-hooks';

import MockAdapter from 'axios-mock-adapter';
import { ComicProvider, useComics } from '../../hooks/GetComics';
import api from '../../services/api';

const mockAdapter = new MockAdapter(api);

jest.mock('react-native-config', () => ({
  API_KEY: 'fakekey',
  MARVEL_TS: 'mv',
  MARVEL_HASH: 'hash',
}));

describe('GetComics Hook', () => {
  it('should be able to render', () => {
    const comicsHooks = renderHook(useComics, {
      wrapper: ComicProvider,
    });

    expect(comicsHooks).toBeTruthy();
  });

  it('should be able to fill comic data', async () => {
    const { result, waitForNextUpdate } = renderHook(useComics, {
      wrapper: ComicProvider,
    });

    mockAdapter.onGet('characters?name=hulk&apikey=fakekey&ts=mv&hash=hash').reply(200, {
      data: {
        results: [
          { id: '1' },
        ],
      },
    })
      .onGet('/characters/1/comics?limit=8&offset=0&apikey=fakekey&ts=mv&hash=hash').reply(200, {
        data: {
          results: [
            {
              id: '1',
              issueNumber: 'issue 1',
              thumbnail: {
                path: '',
                extension: '',
                size: 'portrait_medium',
              },

            },
          ],
        },
      });
    act(() => {
      result.current.getComicsByHeroName('hulk');
    });
    await waitForNextUpdate();

    expect(result.current).toBeTruthy();
    expect(result.current.comics).toEqual([
      {
        id: '1',
        issueNumber: 'issue 1',
        thumbnail: {
          path: '',
          extension: '',
          size: 'portrait_medium',
        },
        transformedUrlImage: '/portrait_fantastic.',
      },
    ]);
  });

  it('should be able to clear comic data when the request does not find hero comics', async () => {
    const { result, waitForNextUpdate } = renderHook(useComics, {
      wrapper: ComicProvider,
    });
    mockAdapter.resetHistory();
    mockAdapter.onGet('characters?name=hulk&apikey=fakekey&ts=mv&hash=hash').reply(200);

    act(() => {
      result.current.getComicsByHeroName('hulk');
    });
    await waitForNextUpdate();

    expect(result.current).toBeTruthy();
    expect(result.current.comics).toEqual([]);
  });

  it('should be able to clear comic data when the id is invalid', async () => {
    const { result, waitForNextUpdate } = renderHook(useComics, {
      wrapper: ComicProvider,
    });

    mockAdapter.onGet('characters?name=hulk&apikey=fakekey&ts=mv&hash=hash').reply(200, {
      data: {
        results: [
          { id: undefined },
        ],
      },
    });

    act(() => {
      result.current.getComicsByHeroName('hulk');
    });
    await waitForNextUpdate();

    expect(result.current).toBeTruthy();
    expect(result.current.comics).toEqual([]);
  });

  it('should be able to clear comic data when the request does not find hero comics', async () => {
    const { result, waitForNextUpdate } = renderHook(useComics, {
      wrapper: ComicProvider,
    });
    mockAdapter.resetHistory();
    mockAdapter.onGet('characters?name=hulk&apikey=fakekey&ts=mv&hash=hash').reply(200);

    act(() => {
      result.current.getComicsByHeroName('hulk');
    });
    await waitForNextUpdate();

    expect(result.current).toBeTruthy();
    expect(result.current.comics).toEqual([]);
  });

  it('should be able to clear comic data when the request throws an error', async () => {
    const { result, waitForNextUpdate } = renderHook(useComics, {
      wrapper: ComicProvider,
    });

    mockAdapter.onGet('characters?name=hulk&apikey=fakekey&ts=mv&hash=hash').reply(400);

    act(() => {
      result.current.getComicsByHeroName('hulk');
    });
    await waitForNextUpdate();

    expect(result.current).toBeTruthy();
    expect(result.current.comics).toEqual([]);
  });

  it('should reset the offset and clear the comics data', async () => {
    const { result, waitForNextUpdate } = renderHook(useComics, {
      wrapper: ComicProvider,
    });

    mockAdapter.onGet('characters?name=hulk&apikey=fakekey&ts=mv&hash=hash').reply(200, {
      data: {
        results: [
          { id: '1' },
        ],
      },
    })
      .onGet('/characters/1/comics?limit=8&offset=0&apikey=fakekey&ts=mv&hash=hash').reply(200, {
        data: {
          results: [
            {
              id: '1',
              issueNumber: 'issue 1',
              thumbnail: {
                path: '',
                extension: '',
                size: 'portrait_medium',
              },

            },
          ],
        },
      });
    act(() => {
      result.current.getComicsByHeroName('hulk');
    });
    await waitForNextUpdate();

    expect(result.current).toBeTruthy();
    expect(result.current.comics).toEqual([
      {
        id: '1',
        issueNumber: 'issue 1',
        thumbnail: {
          path: '',
          extension: '',
          size: 'portrait_medium',
        },
        transformedUrlImage: '/portrait_fantastic.',
      },
    ]);
    act(() => result.current.resetOffset());
    expect(result.current.comics).toEqual([]);
  });
});
