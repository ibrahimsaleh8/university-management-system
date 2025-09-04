import { SlidingNumber } from "@/components/animate-ui/text/sliding-number";
import GlobalToast from "@/components/Global/GlobalToast";
import { ErrorResponseType } from "@/lib/globalTypes";
import { AnnouncmentReactionDataType } from "@/validation/CreateAnnouncmentReactionSchema";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

type Props = {
  isLiked: boolean;
  isDisLiked: boolean;
  likes: number;
  dislikes: number;
  token: string;
  name: string;
  announcmentId: string;
};

async function createAnnReaction(
  token: string,
  reactionData: AnnouncmentReactionDataType
) {
  await axios.post(
    `${MainDomain}/api/create/announcment-reaction`,
    reactionData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export default function AnnouncmentReaction({
  isLiked,
  isDisLiked,
  likes,
  dislikes,
  token,
  announcmentId,
  name,
}: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: {
      token: string;
      reactionData: AnnouncmentReactionDataType;
    }) => createAnnReaction(data.token, data.reactionData),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["student_class_announcments", name],
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });

  const [likeAnn, setLikeAnn] = useState(isLiked);
  const [disLikeAnn, setDisLikeAnn] = useState(isDisLiked);
  const [annLikes, setAnnLikes] = useState(likes);
  const [annDisLikes, setAnnDisLikes] = useState(dislikes);

  const likedClasses = likeAnn
    ? "bg-main-text text-black hover:bg-[#8abc10]"
    : "bg-[#202020] hover:bg-[#2d2c2c] text-white";

  const disLikeClasses = disLikeAnn
    ? "bg-red-500 hover:bg-red-600 text-white"
    : "bg-[#202020] hover:bg-[#2d2c2c] text-white";

  const HandleAnnReaction = (
    reaction: "Like" | "Dislike",
    operation: "remove" | "add"
  ) => {
    if (operation == "add") {
      if (reaction == "Like") {
        setLikeAnn(true);
        setDisLikeAnn(false);
        setAnnLikes((pre) => pre + 1);
        if (disLikeAnn) {
          setAnnDisLikes((pre) => pre - 1);
        }

        mutate({
          token,
          reactionData: {
            announcmentId,
            operation: "ADD",
            reaction: "LIKE",
          },
        });
      } else {
        setLikeAnn(false);
        setDisLikeAnn(true);
        setAnnDisLikes((pre) => pre + 1);
        if (likeAnn) {
          setAnnLikes((pre) => pre - 1);
        }
        mutate({
          token,
          reactionData: {
            announcmentId,
            operation: "ADD",
            reaction: "DISLIKE",
          },
        });
      }
    } else if (operation == "remove") {
      if (reaction == "Like") {
        setLikeAnn(false);
        setDisLikeAnn(false);
        setAnnLikes((pre) => pre - 1);
        mutate({
          token,
          reactionData: {
            announcmentId,
            operation: "REMOVE",
            reaction: "LIKE",
          },
        });
      } else {
        setLikeAnn(false);
        setDisLikeAnn(false);
        setAnnDisLikes((pre) => pre - 1);
        mutate({
          token,
          reactionData: {
            announcmentId,
            operation: "REMOVE",
            reaction: "DISLIKE",
          },
        });
      }
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Like */}
      <div className="flex items-center gap-3">
        <SlidingNumber
          className="font-medium text-sm border-r pr-3 border-soft-border"
          number={annLikes}
        />
        <button
          disabled={isPending}
          onClick={() => {
            if (likeAnn) {
              HandleAnnReaction("Like", "remove");
            } else {
              HandleAnnReaction("Like", "add");
            }
          }}
          title={likeAnn ? "Unlike" : "Like"}
          className={`ann-reaction-btn ${likedClasses}`}>
          <AiOutlineLike className="w-6 h-6" />
        </button>
      </div>
      {/* Dislike */}
      <div className="flex items-center gap-3">
        <button
          disabled={isPending}
          title={disLikeAnn ? "Remove Dislike" : "Dislike"}
          onClick={() => {
            if (disLikeAnn) {
              HandleAnnReaction("Dislike", "remove");
            } else {
              HandleAnnReaction("Dislike", "add");
            }
          }}
          className={`ann-reaction-btn ${disLikeClasses}`}>
          <AiOutlineDislike className="w-6 h-6" />
        </button>
        <SlidingNumber
          className="font-medium text-sm border-l pl-3 border-soft-border"
          number={annDisLikes}
        />
      </div>
    </div>
  );
}
