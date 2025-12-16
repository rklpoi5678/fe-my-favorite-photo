// 'use client';

// import { useEffect, useState } from 'react';

// import { cardService } from '@/libs/services/cardService';

// export function useFetchPhotoCards(params = {}) {
//   const { searchKeyword = '', filter = {} } = params;
//   const { grade = '', genre = '', price = '' } = filter;

//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCards() {
//       setLoading(true);
//       try {
//         const response = await cardService.getCard({
//           keyword: searchKeyword,
//           grade: grade,
//           genre: genre,
//           sort:
//             price === '낮은 가격순'
//               ? 'low'
//               : price === '높은 가격순'
//                 ? 'high'
//                 : price === '최신순'
//                   ? 'latest'
//                   : 'low', // 기본 낮은 가격순
//         });
//         console.log(response);
//         setCards(response.cards);
//       } catch (error) {
//         console.error('마켓 플레이스 목록을 가져오는데 실패했습니다.', error);
//         setCards([]);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCards();
//   }, [searchKeyword, grade, genre, price]);

//   return { cards, loading, sellingPhotoCards };
// }
