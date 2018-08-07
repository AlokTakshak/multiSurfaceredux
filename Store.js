import * as React from 'react';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
/**
 * If you want to share data between multiple root components, you'll need a
 * global store like Redux. This is similar to building a web app where you
 * want to synchronize data between a sidebar and a main view - just extended
 * into three dimensions.
 * To simplify this sample, we implement a trivial Redux-like store that will
 * ensure all of our elements are synchronized.
 */
const State = {
  posts: undefined,
  current: -1,
};


const POLY_PATH = 'https://poly.googleapis.com/v1/assets?';
export function initialize(apiKey) {
  // Fetch the top 5 posts from Google Poly
  return function (dispatch){
  const options = {
    curated: true,
    format: 'GLTF2',
    key: apiKey,
    pageSize: 5,
  };
  const queryString = Object.keys(options)
    .map(k => `${k}=${options[k]}`)
    .join('&');
  fetch(POLY_PATH + queryString)
    .then(response => response.json())
    .then(body => {
      const entries = body.assets.map(asset => {
        const objSource = asset.formats.filter(
          format => format.formatType === 'GLTF2'
        )[0];
        return {
          id: asset.name,
          name: asset.displayName,
          author: asset.authorName,
          description: asset.description,
          source: objSource,
          preview: asset.thumbnail.url,
        };
      });

      State.posts = entries;
      dispatch({type:'initalizeState'});
    });
  }
}


function reducer (state={...State},action)  {
  switch (action.type) {
    case 'setCurrent':
              return {...state,
                        current: action.value,
                    };
      break;
      case 'initalizeState' :
         return {...State};

    default:
    {
      return state;
    }

  }
}
export const store=createStore(reducer,applyMiddleware(thunk));
