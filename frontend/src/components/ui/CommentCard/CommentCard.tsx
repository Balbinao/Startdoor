import { MESSAGES_RESPONSE } from '@constants';
import { useCompany } from '@hooks/useCompany';
import { useStudent } from '@hooks/useStudent';
import type { ICommentCompany, ICommentStudent } from '@models/comment.types';
import { useState } from 'react';
import { CommentCardEdit } from '../CommentCardEdit';
import { CommentCardView } from '../CommentCardView';

interface Props {
  item: ICommentStudent | ICommentCompany;
}

export const CommentCard = ({ item }: Props) => {
  const { students } = useStudent();
  const { companies } = useCompany();

  const [isEditing, setIsEditing] = useState(false);

  const isStudentComment = 'idEstudante' in item;

  const user = isStudentComment
    ? students.find(s => s.id === item.idEstudante)
    : companies.find(c => c.id === item.idEmpresa);

  if (!user) {
    console.error(MESSAGES_RESPONSE.WARNING.USER_NOT_FOUND);
    return null;
  }

  return (
    <div>
      {isEditing ? (
        <CommentCardEdit
          item={item}
          user={user}
          onEdit={() => setIsEditing(false)}
        />
      ) : (
        <CommentCardView
          item={item}
          user={user}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};
