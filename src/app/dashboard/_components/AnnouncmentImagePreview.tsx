import { ImageZoom } from "@/components/ui/kibo-ui/image-zoom";
import { cn } from "@/lib/utils";
import Image from "next/image";
type Props = {
  imageUrl: string;
  fullView: boolean;
};
export default function AnnouncmentImagePreview({ imageUrl, fullView }: Props) {
  return fullView ? (
    <ImageZoom
      backdropClassName={cn(
        '[&_[data-rmiz-modal-overlay="visible"]]:bg-black/80'
      )}>
      <Image
        alt="Placeholder image"
        className="w-60 object-cover object-center rounded-2xl"
        height={800}
        src={imageUrl}
        unoptimized
        width={1200}
      />
    </ImageZoom>
  ) : (
    <Image
      alt="Placeholder image"
      className="w-96 object-cover object-center rounded-2xl"
      height={800}
      src={imageUrl}
      unoptimized
      width={1200}
    />
  );
}
