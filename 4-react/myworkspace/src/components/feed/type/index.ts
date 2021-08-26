interface FeedState {
  id: number;
  text: string | undefined;
  url?: string | undefined;
  createTime: number;
  modifyTime?: number;
  type?: string;
}
export type { FeedState };
