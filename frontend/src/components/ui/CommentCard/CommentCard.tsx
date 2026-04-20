import type { IComment } from '@models/comment.types';
import { useState } from 'react';
import { CommentCardEdit } from '../CommentCardEdit';
import { CommentCardView } from '../CommentCardView';

interface Props {
  item: IComment;
}

export const CommentCard = ({ item }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <CommentCardEdit
          item={item}
          onEdit={() => setIsEditing(false)}
        />
      ) : (
        <CommentCardView
          item={item}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};
