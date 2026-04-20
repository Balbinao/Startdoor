import { BriefcaseFilled, UserFilled } from '@assets/icons';
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

  return (
    <div style={{ width: size, height: size }}>
      {src && !isAnonymous ? (
        <img
          src={src}
          className={`h-full w-full rounded-lg border border-zinc-700 object-cover ${!isAnonymous && 'cursor-pointer'}`}
          onClick={() => {
            if (defaultIconType === 'student') {
              navigate(ROUTES_CONST.STUDENT.PROFILE_BY_ID(userId));
            } else {
              navigate(ROUTES_CONST.COMPANY.PROFILE_BY_ID(userId));
            }
          }}
        />
      ) : (
        <div
          className={`h-full w-full rounded-lg p-3 ${bgIconWrapperClassName}`}
        >
          {defaultIconType === 'student' ? (
            <UserFilled
              className={`h-full w-full ${!isAnonymous && 'cursor-pointer'} ${bgIconClassName}`}
              onClick={() => {
                if (!isAnonymous)
                  navigate(ROUTES_CONST.STUDENT.PROFILE_BY_ID(userId));
              }}
            />
          ) : (
            <BriefcaseFilled
              className={`h-full w-full ${!isAnonymous && 'cursor-pointer'} ${bgIconClassName}`}
              onClick={() => {
                if (!isAnonymous)
                  navigate(ROUTES_CONST.COMPANY.PROFILE_BY_ID(userId));
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
