export type PageProps = {
  params: Promise<{
    id: string;
  }>;
};
export type RoomPageProps = {
  params: Promise<{
    room: string;
  }>;
};