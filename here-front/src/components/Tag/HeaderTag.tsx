interface Iprops {
  children: string;
}

export default function HeaderTag({ children }: Iprops) {
  return (
    <div className="h-30 w-150 rounded-50 bg-red-1 text-center text-14 font-semibold leading-30 text-white">
      {children}
    </div>
  );
}
