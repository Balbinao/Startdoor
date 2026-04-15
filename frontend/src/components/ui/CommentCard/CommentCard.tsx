import { useStudent } from '@hooks/useStudent';
import type { IComment } from '@models/comment.types';
import { useState } from 'react';
import { CommentCardEdit } from '../CommentCardEdit';
import { CommentCardView } from '../CommentCardView';

interface Props {
  item: IComment;
}

export const CommentCard = ({ item }: Props) => {
  const { students } = useStudent();

  const [isEditing, setIsEditing] = useState(false);

  const student = students.find(student => student.id === item.idEstudante);

  if (!student) {
    console.error(`Student with Id ${item.idEstudante} was not found!`);
    return <></>;
  }

  return (
    <div>
      {isEditing ? (
        <CommentCardEdit
          item={item}
          student={student}
          onEdit={() => setIsEditing(false)}
        />
      ) : (
        <CommentCardView
          item={item}
          student={student}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};
