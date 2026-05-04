import { Compass, Graph, Home, Search, User } from '@assets/icons';
import { ROUTES_CONST, USER_ROLES_CONST } from '@constants';
import { useAuth } from '@hooks/useAuth';
import { NavLink, useLocation } from 'react-router-dom';

const ICON_SIZE = 28;

export const MenuMain = () => {
  const { getUserId, getUserRole } = useAuth();
  const location = useLocation();

  const userId = getUserId();
  const userRole = getUserRole();

  if (!userId) return null;

  const profilePath =
    userRole === USER_ROLES_CONST.EMPRESA
      ? ROUTES_CONST.COMPANY.PROFILE_BY_ID(userId)
      : ROUTES_CONST.STUDENT.PROFILE_BY_ID(userId);

  const searchPath = ROUTES_CONST.SEARCH;
  const homePath = ROUTES_CONST.HOME;

  const isProfileActive = location.pathname.startsWith(profilePath);
  const isSearchActive = location.pathname.startsWith(searchPath);

  return (
    <nav className="flex max-w-md flex-1 items-center justify-center gap-6 rounded-full border border-(--grey-600) bg-(--grey-900) p-2.5 text-(--grey-300)">
      <NavLink
        to={searchPath}
        className={`p-2.5 ${isSearchActive ? 'rounded-full bg-(--grey-700)' : ''}`}
      >
        <Search width={ICON_SIZE} height={ICON_SIZE} />
      </NavLink>

      <NavLink
        to={ROUTES_CONST.RECOMMENDATION.COMPANY_RECOMMENDATION}
        className={({ isActive }) =>
          `p-2.5 ${isActive ? 'rounded-full bg-(--grey-700)' : ''}`
        }
      >
        <Compass width={ICON_SIZE} height={ICON_SIZE} />
      </NavLink>

      <NavLink to={homePath} className={`p-2.5`}>
        <Home width={ICON_SIZE} height={ICON_SIZE} />
      </NavLink>

      <NavLink
        to={ROUTES_CONST.STATISTICS.STATISTICS_ANALYSIS}
        className={({ isActive }) =>
          `p-2.5 ${isActive ? 'rounded-full bg-(--grey-700)' : ''}`
        }
      >
        {({ isActive }) => (
          <Graph
            width={ICON_SIZE}
            height={ICON_SIZE}
            className={isActive ? 'text-green-50' : ''}
          />
        )}
      </NavLink>

      <NavLink
        to={profilePath}
        className={`${isProfileActive ? 'rounded-full bg-(--grey-700)' : ''} p-2.5`}
      >
        <User
          width={ICON_SIZE}
          height={ICON_SIZE}
          className={`${isProfileActive ? 'text-green-50' : ''}`}
        />
      </NavLink>

      {/* <NavLink
        to={profilePath}
        style={({ isActive }) => ({
          color: isActive ? 'blue' : 'black',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
        })}
      >
        Perfil
      </NavLink> */}
    </nav>
  );
};
