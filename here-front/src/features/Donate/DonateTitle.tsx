interface Iprops {
  title: string;
}

// DonateTitle
export default function DonateTitle({ title }: Iprops) {
  return (
    <div className="flex justify-center text-22 font-bold text-pen-2 mobile:mb-3 mobile:text-16">
      {title}
    </div>
  );
}
