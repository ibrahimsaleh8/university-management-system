type Props = {
  isSubmitted: boolean;
};
export default function SubmissonStatus({ isSubmitted }: Props) {
  return isSubmitted ? (
    <p className="p-1 text-xs rounded-md w-fit px-2 bg-glass-main-text text-main-text">
      Submitted
    </p>
  ) : (
    <p className="p-1 text-xs rounded-md w-fit px-2 bg-glass-yellow text-yellow-400">
      Not Yet
    </p>
  );
}
