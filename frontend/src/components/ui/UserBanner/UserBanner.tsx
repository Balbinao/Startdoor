import { StudentBannerIMG, StudentPfp } from '@assets/images';
import { MESSAGES_LOADING, MESSAGES_RESPONSE, ROUTES_CONST } from '@constants';
import { useAuth } from '@hooks/useAuth';
import { useCompany } from '@hooks/useCompany';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useStudent } from '@hooks/useStudent';
import { Link, useLocation, useParams } from 'react-router-dom';

export const UserBanner = () => {
  const { id: paramId } = useParams<{ id: string }>();
  const location = useLocation();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();
  const { getUserId, logout } = useAuth();
  const { student, deleteStudent } = useStudent();
  const { company, deleteCompany } = useCompany();

  const userId = getUserId();

  const isStudentProfile = location.pathname.includes(
    ROUTES_CONST.STUDENT.UNIQUE,
  );
  const isCompanyProfile = location.pathname.includes(
    ROUTES_CONST.COMPANY.UNIQUE,
  );

  // Should show the menu
  const showMenu = userId && paramId && String(userId) === paramId;

  // Route to edit the profile
  const editProfileRoute =
    userId && isStudentProfile
      ? ROUTES_CONST.STUDENT.PROFILE_UPDATE(userId)
      : userId && isCompanyProfile
        ? ROUTES_CONST.COMPANY.PROFILE_UPDATE(userId)
        : '';

  // Should show the link to edit page
  const showEditLink =
    showMenu && editProfileRoute && location.pathname !== editProfileRoute;

  const profileName = isStudentProfile
    ? student?.nome
    : isCompanyProfile
      ? company?.nomeFantasia
      : '';

  const handleLogout = () => {
    logout();
  };

  const handleDeleteAccount = async () => {
    try {
      if (!userId) {
        throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
      }

      const action = isStudentProfile
        ? deleteStudent
        : isCompanyProfile
          ? deleteCompany
          : null;

      if (!action) {
        throw new Error(MESSAGES_RESPONSE.WARNING.USER_ROLE_NOT_FOUND);
      }

      const messageAcknowledge = MESSAGES_RESPONSE.WARNING.USER_DELETE_ACCOUNT;
      const confirmedAcknowledge = await modalMessageSafe({
        type: 'warning',
        message: messageAcknowledge,
        shouldAcknowledge: true,
      });
      if (!confirmedAcknowledge) return;

      const response = await modalLoadingAuto(
        () => action(Number(userId)),
        MESSAGES_LOADING.DELETE,
      );

      const messageSuccess =
        response?.message ?? MESSAGES_RESPONSE.SUCCESS.DELETE;
      await modalMessageSafe({
        type: 'success',
        message: messageSuccess,
        shouldBlockProcess: false,
      });

      handleLogout();
    } catch (error) {
      await modalMessageError(error);
    }
  };

  return (
    <div className="">
      <div className="relative aspect-4/1 w-full">
        {showMenu && (
          <div className="absolute top-3 left-1/2 flex w-[96%] -translate-x-1/2 justify-between">
            <div className="flex w-fit flex-col gap-4 bg-(--grey-1300) p-2 text-xs">
              {showEditLink && <Link to={editProfileRoute}>Alterar dados</Link>}
              <span className="cursor-pointer" onClick={handleDeleteAccount}>
                Excluir conta
              </span>
              <span className="cursor-pointer" onClick={handleLogout}>
                Sair
              </span>
            </div>
            <div>{student?.nome}</div>
          </div>
        )}

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
