export function hoursAgo(dateString) {
  if (!dateString) {
    return '알 수 없음';
  }

  const now = new Date();
  const past = new Date(dateString);

  // 유효하지 않은 날짜 처리
  if (isNaN(past.getTime())) {
    return '알 수 없음';
  }

  const diff = now - past;

  // 미래 날짜 처리
  if (diff < 0) {
    return '방금 전';
  }

  const diffHour = Math.floor(diff / (1000 * 60 * 60));

  if (diffHour === 0) {
    return '방금 전';
  }

  // 24시간 이상인 경우 일 단위로 표시
  if (diffHour >= 24) {
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay}일 전`;
  }

  return `${diffHour}시간 전`;
}
