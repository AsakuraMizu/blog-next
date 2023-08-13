import dayjs from 'dayjs';

interface MetadataIn {
  title: string;
  time: string;
  tags?: string[] | string;
  author?: string;
}

export interface Metadata {
  title: string;
  time: dayjs.Dayjs;
  tags: string[];
  author?: string;
}

export const posts = Object.fromEntries(
  Object.entries(
    import.meta.glob<MetadataIn>('../routes/posts/\\(posts\\)/*/+page.svx', {
      import: 'metadata',
      eager: true,
    }),
  )
    .map<[string, Metadata]>(([path, metadata]) => [
      '/posts/' + path.match(/\.\.\/routes\/posts\/\(posts\)\/(.*)\/\+page\.svx/)![1],
      {
        ...metadata,
        tags: typeof metadata.tags === 'string' ? [metadata.tags] : metadata.tags || [],
        time: dayjs(metadata.time),
      },
    ])
    .sort(([, a], [, b]) => b.time.unix() - a.time.unix()),
);
