export const calculateRelativeTimeDifference = (createdAt: Date) => {
  const current: Date = new Date();
  const createTime: Date = new Date(createdAt);

  const differenceTime: number = Math.abs(
    (current as any) - (createTime as any)
  );
  const differenceTimeToSecends = Math.floor(differenceTime / 1000);


  if (differenceTimeToSecends < 60) {
    return `همین الان`;
  } else if (differenceTimeToSecends < 3600) {
    const minutes = Math.floor(differenceTimeToSecends / 60)
    return `${minutes} دقیقه پیش`;
  } else if (differenceTimeToSecends < 86400) {
    const hours = Math.floor(differenceTimeToSecends / 3600)
    return `${hours} ساعت پیش`;
  } else {
    const days = Math.floor(differenceTimeToSecends / 86400)
    return `${days} روز پیش`;
  }
};
