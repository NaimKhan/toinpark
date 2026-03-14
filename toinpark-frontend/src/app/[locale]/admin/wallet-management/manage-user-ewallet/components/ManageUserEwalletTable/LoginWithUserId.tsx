import { useLoginWithUserIdMutation } from "@/store/api/auth/auth-api";
import { TMember } from "@/store/api/members/members.types";
import { CellContext } from "@tanstack/react-table";
import { useLocale } from "next-intl";

function LoginWithUserId({
  row: { original },
}: CellContext<TMember, unknown>) {
    const userName = original?.username;
    const userId = original?.id;
    const [loginWithUserId, { isLoading }] = useLoginWithUserIdMutation();
    const locale = useLocale();
    const handleUserLogin = async () => {
        try {
            await loginWithUserId({ userId }).unwrap();
            window.open(`/${locale}/user/dashboard`, "_blank");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button type="button" className="cursor-pointer" onClick={handleUserLogin} disabled={isLoading}>
            {userName}
        </button>
    );
}

export default LoginWithUserId;