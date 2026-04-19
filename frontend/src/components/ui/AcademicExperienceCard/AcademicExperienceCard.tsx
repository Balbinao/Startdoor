import type { IAcademicExperience } from '@models/experience.types';
import { useState } from 'react';
import { AcademicExperienceCardEdit } from '../AcademicExperienceCardEdit';
import { AcademicExperienceCardView } from '../AcademicExperienceCardView';

interface Props {
  item: IAcademicExperience;
}

export const AcademicExperienceCard = ({ item }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full">
      {isEditing ? (
        <AcademicExperienceCardEdit
          item={item}
          onEdit={() => setIsEditing(false)}
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
