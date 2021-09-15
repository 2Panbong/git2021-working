interface FeedState {
  id: number;
  text: string | undefined;
  url?: string | undefined;
  createTime: number;
  modifyTime?: number;
  type?: string;
  img?: string | undefined;
  username?: string | undefined;
}
export type { FeedState };
