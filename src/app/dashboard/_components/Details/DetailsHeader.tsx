import { ReactNode } from "react";
import BackButton from "../forms/BackButton";
type Props = {
  Title: ReactNode;
  image: string;
  operations: ReactNode;
};
export default function DetailsHeader({ Title, image, operations }: Props) {
  return (
    <div className="flex items-center justify-between">
      <BackButton withText={false} />
      {Title}
      <div className="flex items-center gap-2">
        <img
          className="w-11 h-11 rounded-full object-cover object-center"
          src={image}
          alt={`user-image`}
        />
        {operations}
      </div>
    </div>
  );
}
