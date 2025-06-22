import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  Pages: number;
  activeNumber: number;
  setActiveNumber: Dispatch<SetStateAction<number>>;
};
export default function TablePagination({
  Pages,
  activeNumber,
  setActiveNumber,
}: Props) {
  return (
    <div className="flex items-center justify-center sm:gap-3 gap-1 mt-3">
      <Button
        aria-label="Previous Page"
        disabled={activeNumber <= 1}
        onClick={() => {
          if (activeNumber > 1) {
            setActiveNumber((pre) => pre - 1);
          }
        }}>
        <ChevronLeft />
      </Button>

      {Pages <= 5 ? (
        Array.from({ length: Pages }).map((_w, i) => (
          <Button
            onClick={() => {
              setActiveNumber(i + 1);
            }}
            className={`${
              activeNumber == i + 1
                ? "bg-main-text text-Main-black hover:bg-main-text hover:text-Main-black"
                : ""
            }`}
            key={i}>
            {i + 1}
          </Button>
        ))
      ) : (
        <>
          {activeNumber >= Pages - 1 && (
            <Button onClick={() => setActiveNumber(activeNumber - 1)}>
              ...
            </Button>
          )}

          {activeNumber > 1 && (
            <Button onClick={() => setActiveNumber(activeNumber - 1)}>
              {activeNumber - 1}
            </Button>
          )}

          <Button className="bg-main-text text-Main-black hover:bg-main-text hover:text-Main-black">
            {activeNumber}
          </Button>

          {activeNumber < Pages - 2 && (
            <Button
              onClick={() => {
                setActiveNumber(activeNumber + 1);
              }}>
              {activeNumber + 1}
            </Button>
          )}

          {activeNumber < Pages - 1 && (
            <Button
              onClick={() => {
                setActiveNumber((pre) => pre + 1);
              }}>
              ...
            </Button>
          )}

          {activeNumber < Pages && (
            <Button onClick={() => setActiveNumber(Pages)}>{Pages}</Button>
          )}
        </>
      )}

      <Button
        aria-label="Next Page"
        disabled={activeNumber == Pages}
        onClick={() => {
          if (activeNumber < Pages) {
            setActiveNumber((pre) => pre + 1);
          }
        }}>
        <ChevronRight />
      </Button>
    </div>
  );
}
