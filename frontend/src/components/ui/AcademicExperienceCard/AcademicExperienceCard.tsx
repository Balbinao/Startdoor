import type { IAcademicExperience } from '@models/experience.types';
import { useState } from 'react';
import { AcademicExperienceCardEdit } from '../AcademicExperienceCardEdit';
import { AcademicExperienceCardView } from '../AcademicExperienceCardView';

interface Props {
  item: IAcademicExperience;
  isNew?: boolean;
  onRemove?: () => void;
}

export const AcademicExperienceCard = ({ item, isNew, onRemove }: Props) => {
  const [isEditing, setIsEditing] = useState(isNew ?? false);

  return (
    <div className="w-full max-w-xl">
      {isEditing ? (
        <AcademicExperienceCardEdit
          item={item}
          isNew={isNew}
          onEdit={() => setIsEditing(false)}
          onRemove={onRemove}
        />
      ) : (
        <AcademicExperienceCardView
          item={item}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};
