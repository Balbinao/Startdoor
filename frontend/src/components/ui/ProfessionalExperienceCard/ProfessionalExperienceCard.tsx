import type { IProfessionalExperience } from '@models/experience.types';
import { useState } from 'react';
import { ProfessionalExperienceCardEdit } from '../ProfessionalExperienceCardEdit';
import { ProfessionalExperienceCardView } from '../ProfessionalExperienceCardView';

interface Props {
  item: IProfessionalExperience;
}

export const ProfessionalExperienceCard = ({ item }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full">
      {isEditing ? (
        <ProfessionalExperienceCardEdit
          item={item}
          onEdit={() => setIsEditing(false)}
        />
      ) : (
        <ProfessionalExperienceCardView
          item={item}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};
