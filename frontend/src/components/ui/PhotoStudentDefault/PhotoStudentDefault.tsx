import { UserFilled } from "@assets/icons"
interface Pros {
  divClassName?: string;
  onClick?: () => void;
  iconClassName?: string; 
}
export const PhotoStudentDefault = ({
  divClassName = "h-full w-full bg-(--grey-1000) p-8",
  iconClassName ='h-full w-full text-(--grey-400)', 
  onClick}:Pros) => {
  return (
       <div className={divClassName}>
             <UserFilled
                className={iconClassName}
                onClick={onClick}
             />
        </div>
        )
}