import { BriefcaseFilled } from "@assets/icons"

interface Prosp {
  divClassName?: string;
  onClick?: () => void;
  iconClassName?: string; 
}

export const PhotoCompanyDefault = ({divClassName =
  "h-full w-full bg-(--grey-1000) p-8",
   iconClassName ='h-full w-full text-(--grey-400)', 
   onClick}:Prosp)=> {
  return (
       <div className={divClassName}>
            <BriefcaseFilled
            className={iconClassName}
            onClick={onClick}
            />
        </div>
        )
}


//     <div className="h-full w-full bg-(--grey-1000) p-8">
//     {type === USER_ROLES_CONST.ESTUDANTE ? (
//     <UserFilled
//      className="h-full w-full text-(--grey-400)"