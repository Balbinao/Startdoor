import { BriefcaseFilled, Lock, UserFilled } from '@assets/icons';
import { ROUTES_CONST } from '@constants';
import { useNavigate } from 'react-router-dom';

type Props = {
  userId: number;
  size?: number;
  src?: string | null;
  isAnonymous?: boolean;
  defaultIconType: 'student' | 'company';
  bgIconWrapperClassName?: string;
  bgIconClassName?: string;
};

export const UserProfilePicture = ({
  userId,
  size = 64,
  src,
  isAnonymous = false,
  defaultIconType = 'student',
  bgIconWrapperClassName = 'bg-(--grey-1000)',
  bgIconClassName = 'text-(--grey-400)',
}: Props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (defaultIconType === 'student') {
      navigate(ROUTES_CONST.STUDENT.PROFILE_BY_ID(userId));
    } else {
      navigate(ROUTES_CONST.COMPANY.PROFILE_BY_ID(userId));
    }
  };

  return (
    <div style={{ width: size, height: size }}>
      {isAnonymous && defaultIconType !== 'company' ? (
        <div
          className={`h-full w-full rounded-lg p-3 ${bgIconWrapperClassName}`}
        >
          <Lock className={`h-full w-full ${bgIconClassName}`} />
        </div>
      ) : src ? (
        <img
          src={src}
          className="h-full w-full cursor-pointer rounded-lg border border-zinc-700 object-cover"
          onClick={handleNavigate}
        />
      ) : defaultIconType === 'student' ? (
        <div
          className={`h-full w-full cursor-pointer rounded-lg p-3 ${bgIconWrapperClassName}`}
          onClick={handleNavigate}
        >
          <UserFilled className={`h-full w-full ${bgIconClassName}`} />
        </div>
      ) : (
        <div
          className={`h-full w-full cursor-pointer rounded-lg p-3 ${bgIconWrapperClassName}`}
          onClick={handleNavigate}
        >
          <BriefcaseFilled className={`h-full w-full ${bgIconClassName}`} />
        </div>
      )}
    </div>
  );
};
