interface Iprops {
  name: string;
}

export default function MobileHeaderName({ name }: Iprops) {
  return <div className="text-14">{name}</div>;
}
