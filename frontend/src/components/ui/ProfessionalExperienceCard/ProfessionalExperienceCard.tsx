import type { IProfessionalExperience } from '@models/experience.types';
import { useState } from 'react';

import { ProfessionalExperienceCardEdit } from '../ProfessionalExperienceCardEdit';
import { ProfessionalExperienceCardView } from '../ProfessionalExperienceCardView';

interface Props {
  item: IProfessionalExperience;
  isNew?: boolean;
  onRemove?: () => void;
}

export const ProfessionalExperienceCard = ({
  item,
  isNew,
  onRemove,
}: Props) => {
  const [isEditing, setIsEditing] = useState(isNew ?? false);

  return (
    <div className="w-full max-w-xl">
      {isEditing ? (
        <ProfessionalExperienceCardEdit
          item={item}
          isNew={isNew}
          onEdit={() => setIsEditing(false)}
          onRemove={onRemove}
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
