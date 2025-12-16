"use client"
import { useParams } from 'next/navigation';

import { useFetchMarketCardDetail } from '@/libs/hooks/useFetchMarketCardDetail';
import { useAuth } from '@/providers/AuthProvider';

import { BuyerDetailView } from './_components/BuyerDetailView';
import { SellerDetailView } from './_components/SellerDetailView';

export default function MarketPlaceDetailPage() {

  const { id } = useParams();
  const { user } = useAuth();

  const { marketDetailCard, marketDetailLoading } = useFetchMarketCardDetail(id);

  if (marketDetailLoading)
    return (
      <p className="flex justify-center items-center h-[60vh] text-white text-3xl font-bold">
        로딩 중...
      </p>
    );

  if (!marketDetailCard)
    return (
      <p className="flex justify-center items-center h-[60vh] text-white text-3xl font-bold">
        해당 카드를 찾을 수 없습니다.
      </p>
    );

  const isOwner = marketDetailCard.sellerId === user.id;

  if (!isOwner) {
    return <BuyerDetailView card={marketDetailCard} />
  }

  return <SellerDetailView card={marketDetailCard} />
}
