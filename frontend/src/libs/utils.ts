export type PropsOf<T> = T extends React.FC<infer P> ? P : never;
