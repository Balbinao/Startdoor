import {
  ChevronsLeft,
  LogoGupy,
  LogoLinkedIn,
  Logout,
  Menu,
  PencilFilled,
  TrashFilled,
  World,
} from '@assets/icons';
import { StudentBannerIMG, StudentPfp } from '@assets/images';
import {
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
  ROUTES_CONST,
  USER_ROLES_CONST,
} from '@constants';
import { useAuth } from '@hooks/useAuth';
import { useCompany } from '@hooks/useCompany';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useStudent } from '@hooks/useStudent';
import { useEffect, useState, type JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuExtraOptions } from '../MenuExtraOptions';
import type { MenuOption } from '../MenuExtraOptions/MenuExtraOptions';

const ICON_SIZE = 30;

interface ProfileLinksProps {
  links: { href: string; title: string; icon: JSX.Element }[];
}

const ProfileLinks = ({ links }: ProfileLinksProps) => {
  if (!links || links.length === 0) return null;
  return (
    <>
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={link.title}
        >
          {link.icon}
        </a>
      ))}
    </>
  );
};

interface Props {
  type: (typeof USER_ROLES_CONST)[keyof typeof USER_ROLES_CONST];
  id: number;
}

export const UserBanner = ({ type, id }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const { getUserId, getUserRole, logout } = useAuth();
  const { student, getStudent, deleteStudent } = useStudent();
  const { company, getCompany, deleteCompany } = useCompany();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const userId = getUserId();
  const userRole = getUserRole();

  const isOwner = id === userId && userRole === type;

  const profileName =
    type === USER_ROLES_CONST.ESTUDANTE
      ? student?.nome
      : type === USER_ROLES_CONST.EMPRESA
        ? company?.nomeFantasia
        : null;

  const profileLinks = (
    type === USER_ROLES_CONST.ESTUDANTE
      ? [
          student?.linkSite && {
            href: student.linkSite,
            title: 'Site Profissional',
            icon: (
              <World
                width={ICON_SIZE}
                height={ICON_SIZE}
                strokeWidth={1.5}
                className="text-(--grey-200)"
              />
            ),
          },
          student?.linkLinkedin && {
            href: student.linkLinkedin,
            title: 'LinkedIn',
            icon: (
              <LogoLinkedIn
                width={ICON_SIZE}
                height={ICON_SIZE}
                className="text-[#228ec0]"
              />
            ),
          },
        ]
      : type === USER_ROLES_CONST.EMPRESA
        ? [
            company?.linkSite && {
              href: company.linkSite,
              title: 'Site Profissional',
              icon: (
                <World
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  strokeWidth={1.7}
                  className="text-(--grey-200)"
                />
              ),
            },
            company?.linkLinkedin && {
              href: company.linkLinkedin,
              title: 'LinkedIn',
              icon: (
                <LogoLinkedIn
                  width={ICON_SIZE - 4}
                  height={ICON_SIZE - 4}
                  className="text-[#228ec0]"
                />
              ),
            },
            company?.linkGupy && {
              href: company.linkGupy,
              title: 'Gupy',
              icon: (
                <LogoGupy
                  width={ICON_SIZE - 6}
                  height={ICON_SIZE - 6}
                  className="text-[#466ce7]"
                />
              ),
            },
          ]
        : []
  ).filter((link): link is { href: string; title: string; icon: JSX.Element } =>
    Boolean(link),
  );

  const editProfileRoute =
    type === USER_ROLES_CONST.ESTUDANTE
      ? ROUTES_CONST.STUDENT.PROFILE_UPDATE(userId!)
      : type === USER_ROLES_CONST.EMPRESA
        ? ROUTES_CONST.COMPANY.PROFILE_UPDATE(userId!)
        : null;

  const showEditLink =
    isOwner && editProfileRoute && location.pathname !== editProfileRoute;

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        if (!id) {
          throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
        }

        if (type === USER_ROLES_CONST.ESTUDANTE) {
          await modalLoadingAuto(
            () => getStudent(Number(id)),
            MESSAGES_LOADING.GET,
          );
        }

        if (type === USER_ROLES_CONST.EMPRESA) {
          await modalLoadingAuto(
            () => getCompany(Number(id)),
            MESSAGES_LOADING.GET,
          );
        }
      } catch (error: unknown) {
        await modalMessageError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (
      (type === USER_ROLES_CONST.ESTUDANTE && student) ||
      (type === USER_ROLES_CONST.EMPRESA && company)
    ) {
      setIsError(false);
    }
  }, [type, student, company]);

  const handleDeleteAccount = async () => {
    try {
      if (!userId) throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);

      const action =
        type === USER_ROLES_CONST.ESTUDANTE
          ? deleteStudent
          : type === USER_ROLES_CONST.EMPRESA
            ? deleteCompany
            : null;

      if (!action)
        throw new Error(MESSAGES_RESPONSE.WARNING.USER_ROLE_NOT_FOUND);

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

  const handleLogout = () => logout();

  const menuOptions = [
    showEditLink && {
      text: 'Alterar dados',
      icon: (
        <PencilFilled width={18} height={18} className="text-(--grey-200)" />
      ),
      onClick: () => editProfileRoute && navigate(editProfileRoute),
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
      onClick: handleLogout,
    },
  ].filter(Boolean) as MenuOption[];

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <div className="">
      <div className="relative aspect-4/1 w-full">
        <div className="absolute top-3 left-1/2 flex w-[96%] -translate-x-1/2 justify-between">
          <div className="flex gap-3">
            <button
              title="Voltar"
              onClick={() => {
                if (window.history.length > 1) navigate(-1);
              }}
              className="h-fit w-fit cursor-pointer rounded-xl border border-(--grey-900) bg-(--grey-1100) p-2 text-(--grey-300) transition-colors hover:bg-(--grey-900) hover:text-(--grey-200) md:hidden"
            >
              <ChevronsLeft width={28} height={28} />
            </button>
            {isOwner && (
              <MenuExtraOptions options={menuOptions} placement="bottom">
                <div className="cursor-pointer rounded-xl border-zinc-700 bg-zinc-900 px-3 py-2 text-xs">
                  <Menu width={26} height={30} className="text-(--grey-200)" />
                </div>
              </MenuExtraOptions>
            )}
          </div>

          {profileLinks.length > 0 && (
            <div className="flex h-fit items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-1.5">
              <ProfileLinks links={profileLinks} />
            </div>
          )}
        </div>

        {profileName && (
          <h1 className="absolute -bottom-22 w-full text-center text-2xl text-white">
            {profileName}
          </h1>
        )}

        <img
          src={StudentBannerIMG}
          alt="Foto do Banner"
          className="h-full w-full rounded-xl object-cover"
        />

        <img
          src={StudentPfp}
          alt="Foto de Perfil"
          className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 translate-y-1/4 rounded-4xl border-2 border-gray-700 object-cover"
        />
      </div>
    </div>
  );
};
