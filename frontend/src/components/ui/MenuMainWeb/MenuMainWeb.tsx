import {
  BriefcaseFilled,
  Logout,
  PencilFilled,
  Star,
  TrashFilled,
  UserFilled,
} from '@assets/icons';

import {
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
  ROUTES_CONST,
  USER_ROLES_CONST,
} from '@constants';

import { useAuth } from '@hooks/useAuth';
import { useCompany } from '@hooks/useCompany';
import { useStudent } from '@hooks/useStudent';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { MenuExtraOptions } from '../MenuExtraOptions';

import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import type { ICompany } from '@models/companyData.types';
import type { IStudent } from '@models/studentData.types';
import { useEffect, useState } from 'react';
import type { MenuOption } from '../MenuExtraOptions/MenuExtraOptions';

export const MenuMainWeb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const { getUserId, getUserRole, logout } = useAuth();

  const { getStudent, deleteStudent } = useStudent();
  const { getCompany, deleteCompany } = useCompany();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [studentInfo, setStudentInfo] = useState<IStudent | null>(null);
  const [companyInfo, setCompanyInfo] = useState<ICompany | null>(null);

  const userId = getUserId();
  const userRole = getUserRole();

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        if (!userId) {
          throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
        }

        if (userRole === USER_ROLES_CONST.ESTUDANTE) {
          setStudentInfo(
            await modalLoadingAuto(
              () => getStudent(Number(userId), false),
              MESSAGES_LOADING.GET,
            ),
          );
        }

        if (userRole === USER_ROLES_CONST.EMPRESA) {
          setCompanyInfo(
            await modalLoadingAuto(
              () => getCompany(Number(userId), false),
              MESSAGES_LOADING.GET,
            ),
          );
        }
      } catch (error: unknown) {
        setIsError(true);
        await modalMessageError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [location.pathname]);

  if (!userId) return null;

  const profilePath =
    userRole === USER_ROLES_CONST.EMPRESA
      ? ROUTES_CONST.COMPANY.PROFILE_BY_ID(userId)
      : ROUTES_CONST.STUDENT.PROFILE_BY_ID(userId);

  const editProfileRoute =
    userRole === USER_ROLES_CONST.ESTUDANTE
      ? ROUTES_CONST.STUDENT.PROFILE_UPDATE(userId)
      : ROUTES_CONST.COMPANY.PROFILE_UPDATE(userId);

  const favoriteProfileRoute =
    userRole === USER_ROLES_CONST.ESTUDANTE
      ? ROUTES_CONST.STUDENT.PROFILE_FAVORITE(userId)
      : null;

  const searchPath = ROUTES_CONST.SEARCH;
  const homePath = ROUTES_CONST.HOME;

  const profileName =
    userRole === USER_ROLES_CONST.ESTUDANTE
      ? studentInfo?.nome
      : companyInfo?.nomeFantasia;

  const profileEmail =
    userRole === USER_ROLES_CONST.ESTUDANTE
      ? studentInfo?.email
      : companyInfo?.email;

  const profileImage =
    userRole === USER_ROLES_CONST.ESTUDANTE
      ? studentInfo?.fotoUrl
      : companyInfo?.fotoUrl;

  const menuItems = [
    {
      label: 'Início',
      path: homePath,
    },
    {
      label: 'Buscar',
      path: searchPath,
    },
    ...(userRole !== USER_ROLES_CONST.EMPRESA
      ? [
          {
            label: 'Recomendação',
            path: ROUTES_CONST.STATISTICS_RECOMMENDATION.COMPANY_RECOMMENDATION,
          },
          {
            label: 'Análise',
            path: ROUTES_CONST.STATISTICS_RECOMMENDATION
              .COMPANY_STATISTIC_ANALYSIS,
          },
        ]
      : []),
    {
      label: 'Perfil',
      path: profilePath,
    },
  ];

  const handleDeleteAccount = async () => {
    try {
      if (!userId) {
        throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
      }

      const action =
        userRole === USER_ROLES_CONST.ESTUDANTE ? deleteStudent : deleteCompany;

      const confirmed = await modalMessageSafe({
        type: 'warning',
        message: MESSAGES_RESPONSE.WARNING.DELETE_ACCOUNT,
        shouldAcknowledge: true,
      });
      if (!confirmed) return;

      const response = await modalLoadingAuto(
        () => action(userId),
        MESSAGES_LOADING.DELETE,
      );

      await modalMessageSafe({
        type: 'success',
        message: response?.message ?? MESSAGES_RESPONSE.SUCCESS.DELETE,
        shouldBlockProcess: false,
      });

      logout();
    } catch (error) {
      await modalMessageError(error);
    }
  };

  const menuExtraOptions = [
    favoriteProfileRoute && {
      text: 'Favoritos',
      icon: (
        <Star
          width={18}
          height={18}
          className="fill-(--grey-200) text-(--grey-200)"
        />
      ),
      onClick: () => navigate(favoriteProfileRoute),
    },

    {
      text: 'Alterar dados',
      icon: (
        <PencilFilled width={18} height={18} className="text-(--grey-200)" />
      ),
      onClick: () => navigate(editProfileRoute),
    },

    {
      text: 'Excluir conta',
      icon: (
        <TrashFilled width={18} height={18} className="text-(--grey-200)" />
      ),
      onClick: handleDeleteAccount,
    },

    {
      text: 'Sair',
      icon: <Logout width={18} height={18} className="text-(--grey-200)" />,
      onClick: () => logout(),
    },
  ].filter(Boolean) as MenuOption[];

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <div className="flex w-full max-w-5xl flex-1 justify-between rounded-2xl border border-(--grey-900) bg-zinc-900 px-4 py-4">
      <div>
        <NavLink to={homePath} className="flex shrink-0 items-center gap-3">
          <img
            src="/startdoor_icone.svg"
            alt=""
            width={40}
            height={40}
            className="select-none"
          />
          <span className="hidden text-xl font-semibold text-(--grey-100) lg:block">
            Startdoor
          </span>
        </NavLink>
      </div>

      <nav className="flex items-center gap-3">
        {menuItems.map(item => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-(--purple-500) text-(--purple-100)'
                  : 'text-(--grey-300) hover:bg-white/5 hover:text-(--grey-100)'
              }`}
            >
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div>
        <div className="flex items-center gap-3">
          <div className="hidden flex-col items-end lg:flex">
            {profileName && (
              <span className="text-sm font-semibold text-(--grey-100)">
                {profileName}
              </span>
            )}

            {profileEmail && (
              <span className="text-xs text-(--grey-300)">{profileEmail}</span>
            )}
          </div>

          <MenuExtraOptions options={menuExtraOptions} placement="bottom-end">
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-(--grey-600) bg-(--grey-800)">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : userRole === USER_ROLES_CONST.ESTUDANTE ? (
                <UserFilled className="text-(--grey-300)" />
              ) : (
                <BriefcaseFilled className="text-(--grey-300)" />
              )}
            </div>
          </MenuExtraOptions>
        </div>
      </div>
    </div>
  );
};
