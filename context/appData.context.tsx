import React, { useReducer, useState } from 'react';
import axios from 'axios';
//Services
import * as ShoesService from '../services/shoes/Shoes.services'
import * as StoresService from '../services/stores/Stores.services'
import {ShoesData } from '../interfaces/Shoes.interfaces';
import { Stores } from '../interfaces/Stores.interfaces';


export interface AppDataContext {
  shoes: ShoesData,
  stores: Stores[],
  searchKey: string,
  getAllShoes: (sorts: any) => Promise<void>;
  getAllStores: () => Promise<void>;
  search: (val: string) => void;
}

const initialContextValue: AppDataContext = {
  shoes: {
    count: 0,
    shoes: [],
  },
  stores: [],
  searchKey: '',
  getAllShoes: async () => { },
  getAllStores: async () => { },
  search: () => {}
};

export const AppDataContext = React.createContext<AppDataContext>(initialContextValue);

interface AppDataProviderProps {
    children: React.ReactNode;
}

export const AppDataprovider = ({ children }: AppDataProviderProps) => {
  const [shoes, setShoes] = useState<ShoesData>({
    count: 0,
    shoes: [],
  });
  const [stores, setStores] = useState<Stores[]>([])
  const [searchKey, setSearchKey] = useState<string>('')
  return (
      <AppDataContext.Provider
          value={{
            shoes,
            stores,
            searchKey,
            getAllShoes: async (sorts: any) => {
                  try {
                      const res = await ShoesService.requestShoes(sorts);
                      setShoes({
                        count: res.count,
                        shoes: res.shoes,
                      });
                  } catch (error) {
                      console.log(error);
                  }
            },
            getAllStores: async () => {
              try {
                const res = await StoresService.requestStores();
                setStores(res)
              } catch (error) {
                console.log(error);
                
              }
        },
        search: (val: string) => {
          setSearchKey(val)
        }
      }}
      >
          {children}
      </AppDataContext.Provider>
  )
  
}

// const GlobalState = props => {
//     const initialState = {
//         shoes: [
//             {
//                 name: 'Nike ZoomX Vaporfly Next% x Gyakusou',
//                 image: shoe1,
//                 slug: 'nike-zoomx-vaporfly-next-x-gyakusou',
//                 price: 200
//             },
//             {
//                 name: 'Nike Adapt BB 2.0',
//                 image: shoe2,
//                 slug: 'nike-adapt-bb-2.0',
//                 price: 150
//             },
//             {
//                 name: 'Nike ZoomX Vaporfly NEXT% 2',
//                 image: shoe3,
//                 slug: 'nike-zoomz-vaporfly-next-2',
//                 price: 120
//             },
//             {
//                 name: 'Nike Air Max 95',
//                 image: shoe4,
//                 slug: 'nike-air-max-95',
//                 price: 138.97
//             },
//             {
//                 name: 'Nike Air Zoom Alphafly NEXT% Flyknit',
//                 image: shoe5,
//                 slug: 'nike-air-zoom-alphafly-next-flyknit',
//                 price: 100
//             },
//             {
//                 name: 'Nike Air Zoom Pegasus 38',
//                 image: shoe6,
//                 slug: 'nike-air-zoom-pegasus-38',
//                 price: 250
//             },
//             {
//                 name: 'Nike Air Max 270',
//                 image: shoe7,
//                 slug: 'nike-air-max-270',
//                 price: 150
//             },
//             {
//                 name: "Nike Air Max 95 Essential",
//                 image: shoe8,
//                 slug: "nike-air-max-95-essential",
//                 price: 170
//             },
//             {
//                 name: 'Nike Air VaporMax Plus',
//                 image: shoe9,
//                 slug: 'nike-air-vapormax-plus',
//                 price: 200
//             },
//             {
//                 name: 'Nike Air Force 1 \'07 Craft',
//                 image: shoe10,
//                 slug: 'nike-air-force-1-07-craft',
//                 price: 120
//             }
//         ],
//         current: null
//     }

//     const [state, dispatch] = useReducer(globalReducer, initialState)

//     const setCurrent = slug => {
//         let selectedShoe = state.shoes.filter(shoe => shoe.slug === slug)[0];
//         try {
//             selectedShoe = selectedShoe.name !== null && selectedShoe;
//         } catch (error) {
//             selectedShoe = {
//                 name: null,
//                 image: null,
//                 price: null,
//                 slug: null
//             }
//         }
//         dispatch({
//             type: SET_CURRENT,
//             payload: selectedShoe
//         })
//     }

//     const clearCurrent = () => {
//         console.log('estoy aqui');
//         dispatch({ type: CLEAR_CURRENT })
//     };

//     return (
//         <globalContext.Provider
//             value={{
//                 shoes: state.shoes,
//                 current: state.current,
//                 setCurrent: setCurrent,
//                 clearCurrent: clearCurrent
//             }}
//         >
//             {props.children}
//         </globalContext.Provider>
//     )
// }
