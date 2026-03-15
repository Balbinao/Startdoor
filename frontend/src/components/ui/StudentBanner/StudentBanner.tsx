import { StudentBannerIMG, StudentPfp } from '@assets/images';
import { ROUTES_CONST } from '@constants';
import { useAuth } from '@hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export const StudentBanner = () => {
  const navigate = useNavigate();
  const { getUserId, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const userId = getUserId();
  const editProfileRoute = userId
    ? ROUTES_CONST.STUDENT_PROFILE_UPDATE(userId)
    : '';
  const showEditLink = userId && location.pathname !== editProfileRoute;

  return (
    <div className="">
      <div className="relative aspect-4/1 w-full">
        <div className="absolute top-3 left-1/2 flex w-[96%] -translate-x-1/2 justify-between">
          <div className="flex w-fit flex-col gap-4 bg-(--grey-1300) p-2 text-xs">
            {showEditLink && <Link to={editProfileRoute}>Alterar dados</Link>}
            <span>Excluir conta</span>
            <span className="cursor-pointer" onClick={handleLogout}>
              Sair
            </span>
          </div>
          <div>LINKS_HERE</div>
        </div>

        <img
          src={StudentBannerIMG}
          alt="Foto do Banner"
          className="h-full w-full rounded-xl object-cover"
        />

        <img
          src={StudentPfp}
          alt="Foto de Perfil"
          className="absolute bottom-0 left-1/2 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full object-cover"
        />
      </div>
    </div>
  );
};
